"use client"
import { PopupNewService } from "@/components/service"
import { Button, ButtonSubmit, Popup, Spinner, Table } from "@/components/ui"
import { Design, ICall, IService, ITag } from "@/interfaces"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

export default function Page() {

  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [title, setTitle] = useState('Nuevo servicio')
  const [error, setError] = useState('')
  const [newFunctionality, setNewFunctionality] = useState('')
  const [popupDelete, setPopupDelete] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [tags, setTags] = useState<ITag[]>([])
  const [design, setDesign] = useState<Design>()
  const [calls, setCalls] = useState<ICall[]>([])

  const { data: session } = useSession()

  const router = useRouter()

  const getServices = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getServices()
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
      <Popup popup={popupDelete} setPopup={setPopupDelete}>
        <p>¿Estas seguro que deseas eliminar el servicio <span className="font-medium">{newService.name}</span>?</p>
        <div className="flex gap-6">
          <ButtonSubmit submitLoading={loadingDelete} textButton='Eliminar' action={async (e: any) => {
            e.preventDefault()
            if (!loadingDelete) {
              setLoadingDelete(true)
              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/service/${newService._id}`)
              getServices()
              setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
                setLoadingDelete(false)
              }, 200)
            }
          }} color='red-500' config="w-28" />
          <button className="text-sm">Cancelar</button>
        </div>
      </Popup>
      <PopupNewService popupService={popup} setPopupService={setPopup} newService={newService} setNewService={setNewService} loadingService={loading} setLoadingService={setLoading} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} services={services} setError={setError} design={design} calls={calls} />
      <div className='p-4 lg:p-6 w-full min-h-full max-h-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900'>
        <div className='w-full flex gap-4 justify-between max-w-[1280px] mx-auto'>
          <h1 className='text-lg font-medium my-auto'>Servicios</h1>
          {
            session?.user.type === 'Administrador'
              ? (
                <Button action={(e: any) => {
                  e.preventDefault()
                  setError('')
                  setNewService({ name: '', description: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }, tags: [] })
                  setTitle('Nuevo servicio')
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                  }, 10)
                }}>Nuevo servicio</Button>
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
                  <Table th={['nombre', 'Cantidad de pasos', 'Fecha de creación', '']}>
                    {
                      services.map((service, index) => (
                        <tr className={`${index + 1 < services.length ? 'border-b border-black/5' : ''} bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={service._id}>
                          <td className='p-3' onClick={() => {
                            setError('')
                            setNewService(service)
                            setTitle('Editar servicio')
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}>
                            <p>{service.name}</p>
                          </td>
                          <td className='p-3' onClick={() => {
                            setError('')
                            setNewService(service)
                            setTitle('Editar servicio')
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}>
                            <p>{service.steps.length}</p>
                          </td>
                          <td className='p-3' onClick={() => {
                            setError('')
                            setNewService(service)
                            setTitle('Editar servicio')
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}>
                            <p>{new Date(service.createdAt!).getDate()} / {new Date(service.createdAt!).getMonth() + 1} {new Date(service.createdAt!).getFullYear()} {new Date(service.createdAt!).getHours()}:{new Date(service.createdAt!).getMinutes()}</p>
                          </td>
                          <td className='p-3'>
                            {
                              session?.user.type === 'Administrador'
                                ? (
                                  <button onClick={(e: any) => {
                                    e.preventDefault()
                                    setNewService(service)
                                    setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
                                    setTimeout(() => {
                                      setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-1' })
                                    }, 10)
                                  }}><AiOutlineClose /></button>
                                )
                                : ''
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </Table>
                )
                : <p className="text-sm">No tienes servicios creados</p>
          }
        </div>
      </div>
    </>
  )
}