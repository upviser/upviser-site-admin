import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { City, Region, IShipping } from '../../interfaces'
import { Select } from '../ui'
import { calcularPaquete, offer } from '@/utils'

interface Props {
  setClientData: any
  clientData: any
  setChilexpress?: any
  dest: any
  setDest: any
  streets: any
  setStreets: any
}

export const ShippingCost: React.FC<Props> = ({setClientData, clientData, setChilexpress, dest, setDest, streets, setStreets}) => {

  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [shipping, setShipping] = useState<IShipping[]>()
  const [city, setCity] = useState('')
  const [chile, setChile] = useState({ active: false, coberturaKey: '', cotizadorKey: '' })

    const requestRegions = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`)  
      const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': res.data.coberturaKey
          }
        })
        setRegions(request.data.regions)
        setChile(res.data)
      }
    
      useEffect(() => {
        requestRegions()
      }, [])
    
      const regionChange = async (e: any) => {
        const region = regions?.find(region => region.regionName === e.target.value)
        const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': chile.coberturaKey
          }
        })
        setCitys(request.data.coverageAreas)
        setClientData({...clientData, region: e.target.value})
      }
    
      const cityChange = async (e: any) => {
        const city = citys?.find(city => city.countyName === e.target.value)
        const dimentions = calcularPaquete(clientData.cart)
        const request = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', {
          "originCountyCode": "QNOR",
          "destinationCountyCode": city?.countyCode,
          "package": {
              "weight": dimentions.weight,
              "height": dimentions.height,
              "width": dimentions.width,
              "length": dimentions.length
          },
          "productType": 3,
          "contentType": 5,
          "declaredWorth": clientData.cart.reduce((bef: any, curr: any) => curr.quantityOffers?.length ? bef + offer(curr) : bef + curr.price * curr.quantity, 0),
          "deliveryTime": 0
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': chile.cotizadorKey
          }
        })
        if (setChilexpress) {
          setChilexpress(request.data.data.courierServiceOptions)
        }
        setCity(e.target.value)
        setClientData({...clientData, city: e.target.value})
        const res = await axios.post('http://testservices.wschilexpress.com/georeference/api/v1.0/streets/search', {
          "countyName": city?.countyName,
          "streetName": clientData.address,
          "pointsOfInterestEnabled": true,
          "streetNameEnabled": true,
          "roadType": 0
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': chile.coberturaKey
          }
        })
        if (res.data.streets.length) {
          if (res.data.streets.length === 1) {
            setDest({ ...dest, streetName: res.data.streets[0].streetName, countyCoverageCode: city?.countyCode })
          } else {
            setDest({ ...dest, countyCoverageCode: city?.countyCode })
            setStreets(res.data.streets)
          }
        }
      }

  return (
    <div className='flex gap-2'>
      <Select change={regionChange}>
        <option>Seleccionar Región</option>
        {
          regions !== undefined
            ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
            : ''
        }
      </Select>
      <Select change={cityChange}>
        <option>Seleccionar Ciudad</option>
        {
          citys?.map(city => <option key={city.countyCode}>{city.countyName}</option>)
        }
      </Select>
    </div>
  )
}
