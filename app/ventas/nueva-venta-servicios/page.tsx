"use client"
import { ButtonSubmit, Card, Input, Select } from "@/components/ui";
import { IService, IStepService } from "@/interfaces";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Page () {

  const [pay, setPay] = useState({ firstName: '', lastName: '', email: '', phone: '', service: '', stepService: '', typeService: '', typePrice: '', plan: '', price: '', state: '', method: '' })
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<IService[]>([])
  const [selectService, setSelectService] = useState<IService>()
  const [state, setState] = useState('') 

  const router = useRouter()

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const sellSubmit = async () => {
    if (!loading) {
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay`, pay)
      await axios.post(`${process.env.ENXT_PUBLIC_API_URL}/client`, { ...pay, services: [{ service: pay.service, step: pay.stepService, plan: pay.plan, price: pay.price, payStatus: state }] })
      router.push('/ventas')
    }
  }

  return (
    <>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
        <div className='flex m-auto w-full max-w-[1280px]'>
          <div className='flex gap-6 ml-auto w-fit'>
            {
              pay.email === ''
                ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed w-36 h-10 text-white text-sm rounded-xl'>Crear venta</button>
                : <ButtonSubmit action={sellSubmit} submitLoading={loading} textButton='Crear venta' color='main' config='w-36' />
            }
            <Link className='text-sm my-auto' href='/ventas'>Descartar</Link>
          </div>
        </div>
      </div>
      <div className='p-6 bg-bg flex flex-col gap-6 w-full overflow-y-scroll dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
        <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
          <Link href='/ventas' className='border border-border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
          <h1 className='text-xl mt-auto mb-auto font-medium'>Nueva venta de servicios</h1>
        </div>
        <form className='flex gap-6 w-full max-w-[1280px] m-auto flex-col lg:flex-row'>
          <div className='flex gap-6 flex-col w-full lg:w-2/3'>
            <Card title='Datos'>
              <div className='flex gap-2'>
                <div className='w-1/2'>
                  <p className='mb-2 text-sm'>Nombre</p>
                  <Input placeholder='Nombre' name='firstName' change={(e: any) => setPay({ ...pay, firstName: e.target.value })} value={pay.firstName} />
                </div>
                <div className='w-1/2'>
                  <p className='mb-2 text-sm'>Apellido</p>
                  <Input placeholder='Apellido' name='lastName' change={(e: any) => setPay({ ...pay, lastName: e.target.value })} value={pay.lastName!} />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Correo electronico</p>
                <Input placeholder='Email' name='email' change={(e: any) => setPay({ ...pay, email: e.target.value })} value={pay.email} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Telefono</p>
                <div className='flex gap-2'>
                  <p className='m-auto text-sm rounded dark:border-neutral-600'>+56</p>
                  <Input placeholder='Teléfono' name='phone' change={(e: any) => setPay({ ...pay, phone: e.target.value })} value={pay.phone!} />
                </div>
              </div>
            </Card>
            <Card title='Servicio'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Servicio</p>
                <Select change={(e: any) => {
                  e.preventDefault()
                  const select = services.find(service => service._id === pay.service)
                  setPay({ ...pay, service: e.target.value, stepService: select?.steps[0]._id!, typeService: select?.typeService!, typePrice: select?.typePrice!, price: select?.typeService === 'Servicio unico' && select?.typePrice === 'Pago unico' ? select?.typePay === 'Hay que agregarle el IVA al precio' ? (Number(select.price!) / 100 * 119).toString() : select.price! : '' })
                  setSelectService(services.find(service => service._id === e.target.value))
                }} value={pay.service}>
                  <option>Seleccionar servicio</option>
                  {
                    services.length
                      ? services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                      ))
                      : ''
                  }
                </Select>
              </div>
              {
                selectService?.typeService === 'Diferentes planes'
                  ? (
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Plan</p>
                      <Select change={(e: any) => {
                        e.preventDefault()
                        setPay({ ...pay, plan: e.target.value, price: selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.plans?.plans.find(plan => plan._id === e.target.value)?.price!) / 100 * 119).toString() : selectService.plans?.plans.find(plan => plan._id === e.target.value)?.price! })
                      }} value={pay.plan}>
                        <option>Seleccionar plan</option>
                        {
                          selectService.plans?.plans.length
                            ? selectService.plans.plans.map(plan => (
                              <option key={plan._id} value={plan._id}>{plan.name}</option>
                            ))
                            : ''
                        }
                      </Select>
                    </div>
                  )
                  : ''
              }
              {
                selectService?.typePrice === 'Precio variable' || selectService?.typePrice === 'Precio variable con suscripción' || selectService?.typePrice === 'Pago variable con 2 pagos'
                  ? (
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Precio</p>
                      <Input placeholder='Precio' change={(e: any) => setPay({ ...pay, price: e.target.value })} value={pay.price} />
                    </div>
                  )
                  : ''
              }
              {
                selectService?.typePrice === 'Suscripción' || selectService?.typePrice === 'Precio variable con suscripción'
                  ? (
                    <div className='flex flex-col gap-2'>
                <p className='text-sm'>Tipo de pago</p>
                <Select change={(e: any) => {
                  e.preventDefault()
                  setPay({ ...pay, price: selectService.typeService === 'Diferentes planes' ? e.target.value === 'Plan mensual' ? selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.plans?.plans.find(plan => plan._id === pay.stepService)?.price!) / 100 * 119).toString() : selectService.plans?.plans.find(plan => plan._id === pay.plan)?.price! : e.target.value === 'Plan anual' ? selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.plans?.plans.find(plan => plan._id === pay.plan)?.anualPrice!) / 100 * 119).toString() : selectService.plans?.plans.find(plan => plan._id === pay.plan)?.anualPrice! : '' :  e.target.value === 'Plan mensual' ? selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.price!) / 100 * 119).toString() : selectService.price! : e.target.value === 'Plan anual' ? selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.anualPrice!) / 100 * 119).toString() : selectService.anualPrice! : '' })
                }}>
                  <option value=''>Seleccionar tipo de pago</option>
                  <option>Plan mensual</option>
                  <option>Plan anual</option>
                </Select>
              </div>
                  )
                  : ''
              }
            </Card>
          </div>
          <div className='flex gap-6 flex-col w-full lg:w-1/3'>
            <Card title='Pago'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Metodo de pago</p>
                <Select change={(e: any) => setPay({ ...pay, method: e.target.value })} name='pay'>
                  <option>Seleccionar metodo de pago</option>
                  <option>WebPay Plus</option>
                  <option>MercadoPago</option>
                  <option>Transferencia</option>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Estado del pago</p>
                <Select change={(e: any) => {
                  setPay({ ...pay, state: e.target.value === 'Segundo pago realizado' ? 'Pago realizado' : 'Pago realizado', price: selectService?.typePrice === '2 pagos' || selectService?.typePrice === 'Precio variable con 2 pagos' ? e.target.value === 'Pago realizado' ? selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.price!) / 100 * 119 / 2).toString() : (Number(selectService.price!) / 2).toString() : selectService.typePay === 'Hay que agregarle el IVA al precio' ? (Number(selectService.price!) / 100 * 119).toString() : selectService.price! : pay.price })
                  setState(e.target.value)
                }} name='state'>
                  <option>Seleccionar estado del pago</option>
                  <option>Pago no realizado</option>
                  <option>Pago realizado</option>
                  <option>Segundo pago realizado</option>
                </Select>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </>
  )
}