"use client"
import { ShippingCost } from '@/components/product'
import { ButtonSubmit, Card, Input, Select, Spinner2 } from '@/components/ui'
import { IProduct, ISell, IVariation } from '@/interfaces'
import { calcularPaquete, NumberFormat, offer } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import { io } from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/`, {
  transports: ['websocket']
})

export default function Page () {

  const [sell, setSell] = useState<ISell>({
    address: '',
    number: '',
    cart: [],
    city: '',
    email: '',
    firstName: '',
    pay: '',
    region: '',
    shipping: 0,
    shippingMethod: '',
    shippingState: '',
    state: '',
    total: 0
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [chilexpress, setChilexpress] = useState([])
  const [error, setError] = useState('')
  const [dest, setDest] = useState({ countyCoverageCode: '', streetName: '', serviceDeliveryCode: '' })
  const [streets, setStreets] = useState([])
  const [serviceTypeCode, setServiceTypeCode] = useState()

  const router = useRouter()

  const initialEmail = ''

  const getProducts = async () => {
    const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(products.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const inputChange = (e: any) => {
    setSell({...sell, [e.target.name]: e.target.value})
  }

  const selectProduct = (e: any) => {
    const product = products.find(product => product.name === e.target.value)
    if (product) {
      const cart = sell.cart.concat({
        category: product.category.category,
        image: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        _id: product._id,
        beforePrice: product.beforePrice ? product.beforePrice : undefined,
        stock: product.stock,
        dimentions: product.dimentions,
        quantityOffers: product.quantityOffers
      })
      setSell({...sell, total: cart.reduce((bef, curr) => curr.quantityOffers ? bef + offer(curr) : bef + curr.price * curr.quantity, 0), cart: cart })
    }
  }

  const sellSubmit = async () => {
    if (!submitLoading) {
      setSubmitLoading(true)
      setError('')
      if (sell.email === '' || sell.address === '' || sell.firstName === '' || sell.city === '' || sell.region === '') {
        setError('Debes llenar todos los datos requeridos')
        setSubmitLoading(false)
        return
      }
      if (!sell.cart.length) {
        setError('El carrito debe tener al menos un producto')
        setSubmitLoading(false)
        return
      }
      if (sell.pay === '') {
        setError('Selecciona el pago de la venta')
        setSubmitLoading(false)
        return
      }
      if (sell.shippingMethod === '' || sell.shippingState === '') {
        setError('Selecciona el envío de la venta')
        setSubmitLoading(false)
        return
      }
      const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chilexpress`)
      const dimentions = calcularPaquete(sell.cart)
      if (sell.shippingState === 'No empaquetado' || sell.shippingState === 'Productos empaquetados') {
        const shippingData = {
          "header": {
              "customerCardNumber": res.data.cardNumber ? res.data.cardNumber : "18578680",
              "countyOfOriginCoverageCode": res2.data.locations?.length ? res2.data.locations[0].countyCoverageCode : '',
              "labelType": 2
          },
          "details": [{
              "addresses": [{
                  "countyCoverageCode": dest.countyCoverageCode,
                  "streetName": dest.streetName,
                  "streetNumber": sell.number,
                  "supplement": sell.details,
                  "addressType": "DEST",
                  "deliveryOnCommercialOffice": false
              }, {
                  "addressId": 0,
                  "countyCoverageCode": res2.data.locations?.length ? res2.data.locations[0].countyCoverageCode : '',
                  "streetName": res2.data.locations?.length ? res2.data.locations[0].streetName : '',
                  "streetNumber": res2.data.locations?.length ? res2.data.locations[0].streetNumber : '',
                  "supplement": res2.data.locations?.length ? res2.data.locations[0].details : '',
                  "addressType": "DEV",
                  "deliveryOnCommercialOffice": false
              }],
              "contacts": [{
                  "name": res2.data.nameContact,
                  "phoneNumber": res2.data.phone,
                  "mail": res2.data.email,
                  "contactType": "R"
              }, {
                  "name": `${sell.firstName} ${sell.lastName}`,
                  "phoneNumber": sell.phone,
                  "mail": sell.email,
                  "contactType": "D"
              }],
              "packages": [{
                  "weight": dimentions.weight,
                  "height": dimentions.height,
                  "width": dimentions.width,
                  "length": dimentions.length,
                  "serviceDeliveryCode": serviceTypeCode,
                  "productCode": "3",
                  "deliveryReference": "TEST-EOC-17",
                  "groupReference": "GRUPO",
                  "declaredValue": sell.cart.reduce((bef, curr) => curr.quantityOffers?.length ? bef + offer(curr) : bef + curr.price * curr.quantity, 0),
                  "declaredContent": "5"
              }]
          }]
        }
        const request = await axios.post('http://testservices.wschilexpress.com/transport-orders/api/v1.0/transport-orders', shippingData, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': res.data.enviosKey
          }
        })
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, { ...sell, shippingLabel: request.data.data.detail[0].label.labelData })
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, sell)
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, { ...sell, tags: sell.subscription ? ['Clientes', 'Suscriptores'] : ['Clientes'] })
      sell.cart.map(async (product: any) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.slug}`)
        let prod: IProduct = res.data
        if (product.variation?.variation) {
          if (product.variation.subVariation) {
            if (product.variation.subVariation2) {
              const variationIndex = prod.variations!.variations.findIndex((variation: IVariation) => variation.variation === product.variation?.variation && variation.subVariation === product.variation.subVariation && variation.subVariation2 === product.variation.subVariation2)
              prod.variations!.variations[variationIndex].stock = prod.variations!.variations[variationIndex].stock - product.quantity!
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, { stock: prod.stock - product.quantity, variations: prod.variations })
            } else {
              const variationIndex = prod.variations!.variations.findIndex((variation: IVariation) => variation.variation === product.variation?.variation && variation.subVariation === product.variation.subVariation)
              prod.variations!.variations[variationIndex].stock = prod.variations!.variations[variationIndex].stock - product.quantity!
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, { stock: prod.stock - product.quantity, variations: prod.variations })
            }
          } else {
            const variationIndex = prod.variations!.variations.findIndex((variation: IVariation) => variation.variation === product.variation?.variation)
            prod.variations!.variations[variationIndex].stock = prod.variations!.variations[variationIndex].stock - product.quantity!
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, { stock: prod.stock - product.quantity, variations: prod.variations })
          }
        } else {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, { stock: prod.stock - product.quantity })
        }
      })
      socket.emit('newNotification', { title: 'Nuevo pago recibido:', description: 'Venta de productos de la tienda', url: '/pagos', view: false })
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, { title: 'Nuevo pago recibido:', description: 'Venta de productos de la tienda', url: '/pagos', view: false })
      setSubmitLoading(false)
      router.push('/ventas')
    }
  }

  return (
    <>
      <Head>
        <title>Nueva venta</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            {
              error !== ''
                ? <p className='bg-red-500 text-white p-2 w-fit'>{error}</p>
                : ''
            }
            <div className='flex gap-6 ml-auto w-fit'>
              {
                sell.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed w-36 h-10 text-white text-sm rounded-xl'>Crear venta</button>
                  : <ButtonSubmit action={sellSubmit} submitLoading={submitLoading} textButton='Crear venta' color='main' config='w-36' />
              }
              <Link className='text-sm my-auto' href='/ventas'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 bg-bg flex flex-col gap-6 w-full overflow-y-scroll dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/ventas' className='border border-border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto font-medium'>Nueva venta de productos</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] m-auto flex-col lg:flex-row'>
            <div className='flex gap-6 flex-col w-full lg:w-2/3'>
              <Card title='Productos'>
                <div>
                  <Select change={selectProduct}>
                    <option>Seleccionar producto</option>
                    {
                      products.length
                        ? products.map(product => (
                          <option key={product._id}>{product.name}</option>
                        ))
                        : ''
                    }
                  </Select>
                </div>
                <div className='flex flex-col gap-2'>
                  {
                    sell.cart.length
                      ? sell.cart.map((product, index) => (
                        <div className='flex gap-2 justify-between' key={product._id}>
                          <div className='flex gap-2'>
                            <Image className='w-20 h-20 object-contain' src={product.image} alt={`Imagen de producto ${product.name}`} width={100} height={100} />
                            <div className='mt-auto mb-auto'>
                              <p>{product.name}</p>
                              <p>${NumberFormat(product.price)}</p>
                              {
                                products.find(prod => prod.name === product.name)?.variations?.nameVariation !== ''
                                  ? (
                                    <Select change={(e: any) => {
                                      const variation = products.find(prod => prod.name === product.name)?.variations?.variations.find(variation => variation.variation === e.target.value)
                                      product.variation = variation
                                      sell.cart[index] = product
                                      setSell({...sell, cart: sell.cart})
                                    }}>
                                      <option>Seleccionar variación</option>
                                      {
                                        products.find(prod => prod.name === product.name)?.variations?.variations.map(variation => (
                                          <option key={variation.variation}>{variation.variation}{variation.subVariation && variation.subVariation !== '' ? ` - ${variation.subVariation}` : ''}{variation.subVariation2 && variation.subVariation2 !== '' ? ` - ${variation.subVariation2}` : ''}</option>
                                        ))
                                      }
                                    </Select>
                                  )
                                  : ''
                              }
                            </div>
                          </div>
                          <Input type='number' change={(e: any) => {
                            if (Number(product.stock) >= e.target.value && e.target.value >= 0) {
                              const updatedCart = [...sell.cart]
                              updatedCart[index].quantity = e.target.value
                              setSell({...sell, cart: updatedCart, total: updatedCart.reduce((bef, curr) => curr.quantityOffers ? bef + offer(curr) : bef + curr.price * curr.quantity, 0)})
                            }
                          }} config='w-20' />
                          <p className='mt-auto mb-auto'>${NumberFormat(product.price * Number(product.quantity))}</p>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const updatedCart = sell.cart.filter(prod => prod.name !== product.name)
                            setSell({...sell, cart: updatedCart, total: updatedCart.reduce((bef, curr) => curr.quantityOffers ? bef + offer(curr) : bef + curr.price * curr.quantity, 0)})
                          }}><IoClose className='mt-auto mb-auto text-lg' /></button>
                        </div>
                      ))
                      : ''
                  }
                </div>
                <div className='flex gap-2 justify-between'>
                  <p>Total</p>
                  <p>${NumberFormat(sell.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0))}</p>
                </div>
              </Card>
              <Card title='Datos'>
                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <p className='mb-2 text-sm'>Nombre</p>
                    <Input placeholder='Nombre' name='firstName' change={inputChange} value={sell.firstName} />
                  </div>
                  <div className='w-1/2'>
                    <p className='mb-2 text-sm'>Apellido</p>
                    <Input placeholder='Apellido' name='lastName' change={inputChange} value={sell.lastName!} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Correo electronico</p>
                  <Input placeholder='Email' name='email' change={inputChange} value={sell.email} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Teléfono</p>
                  <div className='flex gap-2'>
                    <p className='m-auto text-sm rounded dark:border-neutral-600'>+56</p>
                    <Input placeholder='Teléfono' name='phone' change={inputChange} value={sell.phone!} />
                  </div>
                </div>
              </Card>
              <Card title='Dirección'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Dirección</p>
                  <Input placeholder='Dirección' name='address' change={inputChange} value={sell.address} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Número</p>
                  <Input placeholder='Número' name='number' change={inputChange} value={sell.number} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Detalles (Opcional)</p>
                  <Input placeholder='Detalles' name='details' change={inputChange} value={sell.details!} />
                </div>
                <ShippingCost setClientData={setSell} clientData={sell} setChilexpress={setChilexpress} dest={dest} setDest={setDest} streets={streets} setStreets={setStreets} />
                {
                  streets.length
                    ? (
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Se han detectado más de una calle con el nombre que ingresaste</p>
                        <div className='flex gap-2 flex-wrap'>
                          {
                            streets.map((street: any) => (
                              <button key={street.streetName} className='flex gap-2 p-2 border' onClick={(e: any) => {
                                e.preventDefault()
                                setDest({ ...dest, streetName: street.streetName })
                              }}>
                                <input type='radio' checked={street.streetName === dest.streetName} />
                                <p className='text-sm'>{street.streetName}</p>
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    )
                    : ''
                }
              </Card>
            </div>
            <div className='flex gap-6 flex-col w-full lg:w-1/3'>
              <Card title='Envío'>
                {
                  sell.city !== ''
                    ? (
                      <>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Metodo de envío</p>
                          <Select change={inputChange} name='shippingMethod'>
                            <option>Seleccionar metodo de envío</option>
                            <option>Chilexpress</option>
                            <option>Entrega directa</option>
                          </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Estado del envío</p>
                          <Select change={inputChange} name='shippingState'>
                            <option>Seleccionar estado del envío</option>
                            {
                              sell.shippingMethod === 'Chilexpress'
                                ? (
                                  <>
                                    <option>No empaquetado</option>
                                    <option>Productos empaquetados</option>
                                    <option>Envío realizado</option>
                                  </>
                                )
                                : ''
                            }
                            {
                              sell.shippingMethod === 'Entrega directa'
                                ? (
                                  <>
                                    <option>No entregado</option>
                                    <option>Entregado</option>
                                  </>
                                )
                                : ''
                            }
                          </Select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa la región y ciudad para ver las opciones de envíos</p>
                }
                {
                  chilexpress.length
                    ? sell.shippingMethod === 'Chilexpress' && (sell.shippingState === 'No empaquetado' || sell.shippingState === 'Productos empaquetados')
                      ? (
                        <div className='flex flex-col gap-2'>
                          {
                            chilexpress.map((service: any) => (
                              <div className='flex gap-2 justify-between' key={service.serviceDescription}>
                                <div className='flex gap-2'>
                                  <input type='radio' name='shipping' onClick={() => {
                                    setServiceTypeCode(service.serviceTypeCode)
                                    setSell({...sell, shippingMethod: service.serviceDescription, shipping: service.serviceValue, total: sell.cart.reduce((bef, curr) => curr.quantityOffers?.length ? bef + offer(curr) : bef + curr.price * curr.quantity, 0) + Number(service.serviceValue)})
                                  }} />
                                  <p className='text-sm'>{service.serviceDescription}</p>
                                </div>
                                <p className='text-sm'>${NumberFormat(service.serviceValue)}</p>
                              </div>
                            ))
                          }
                        </div>
                      )
                      : sell.shippingMethod === 'Chilexpress' && sell.shippingState === 'Envío realizado'
                        ? (
                          <div className='flex flex-col gap-2'>
                            <p>Ingresa el monto del envío</p>
                            <Input change={(e: any) => setSell({ ...sell, shipping: e.target.value })} placeholder='Envío' value={sell.shipping} />
                          </div>
                        )
                        : ''
                    : ''
                }
              </Card>
              <Card title='Pago'>
                {
                  sell.shippingMethod
                    ? (
                      <>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Metodo de pago</p>
                          <Select change={inputChange} name='pay'>
                            <option>Seleccionar metodo de pago</option>
                            <option>WebPay Plus</option>
                            <option>MercadoPago</option>
                            <option>Transferencia</option>
                          </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Estado del pago</p>
                          <Select change={inputChange} name='state'>
                            <option>Seleccionar estado del pago</option>
                            <option>Pago no realizado</option>
                            <option>Pago iniciado</option>
                            <option>Pago rechazado</option>
                            <option>Pago realizado</option>
                          </Select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa los datos de envío para ver las opciones de pago</p>
                }
              </Card>
            </div>
          </form>
        </div>
    </>
  )
}