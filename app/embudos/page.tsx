"use client"
import { PopupDeleteFunnel, PopupNewFunnel, PopupStadistics } from "@/components/funnels"
import { Button, Button2, Button2Red, ButtonRed, ButtonSecondary, ButtonSecondary2, Select, Spinner } from "@/components/ui"
import { IClient, IFunnel, IService } from "@/interfaces"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function FunnelPage () {

  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunnel, setNewFunnel] = useState<IFunnel>({ funnel: '', steps: [{ step: '', slug: '' }] })
  const [loadingFunnels, setLoadingFunnels] = useState(true)
  const [selectFunnel, setSelectFunnel] = useState<IFunnel>()
  const [clients, setClients] = useState<IClient[]>([])
  const [selectClient, setSelectClient] = useState<IClient>()
  const [title, setTitle] = useState('')
  const [popupDelete, setPopupDelete] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [error, setError] = useState('')
  const [services, setServices] = useState<IService[]>([])
  const [popupStadistics, setPopupStadistics] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })

  const { data: session } = useSession()

  const getFunnels = async () => {
    setLoadingFunnels(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
    setLoadingFunnels(false)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      <PopupNewFunnel popup={popup} setPopup={setPopup} getFunnels={getFunnels} newFunnel={newFunnel} setNewFunnel={setNewFunnel} selectFunnel={selectFunnel!} title={title} error={error} setError={setError} services={services} funnels={funnels} />
      <PopupDeleteFunnel popupDelete={popupDelete} setPopupDelete={setPopupDelete} setSelectFunnel={setSelectFunnel} selectFunnel={selectFunnel!} getFunnels={getFunnels} />
      <PopupStadistics popup={popupStadistics} setPopup={setPopupStadistics} clients={clients} funnel={selectFunnel!} />
      <main className="w-full h-full p-4 lg:p-6 flex flex-col gap-6 bg-bg min-h-full max-h-full overflow-y-auto dark:bg-neutral-900">
        <div className="w-full flex flex-col gap-6 mx-auto max-w-[1280px]">
          <div className="flex gap-4 justify-between">
            <h1 className="text-lg font-medium my-auto">Embudos</h1>
            {
              session?.user.type === 'Administrador'
                ? (
                  <Button action={(e: any) => {
                    e.preventDefault()
                    setError('')
                    setNewFunnel({ funnel: '', description: '', steps: [{ step: '', slug: '' }] })
                    setTitle('Nuevo embudo')
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Nuevo embudo</Button>
                )
                : ''
            }
          </div>
          {
            loadingFunnels
              ? (
                <div className="flex w-full">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
              : funnels.length
                ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 flex-col lg:flex-row">
                      <Select change={(e: any) => {
                        const funnel = funnels.find(funnel => funnel.funnel === e.target.value)
                        setSelectFunnel(funnel)
                      }} config="w-fit min-w-52">
                        <option>Seleccionar embudo</option>
                        {
                          funnels.map(funnel => (
                            <option key={funnel._id} value={funnel.funnel}>{funnel.funnel}</option>
                          ))
                        }
                      </Select>
                      {
                        selectFunnel
                          ? (
                            <>
                              {
                                session?.user.type === 'Administrador'
                                  ? (
                                    <Button2 action={(e: any) => {
                                      e.preventDefault()
                                      setError('')
                                      setNewFunnel(selectFunnel)
                                      setTitle(selectFunnel.funnel)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    } }>Editar embudo</Button2>
                                  )
                                  : ''
                              }
                              <ButtonSecondary2 action={(e: any) => {
                                e.preventDefault()
                                setPopupStadistics({ ...popupStadistics, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupStadistics({ ...popupStadistics, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}>Estadisticas</ButtonSecondary2>
                              {
                                session?.user.type === 'Administrador'
                                  ? (
                                    <Button2Red action={(e: any) => {
                                      e.preventDefault()
                                      setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }}>Eliminar embudo</Button2Red>
                                  )
                                  : ''
                              }
                            </>
                          )
                          : ''
                      }
                    </div>
                    {
                      selectFunnel
                        ? (
                          <div className="flex gap-4 overflow-x-auto">
                            {
                              selectFunnel.steps.map(step => (
                                <div key={step._id} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                                  const oldClients = [...clients]
                                  oldClients.find(client => client.email === selectClient?.email)!.funnels!.find(funnel => funnel.funnel === selectFunnel._id)!.step = step._id!
                                  setClients(oldClients)
                                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, { email: selectClient?.email, funnels: [{ funnel: selectFunnel._id, step: step._id }] })
                                }} className="flex flex-col bg-white border border-black/5 rounded-xl dark:bg-neutral-800" style={{ minHeight: 'calc(100vh - 210px)', boxShadow: '0px 3px 10px 3px #11111108' }}>
                                  <p className="min-w-64 p-4 border-b border-black/5 dark:border-neutral-700">{step.step}</p>
                                  {
                                    clients.map(client => {
                                      if (client.funnels!.find(funnel => funnel.funnel === selectFunnel._id)!?.funnel === selectFunnel._id && client.funnels!.find(funnel => funnel.funnel === selectFunnel._id)!.step === step._id) {
                                        const formattedDateLocal = new Date(client.updatedAt!).toLocaleDateString('es-ES', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric'
                                        });
                                        return (
                                          <Link key={client._id} href={`/clientes/${client.email}`} className="p-2 flex flex-col border-b border-black/5" draggable onDragStart={() => setSelectClient(client)}>
                                            <p>{client.firstName}</p>
                                            <p>{client.email}</p>
                                            <p>{formattedDateLocal}</p>
                                          </Link>
                                        )
                                      }
                                    })
                                  }
                                </div>
                              ))
                            }
                          </div>
                        )
                        : ''
                    }
                  </div>
                )
                : <p className='text-sm'>No tienes embudos creados</p>
          }
        </div>
      </main>
    </>
  )
}