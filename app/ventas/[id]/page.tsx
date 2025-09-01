"use client"
import { Button, Button2, Button2Red, ButtonSubmit, ButtonSubmit2, Card, Input, Popup, Spinner, Spinner2 } from "@/components/ui"
import { IFunnel, ISell, IService } from "@/interfaces"
import { NumberFormat, offer } from "@/utils"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import Image from 'next/image'
import { useRouter } from "next/navigation"

export default function Page ({ params }: { params: { id: string } }) {

  const [pay, setPay] = useState<any>()
  const [sell, setSell] = useState<ISell>()
  const [service, setService] = useState<IService>()
  const [funnel, setFunnel] = useState<IFunnel>()
  const [loading, setLoading] = useState(true)
  const [loadingEditPay, setLoadingEditPay] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [shippingCode, setShippingCode] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opcity-0', mouse: false })
  const [suscription, setSuscription] = useState<any>()

  const router = useRouter()

  const getPay = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells/${params.id}`)
    if (!response.data._id) {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/${params.id}`)
      setPay(res.data)
      if (res.data.service) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service/${res.data.service}`)
        setService(response.data)
      }
      if (res.data.funnel) {
        const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${res.data.funnel}`)
        setFunnel(response2.data)
      }
      if (res.data.suscriptionId && res.data.suscriptionId !== '') {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment`)
        const resp2 = await axios.get(`https://api.mercadopago.com/preapproval/${res.data.suscriptionId}`, {
          headers: {
            Authorization: `Bearer ${resp.data.suscription.accessToken}`
          }
        })
        setSuscription({ state: resp2.data.status, lastPay: resp2.data.summarized.last_charged_date, nextPay: resp2.data.next_payment_date, quantity: resp2.data.summarized.charged_quantity })
      }
      setLoading(false)
    } else {
      setSell(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPay()
  }, [])

  const getSell = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells/${params.id}`)
    setSell(response.data)
  }

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      const updatedSell = {...sell, state: 'Cancelado'}
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell?._id}`, {sell: updatedSell})
      router.push('/ventas')
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      getSell()
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
      }, 200)
      setLoading(false)
    }
  }

  return (
    <>
      <Popup popup={popup} setPopup={setPopup}>
        <p>Estas seguro que deseas cancelar la venta <span className='font-semibold'>{sell?._id}</span></p>
        <div className='flex gap-6'>
          <ButtonSubmit action={deleteProduct} submitLoading={loading} textButton='Cancelar venta' color='red-500' config='w-36'  />
          <button onClick={() => {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }}>Cancelar</button>
        </div>
      </Popup>
      <div className='bg-bg p-6 overflow-y-auto dark:bg-neutral-900 h-full'>
        <div className='flex flex-col gap-6 w-full max-w-[1280px] m-auto'>
          <div className='flex gap-3 w-full justify-between m-auto'>
            <div className='flex gap-3 my-auto'>
              <Link href='/ventas' className='border rounded-xl p-2 bg-white transition-colors duration-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
              <h1 className='text-2xl font-medium mt-auto mb-auto'>venta: { sell?.buyOrder ? sell.buyOrder : pay?._id }</h1>
            </div>
          </div>
          {
            loading
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-36 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : sell?._id
                ? (
                  <div className='flex gap-6 w-full mx-auto'>
                    <div className='flex gap-6 flex-col w-3/5'>
                      <Card title='Productos'>
                        {
                          sell?.cart?.map(product => (
                            <div className='flex gap-2 justify-between' key={product._id}>
                              <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                  <Image className='w-28 object-contain' src={product.image} alt={product.name} width={150} height={150} />
                                </div>
                                <div className='mt-auto mb-auto'>
                                  <p className='text-sm font-medium'>{product.name}</p>
                                  <p className='text-sm'>Cantidad: {product.quantity}</p>
                                  {
                                    product.variation?.variation
                                      ? product.variation?.subVariation
                                        ? product.variation.subVariation2
                                          ? <p className='text-sm'>Variante: {product.variation.variation} / {product.variation.subVariation} / {product.variation.subVariation2}</p>
                                          : <p className='text-sm'>Variante: {product.variation.variation} / {product.variation.subVariation}</p>
                                        : <p className='text-sm'>Variante: {product.variation.variation}</p>
                                      : ''
                                  }
                                </div>
                              </div>
                              <div className='mt-auto mb-auto'>
                                <p className='text-sm'>${NumberFormat(product.quantityOffers?.length ? offer(product) : product.price * product.quantity)}</p>
                              </div>
                            </div>
                          ))
                        }
                        <div className='flex gap-2 justify-between'>
                          <p className='text-sm'>Subtotal</p>
                          <p className='text-sm'>${NumberFormat(sell?.cart?.reduce((bef, curr) => curr.quantityOffers?.length ? bef + offer(curr) : bef + curr.price * curr.quantity, 0)!)}</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p className='text-sm'>Envío</p>
                          <p className='text-sm'>${NumberFormat(sell?.shipping!)}</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p className='font-medium'>Total</p>
                          <p className='font-medium'>${NumberFormat(sell?.total!)}</p>
                        </div>
                      </Card>
                      <Card title='Pago'>
                        <p className='text-sm'>Estado del pago: {sell?.state}</p>
                        <p className='text-sm'>Metodo de pago: {sell?.pay}</p>
                        {
                          sell?.pay === 'Pago en la entrega'
                            ? sell?.state === 'No pagado'
                              ? (
                                <ButtonSubmit2 action={async (e: any) => {
                                  e.preventDefault()
                                  if (!loadingEditPay) {
                                    setLoadingEditPay(true)
                                    const updatedSell = {...sell, state: 'Pago realizado'}
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                    await getSell()
                                    setLoadingEditPay(false)
                                  }
                                }} color='main' submitLoading={loadingEditPay} textButton='Marcar pago realizado' config='w-64' />
                              )
                              : ''
                            : ''
                        }
                      </Card>
                      <Card title='Entrega'>
                        <p className='text-sm'>Estado del envío: {sell?.shippingState}</p>
                        <p className='text-sm'>Metodo del envío: {sell?.shippingMethod}</p>
                        {
                          sell?.shippingState === 'No empaquetado'
                            ? (
                              <ButtonSubmit2 action={async (e: any) => {
                                e.preventDefault()
                                if (!loadingEdit) {
                                  setLoadingEdit(true)
                                  const updatedSell = {...sell, shippingState: 'Productos empaquetados'}
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                  await getSell()
                                  setLoadingEdit(false)
                                }
                              }} color='main' submitLoading={loadingEdit} textButton='Marcar como empaquetado' config='w-64' />
                            )
                            : ''
                        }
                        {
                          sell?.shippingState === 'Productos empaquetados'
                            ? sell?.shippingMethod === 'ENVIO EXPRESS'
                              ? (
                                <ButtonSubmit2 action={async (e: any) => {
                                  e.preventDefault()
                                  if (!loadingEdit) {
                                    setLoadingEdit(true)
                                    const updatedSell = {...sell, shippingState: 'Envío realizado'}
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sell._id}`, {sell: updatedSell})
                                    await getSell()
                                    setLoadingEdit(false)
                                  }
                                }} color='main' submitLoading={loadingEdit} textButton='Marcar como enviado' config='w-52' />
                              )
                              : (
                                <div className='flex flex-col gap-2'>
                                  <Button action={(e: any) => {
                                    e.preventDefault()
                                    if (sell.shippingLabel) {
                                      const byteChars = atob(sell.shippingLabel.replace(/\s/g, ''));
                                      const byteNumbers = new Array(byteChars.length);
                                      for (let i = 0; i < byteChars.length; i++) {
                                        byteNumbers[i] = byteChars.charCodeAt(i);
                                      }
                                      const byteArray = new Uint8Array(byteNumbers);
                                      const blob = new Blob([byteArray], { type: 'application/pdf' });

                                      // Crear URL temporal y disparar descarga
                                      const url = URL.createObjectURL(blob);
                                      const link = document.createElement('a');
                                      link.href = url;
                                      link.download = 'etiqueta.pdf';
                                      link.click();
                                      URL.revokeObjectURL(url);
                                    }
                                  }}>Descargar etiqueta</Button>
                                </div>
                              )
                            : ''
                        }
                      </Card>
                    </div>
                    <div className='flex gap-6 flex-col w-2/5'>
                      <Card title='Datos del cliente'>
                        <Link className='text-sm block' href={`/clientes/${sell?.email}`}>{sell?.firstName} {sell?.lastName}</Link>
                        <Link className='text-sm block' href={`/clientes/${sell?.email}`}>{sell?.email}</Link>
                      </Card>
                      <Card title='Dirección de Envío'>
                        <p className='text-sm'>{sell?.address} {sell?.number} {sell?.details}</p>
                        <p className='text-sm'>{sell?.city}</p>
                        <p className='text-sm'>{sell?.region}</p>
                      </Card>
                      <div className='flex p-2 flex-col gap-4'>
                        <h2 className='font-medium'>Cancelar venta</h2>
                        <Button2Red action={async (e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }}>Cancelar</Button2Red>
                      </div>
                    </div>
                  </div>
                )
                : (
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-6 w-2/3">
                      <Card title='Detalles del pago'>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium">Nombre</p>
                          <p>{pay?.firstName} {pay?.lastName}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium">Monto</p>
                          <p>${NumberFormat(Number(pay?.price))}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium">Estado</p>
                          <p>{pay?.state}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium">Fecha</p>
                          <p>{new Date(pay?.createdAt).toLocaleDateString()} {new Date(pay?.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </Card>
                    </div>
                    <div className="flex flex-col gap-6 w-1/3">
                      <Card title='Detalles'>
                        {
                          pay?.service
                            ? (
                              <div className="flex flex-col gap-2">
                                <p className="font-medium">Servicio</p>
                                <p>{service?.name}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          pay?.stepService
                            ? (
                              <div className="flex flex-col gap-2">
                                <p className="font-medium">Paso servicio</p>
                                <p>{service?.steps.find(step => step._id === pay.stepService)?.step}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          pay?.funnel
                            ? (
                              <div className="flex flex-col gap-2">
                                <p className="font-medium">Embudo</p>
                                <p>{funnel?.funnel}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          pay?.step
                            ? (
                              <div className="flex flex-col gap-2">
                                <p className="font-medium">Paso embudo</p>
                                <p>{funnel?.steps.find(step => step._id === pay.step)?.step}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          suscription?.state
                            ? (
                              <>
                                <div className="flex flex-col gap-2">
                                  <p className="font-medium">Estado suscripción</p>
                                  <p>{suscription.state}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <p className="font-medium">Siguiente pago</p>
                                  <p>{suscription.nextPay.toLocaleDateString("es-CL")}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <p className="font-medium">Ultimo pago</p>
                                  <p>{suscription.lastPay.toLocaleDateString("es-CL")}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <p className="font-medium">Pagos realizados</p>
                                  <p>{suscription.quantity}</p>
                                </div>
                              </>
                            )
                            : ''
                        }
                      </Card>
                    </div>
                  </div>
                )
          }
        </div>
      </div>
    </>
  )
}