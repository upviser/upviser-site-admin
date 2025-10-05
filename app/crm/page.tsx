"use client"
import { PopupNewService } from "@/components/service"
import { Button, Button2, Button2Secondary, ButtonSecondary2, Select, Spinner } from "@/components/ui"
import { Design, ICall, IClient, IService, ITag } from "@/interfaces"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {

  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState<IService>()
  const [clients, setClients] = useState<IClient[]>([])
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [loadingService, setLoadingService] = useState(false)
  const [title, setTitle] = useState('Nuevo servicio')
  const [error, setError] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunctionality, setNewFunctionality] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [selectClient, setSelectClient] = useState<IClient>()
  const [popupStadistics, setPopupStadistics] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [design, setDesign] = useState<Design>()
  const [calls, setCalls] = useState<ICall[]>([])

  const { data: session } = useSession()

  const getServices = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getServices()
  }, [])

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const getDesign = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    setDesign(res.data)
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getCalls = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
    setCalls(res.data)
  }

  useEffect(() => {
    getCalls()
  }, [])

  return (
    <>
      <PopupNewService popupService={popup} setPopupService={setPopup} newService={newService} setNewService={setNewService} loadingService={loadingService} setLoadingService={setLoadingService} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} services={[]} setError={setError} calls={calls} design={design} />
      <div onClick={() => {
        if (!popup.mouse) {
          setPopupStadistics({ ...popupStadistics, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupStadistics({ ...popupStadistics, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupStadistics.view} ${popupStadistics.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50 p-4`}>
        <div onMouseEnter={() => setPopupStadistics({ ...popupStadistics, mouse: true })} onMouseLeave={() => setPopupStadistics({ ...popupStadistics, mouse: false })} onMouseMove={() => setPopupStadistics({ ...popupStadistics, mouse: true })} className={`${popupStadistics.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-5 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="text-lg font-medium">Estadisticas</p>
          <p className='font-medium'>Tasa de conversion</p>
          <div className={`overflow-y-auto flex gap-2`}>
            {
              services.find(serv => serv._id === service?._id)?.steps.map((step, index, steps) => (
                <div key={step._id} className='flex flex-col gap-2 justify-between min-w-28'>
                  <p className='text-center my-auto'>{step.step}</p>
                  <p className='text-2xl font-medium mx-auto text-center'>
                    {
                      clients.filter(client => 
                        client.services?.some(serv => 
                          serv.service === service?._id && 
                          steps.findIndex(s => s._id === serv.step) >= index
                        )
                      ).length
                    }
                  </p>
                  <p className='text-center text-lg font-medium'>
                    {
                      (() => {
                        // Clientes en el último paso del embudo
                        const clientsInLastStep = clients.filter(client => 
                          client.services?.some(serv => 
                            serv.service === service?._id && 
                            serv.step === steps.slice(-1)[0]._id
                          )
                        ).length;

                        // Clientes en el paso actual o posterior
                        const clientsInCurrentOrLaterStep = clients.filter(client => 
                          client.services?.some(serv => 
                            serv.service === service?._id && 
                            steps.findIndex(s => s._id === serv.step) >= index
                          )
                        ).length;

                        // Si no hay clientes en el último paso, mostrar '0%'
                        if (clientsInLastStep === 0) {
                          return '0%';
                        }

                        // Calcular el porcentaje
                        const percentage = (clientsInCurrentOrLaterStep / clientsInLastStep) * 100;
                        return `${percentage.toFixed(2)}%`; // Mostrar con 2 decimales
                      })()
                    }
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full max-h-full overflow-y-auto'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>CRM</h1>
            {
              session?.user.type === 'Administrador'
                ? (
                  <Button action={(e: any) => {
                    e.preventDefault()
                    setError('')
                    setNewService({ name: '', description: '', typePay: 'El precio incluye el IVA', steps: [{ step: '' }], typeService: '', typePrice: '', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] } })
                    setTitle('Nuevo servicio')
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Crear nuevo servicio</Button>
                )
                : ''
            }
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
                : services.length
                  ? (
                    <div className="flex flex-col gap-4">
                      <p>Selecciona el servicio</p>
                      <div className="flex gap-4 flex-col lg:flex-row">
                        <Select change={(e: any) => setService(services.find(servi => servi.name === e.target.value))} config="w-fit">
                          <option>Seleccionar servicio</option>
                          {
                            services.map(service => <option key={service._id}>{service.name}</option>)
                          }
                        </Select>
                        {
                          service
                            ? (
                              <>
                                {
                                  session?.user.type === 'Administrador'
                                    ? (
                                      <Button2 action={(e: any) => {
                                        e.preventDefault()
                                        setError('')
                                        setNewService(service)
                                        setTitle('Editar servicio')
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                        setTimeout(() => {
                                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                        }, 10)
                                      }} config="my-auto">Editar servicio</Button2>
                                    )
                                    : ''
                                }
                                <ButtonSecondary2 action={(e: any) => {
                                  e.preventDefault()
                                  setPopupStadistics({ ...popupStadistics, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopupStadistics({ ...popupStadistics, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }} config="my-auto">Estadisticas</ButtonSecondary2>
                              </>
                            )
                            : ''
                        }
                      </div>
                      {
                        service
                          ? (
                            <div className="flex gap-4 overflow-x-auto max-w-full">
                              {
                                service.steps.map(step => (
                                  <div key={step.step} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                                    const oldClients = [...clients]
                                    oldClients.find(client => client.email === selectClient?.email)!.services!.find(servi => servi.service === service._id)!.step = step._id!
                                    setClients(oldClients)
                                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, { email: selectClient?.email, services: [{ service: service._id, step: step._id }] })
                                  }} className="flex flex-col bg-white border border-black/5 rounded-xl dark:bg-neutral-800" style={{ minHeight: 'calc(100vh - 258px)', boxShadow: '0px 3px 10px 3px #11111108' }}>
                                    <p className="min-w-64 p-4 border-b border-black/5 dark:border-neutral-700">{step.step}</p>
                                    {
                                      clients.map(client => {
                                        if (client.services?.find(servi => servi.service === service._id) && client.services?.find(servi => servi.service)?.step === step._id) {
                                          const formattedDateLocal = new Date(client.updatedAt!).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                          });
                                          return (
                                            <Link key={client._id} href={`/clientes/${client.email}`} draggable onDragStart={() => setSelectClient(client)} className="p-2 flex flex-col border-b dark:border-neutral-700">
                                              <p>{client.firstName}</p>
                                              <p>{client.email}</p>
                                              <p>{formattedDateLocal}</p>
                                            </Link>
                                          )
                                        }
                                      })
                                    }
                                  </div>
                                ))}
                              </div>
                            )
                          : ''
                      }
                      
                    </div>
                  )
                  : <p className="text-sm">No tienes servicios creados para ver su CRM</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}