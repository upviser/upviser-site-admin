import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Button2, ButtonSubmit2, Calendar, Input, Select, Textarea } from '../ui'
import { ICall, IClientData, IFunnel, IStoreData, ITag } from '@/interfaces'
import { AiOutlineClose } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { IoMdClose } from 'react-icons/io'

interface Props {
  popupCall: { view: string, opacity: string, mouse: boolean }
  setPopupCall: any
  titleMeeting: string
  newCall: ICall
  setNewCall: any
  getCalls: any
  tags: ITag[]
  getTags: any
  error: string
  setError: any
  funnels: IFunnel[]
  newData: string
  setNewData: any
  loadingNewData: boolean
  setLoadingNewData: any
  clientData: IClientData[]
  getClientData: any
  calls?: ICall[]
  storeData?: IStoreData
}

export const PopupNewCall: React.FC<Props> = ({ popupCall, setPopupCall, titleMeeting, newCall, setNewCall, getCalls, tags, getTags, error, setError, funnels, newData, setNewData, loadingNewData, setLoadingNewData, clientData, getClientData, calls, storeData }) => {

  const [loadingNewCall, setLoadingNewCall] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [loadingTag, setLoadingTag] = useState(false)
  const [calendars, setCalendars] = useState<any>([])

  const { data: session } = useSession()

  const popupRef = useRef<HTMLFormElement | null>(null);

  const getCalendars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calendar`)
    setCalendars(res.data)
  }

  useEffect(() => {
    getCalendars()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupCall.view === 'flex') {
        setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupCall, setPopupCall]);

  return (
    <div className={`${popupCall.view} ${popupCall.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50 p-4`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loadingNewCall) {
            setLoadingNewCall(true)
            setError('')
            if (titleMeeting === 'Crear reunion') {
              if (newCall.nameMeeting !== '') {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/call`, newCall)
                getCalls()
                setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
                  setLoadingNewCall(false)
                }, 200)
              } else {
                setError('Debes llenar todos los datos')
                setLoadingNewCall(false)
              }
            } else {
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/call/${newCall._id}`, newCall)
              getCalls()
              setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupCall({ ...popupCall, view: 'hidden', opacity: 'opacity-0' })
                setLoadingNewCall(false)
              }, 200)
            }
          }
        }} onMouseEnter={() => setPopupCall({ ...popupCall, mouse: true })} onMouseLeave={() => setPopupCall({ ...popupCall, mouse: false })} onMouseMove={() => setPopupCall({ ...popupCall, mouse: true })} className={`${popupCall.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 rounded-xl m-auto border flex flex-col gap-4 border-white bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{ error }</p>
              : ''
          }
          <p className="text-lg font-medium">{titleMeeting}</p>
          <div className="flex flex-col gap-2">
            <p className='text-sm font-medium'>Tipo</p>
            <div className='flex gap-2'>
              <input type='checkbox' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const zoomCallType = 'Llamada por Zoom';
                const newTypes = newCall.type ? [...newCall.type] : [];
                if (e.target.checked && !newTypes.includes(zoomCallType)) {
                  newTypes.push(zoomCallType);
                } else {
                  // Si desmarcas el checkbox, se elimina el tipo
                  const index = newTypes.indexOf(zoomCallType);
                  if (index !== -1) {
                    newTypes.splice(index, 1);
                  }
                }
                setNewCall({ ...newCall, type: newTypes });
              }} checked={newCall.type?.length ? newCall.type.find(typ => typ === 'Llamada por Zoom') ? true : false : false} />
              <p className='text-sm'>Llamada por Zoom</p>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const zoomCallType = 'Visita a domicilio';
                const newTypes = newCall.type ? [...newCall.type] : [];
                if (e.target.checked && !newTypes.includes(zoomCallType)) {
                  newTypes.push(zoomCallType);
                } else {
                  // Si desmarcas el checkbox, se elimina el tipo
                  const index = newTypes.indexOf(zoomCallType);
                  if (index !== -1) {
                    newTypes.splice(index, 1);
                  }
                }
                setNewCall({ ...newCall, type: newTypes });
              }} checked={newCall.type?.length ? newCall.type.find(typ => typ === 'Visita a domicilio') ? true : false : false} />
              <p className='text-sm'>Visita a domicilio</p>
            </div>
            {
              storeData?.locations?.length
                ? (
                  <div className='flex gap-2'>
                    <input type='checkbox' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const zoomCallType = 'Visita al local';
                      const newTypes = newCall.type ? [...newCall.type] : [];
                      if (e.target.checked && !newTypes.includes(zoomCallType)) {
                        newTypes.push(zoomCallType);
                      } else {
                        // Si desmarcas el checkbox, se elimina el tipo
                        const index = newTypes.indexOf(zoomCallType);
                        if (index !== -1) {
                          newTypes.splice(index, 1);
                        }
                      }
                      setNewCall({ ...newCall, type: newTypes });
                    }} checked={newCall.type?.length ? newCall.type.find(typ => typ === 'Visita al local') ? true : false : false} />
                    <p className='text-sm'>Visita al local</p>
                  </div>
                )
                : ''
            }
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Nombre de la llamada</p>
            <Input change={(e: any) => setNewCall({ ...newCall, nameMeeting: e.target.value })} placeholder='Nombre de la llamada' value={newCall.nameMeeting} />
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Seleccionar calendario</p>
            <Select change={(e: any) => setNewCall({ ...newCall, calendar: e.target.value })} value={newCall.calendar}>
              <option>Seleccionar calendario</option>
              {
                calendars.map((calendar: any) => <option key={calendar._id} value={calendar._id}>{calendar.name}</option>)
              }
            </Select>
          </div>
          {
            newCall.type?.includes('Visita al local')
              ? (
                <div className="flex flex-col gap-2">
                  <p className='text-sm'>Seleccionar ubicación</p>
                  <Select change={(e: any) => setNewCall({ ...newCall, address: e.target.value.split(',')[0], details: e.target.value.split(',')[3], city: e.target.value.split(',')[1], region: e.target.value.split(',')[2] })} value={newCall.calendar}>
                    <option>Seleccionar ubicación</option>
                    {
                      storeData?.locations?.map(location => <option key={location.address} value={`${location.address},${location.city},${location.region},${location.details}`}>{location.address}{location.details && location.details !== '' ? `, ${location.details}` : ''}, {location.city}, {location.region}</option>)
                    }
                  </Select>
                </div>
              )
              : ''
          }
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Titulo</p>
            <Input change={(e: any) => setNewCall({ ...newCall, title: e.target.value })} placeholder='Titulo' value={newCall.title} />
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Duración</p>
            <Select change={(e: any) => setNewCall({ ...newCall, duration: e.target.value })} value={newCall.duration}>
              <option value='15 minutos'>15 minutos</option>
              <option value='20 minutos'>20 minutos</option>
              <option value='25 minutos'>25 minutos</option>
              <option value='30 minutos'>30 minutos</option>
              <option value='40 minutos'>40 minutos</option>
              {
                newCall.type?.includes('Visita')
                  ? (
                    <>
                      <option value='45 minutos'>45 minutos</option>
                      <option value='50 minutos'>50 minutos</option>
                      <option value='60 minutos'>60 minutos</option>
                      <option value='70 minutos'>70 minutos</option>
                      <option value='80 minutos'>80 minutos</option>
                      <option value='90 minutos'>90 minutos</option>
                      <option value='100 minutos'>100 minutos</option>
                      <option value='110 minutos'>110 minutos</option>
                      <option value='120 minutos'>120 minutos</option>
                    </>
                  )
                  : ''
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Tiempo reservado por hora</p>
            <Select change={(e: any) => setNewCall({ ...newCall, intervals: e.target.value })} value={newCall.intervals}>
              <option value=''>Igual que la duración de la hora</option>
              <option value='15 minutos'>15 minutos</option>
              <option value='20 minutos'>20 minutos</option>
              <option value='25 minutos'>25 minutos</option>
              <option value='30 minutos'>30 minutos</option>
              <option value='40 minutos'>40 minutos</option>
              <option value='45 minutos'>45 minutos</option>
              <option value='50 minutos'>50 minutos</option>
              <option value='60 minutos'>60 minutos</option>
              <option value='70 minutos'>70 minutos</option>
              <option value='80 minutos'>80 minutos</option>
              <option value='90 minutos'>90 minutos</option>
              <option value='100 minutos'>100 minutos</option>
              <option value='110 minutos'>110 minutos</option>
              <option value='120 minutos'>120 minutos</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Descripción</p>
            <Textarea change={(e: any) => setNewCall({ ...newCall, description: e.target.value })} placeholder='Descripción' value={newCall.description!} />
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Precio</p>
            <Input change={(e: any) => setNewCall({ ...newCall, price: e.target.value })} placeholder='Precio' value={newCall.price} />
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-medium text-[15px]'>Formulario</p>
            {
              newCall.labels?.length
                ? newCall.labels.map((label, i) => (
                  <>
                    <div className='flex gap-4 justify-between'>
                      <p className='text-sm font-medium'>Campo {i + 1}</p>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        const oldLabels = [...newCall.labels!]
                        oldLabels.splice(i, 1)
                        setNewCall({ ...newCall, labels: oldLabels })
                      }}><AiOutlineClose /></button>
                    </div>
                    <p className='text-sm'>Pregunta</p>
                    <Input change={(e: any) => {
                      const oldData = [...newCall.labels!]
                      oldData[i].text = e.target.value
                      setNewCall({ ...newCall, data: oldData })
                    }} value={label.text} placeholder='Pregunta' />
                    <p className='text-sm'>Dato</p>
                    <Select change={(e: any) => {
                      const oldData = [...newCall.labels!]
                      oldData[i].data = e.target.value
                      setNewCall({ ...newCall, data: oldData })
                    }} value={label.data}>
                      <option value=''>Seleccionar dato</option>
                      {
                        clientData?.length
                          ? clientData.map(data => (
                            <option key={data.data} value={data.data}>{data.name}</option>
                          ))
                          : ''
                      }
                    </Select>
                    <p className='text-sm'>Tipo de respuesta</p>
                    <Select change={(e: any) => {
                      const oldData = [...newCall.labels!]
                      oldData[i].type = e.target.value
                      if (e.target.value === 'Selector') {
                        oldData[i].datas = ['']
                      }
                      setNewCall({ ...newCall, data: oldData })
                    }} value={label.type}>
                      <option value=''>Seleccionar tipo de respuesta</option>
                      <option>Texto</option>
                      <option>Selector</option>
                    </Select>
                    {
                      label.type === 'Selector'
                        ? (
                          <>
                            <p className='text-sm'>Respuestas</p>
                            {
                              label.datas?.map((data, indexx) => (
                                <div key={indexx} className='flex gap-2'>
                                  <Input change={(e: any) => {
                                    const oldData = [...newCall.labels!]
                                    oldData[i].datas![indexx] = e.target.value
                                    setNewCall({ ...newCall, data: oldData })
                                  }} value={data} placeholder={`Repuesta ${indexx + 1}`} />
                                  <button onClick={(e: any) => {
                                    e.preventDefault()
                                    const oldData = [...newCall.labels!]
                                    oldData[i].datas?.splice(indexx, 1)
                                    setNewCall({ ...newCall, data: oldData })
                                  }}>
                                    <IoMdClose className='text-2xl' />
                                  </button>
                                </div>
                              ))
                            }
                            <Button2 action={(e: any) => {
                              e.preventDefault()
                              const oldData = [...newCall.labels!]
                              oldData[i].datas?.push('')
                              setNewCall({ ...newCall, data: oldData })
                            }}>Agregar respuesta</Button2>
                          </>
                        )
                        : ''
                    }
                  </>
                ))
                : ''
            }
            <Button2 action={(e: any) => {
              e.preventDefault()
              if (newCall.labels) {
                const oldData = [...newCall.labels]
                oldData.push({ type: '', text: '', data: '' })
                setNewCall({ ...newCall, labels: oldData })
              } else {
                setNewCall({ ...newCall, data: [{ data: '', text: '' }] })
              }
            }}>Agregar campo</Button2>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Crear dato personalizado</p>
            <div className='flex gap-2'>
              <Input change={(e: any) => setNewData(e.target.value)} value={newData} placeholder='Nuevo dato' />
              <ButtonSubmit2 color='main' action={async (e: any) => {
                e.preventDefault()
                if (!loadingNewData) {
                  setLoadingNewData(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-data`, { data: newData })
                  setNewData('')
                  getClientData()
                  setLoadingNewData(false)
                }
              }} submitLoading={loadingNewData} textButton='Crear dato' config='w-36' />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Texto boton</p>
            <Input change={(e: any) => setNewCall({ ...newCall, buttonText: e.target.value })} value={newCall.buttonText} placeholder='Texto boton' />
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Tags</p>
            {
              tags.length
                ? (
                  <div className="flex gap-2 flex-wrap">
                    {
                      tags.map(tag => (
                        <div key={tag._id} className="flex gap-1">
                          <input onChange={(e: any) => {
                            if (e.target.checked) {
                              const oldTags = [...newCall.tags ? newCall.tags : []]
                              oldTags.push(tag.tag)
                              setNewCall({ ...newCall, tags: oldTags })
                            } else {
                              const oldTags = newCall.tags!.filter(tg => tg !== tag.tag)
                              setNewCall({ ...newCall, tags: oldTags })
                            }
                          }} type="checkbox" checked={newCall.tags?.includes(tag.tag)} />
                          <p>{tag.tag}</p>
                        </div>
                      ))
                    }
                  </div>
                )
                : <p className='text-sm'>No tienes tags creados</p>
            }
            <p className='text-sm'>Nuevo tag</p>
            <div className='flex gap-2'>
              <Input placeholder='Nuevo tag' change={(e: any) => setNewTag(e.target.value)} value={newTag} />
              <ButtonSubmit2 submitLoading={loadingTag} textButton='Crear tag' action={async (e: any) => {
                e.preventDefault()
                if (!loadingTag) {
                  setLoadingTag(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newTag })
                  getTags()
                  setNewTag('')
                  setLoadingTag(false)
                }
              }} color='main' config='w-32' />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-sm'>Acción al agendar llamada</p>
            <Select change={(e: any) => setNewCall({ ...newCall, action: e.target.value })} value={newCall.action}>
              <option>Mostrar mensaje</option>
              <option>Ir a una pagina</option>
            </Select>
          </div>
          {
            newCall.action === 'Mostrar mensaje'
              ? (
                <div className="flex flex-col gap-2">
                  <p className='text-sm'>Mensaje despues de agendar</p>
                  <Textarea placeholder="Mensaje" change={(e: any) => setNewCall({ ...newCall, message: e.target.value })} value={newCall.message!} />
                </div>
              )
              : ''
          }
          {
            newCall.action === 'Ir a una pagina'
              ? (
                <div className="flex flex-col gap-2">
                  <p className='text-sm'>Mensaje despues de agendar</p>
                  <Select change={(e: any) => setNewCall({ ...newCall, redirect: e.target.value })}>
                    <option value=''>Seleccionar pagina</option>
                    {
                      funnels.map(funnel => (
                        <>
                          {
                            funnel.steps.map(step => (
                              <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>
                            ))
                          }
                        </>
                      ))
                    }
                  </Select>
                </div>
              )
              : ''
          }
          <Button type='submit' loading={loadingNewCall} config='w-full'>{titleMeeting === 'Crear reunion' ? 'Crear reunion' : 'Editar reunion'}</Button>
        </form>
      </div>
  )
}
