"use client"
import { Button, ButtonLink, ButtonSecondary, Select, Spinner, Table } from "@/components/ui"
import { ISell, IService } from "@/interfaces"
import { NumberFormat } from "@/utils"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page () {

  const [pays, setPays] = useState([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<IService[]>([])
  const [sells, setSells] = useState<ISell[]>([])
  const [type, setType] = useState('Productos')

  const router = useRouter()

  const getPays = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pays`)
    setPays(res.data)
  }

  useEffect(() => {
    getPays()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const getSells = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells`)
    setSells(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getSells()
  }, [])

  return (
    <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
      <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto min-h-full max-h-full'>
        <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
          <h1 className='text-lg font-medium my-auto'>Ventas</h1>
          <div className="flex gap-2">
            <ButtonSecondary action={() => router.push('/ventas/nueva-venta-servicios')}>Nueva venta de servicios</ButtonSecondary>
            <ButtonLink href="/ventas/nueva-venta-productos">Nueva venta de productos</ButtonLink>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Seleccionar ventas de productos o servicios</p>
          <Select change={(e: any) => setType(e.target.value)} value={type} config="w-fit">
            <option>Productos</option>
            <option>Servicios</option>
          </Select>
        </div>
        <div className='w-full max-w-[1280px] mx-auto'>
          {
            loading
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : type === 'Productos'
                ? sells.length
                  ? (
                    <Table th={['Email', 'Nombre', 'Total', 'Estado', 'Fecha']}>
                      {
                        sells.map((sell: any, index) => (
                          <tr onClick={() => router.push(`/ventas/${sell._id}`)} className={`${index + 1 < sells.length ? 'border-b border-border' : ''} bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={sell._id}>
                            <td className='p-3'>
                              <p>{sell.email}</p>
                            </td>
                            <td className='p-3'>
                              <p>{sell.firstName} {sell.lastName}</p>
                            </td>
                            <td className='p-3'>
                              <p>${NumberFormat(Number(sell.total))}</p>
                            </td>
                            <td className='p-3'>
                              <p>{sell.shippingState} - {sell.state}</p>
                            </td>
                            <td className='p-3'>
                              <p>{new Date(sell?.createdAt).toLocaleDateString()} {new Date(sell?.createdAt).toLocaleTimeString()}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p className="text-sm">Aun no tienes productos vendidos</p>
                : pays.length
                  ? (
                    <Table th={['Email', 'Nombre', 'Total', 'Servicio', 'Estado', 'Fecha']}>
                      {
                        pays.map((pay: any, index) => (
                          <tr onClick={() => router.push(`/ventas/${pay._id}`)} className={`${index + 1 < pays.length ? 'border-b border-border' : ''} bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={pay._id}>
                            <td className='p-3'>
                              <p>{pay.email}</p>
                            </td>
                            <td className='p-3'>
                              <p>{pay.firstName} {pay.lastName}</p>
                            </td>
                            <td className='p-3'>
                              <p>${NumberFormat(Number(pay.price))}</p>
                            </td>
                            <td className='p-3'>
                              <p>{services.find(service => service._id === pay.service)?.name}</p>
                            </td>
                            <td className='p-3'>
                              <p>{pay.state}</p>
                            </td>
                            <td className='p-3'>
                              <p>{new Date(pay?.createdAt).toLocaleDateString()} {new Date(pay?.createdAt).toLocaleTimeString()}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p className="text-sm">Aun no tienes servicios vendidos</p>
          }
        </div>
      </div>
    </div>
  )
}