"use client"
import { ICall, ICategoryPage, IClientData, IDesign, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Button, Button2, Button2Secondary, ButtonSubmit2, Input, Select, Spinner } from '../ui'
import axios from 'axios'
import { NumberFormat } from '@/utils'
import { ButtonDesign } from './ButtonDesign'
import { IoMdClose } from 'react-icons/io'

interface Props {
    edit: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    design: IDesign
    index: number
    ind: number
    inde?: number
    indx?: number
    inx?: any
    inxx?: any
    funnels?: IFunnel[]
    setFunnels?: any
    calls?: ICall[]
    services?: IService[]
    setServices?: any
    responsive: string
    pageNeed: IPage[]
    style?: any
    clientData?: IClientData[]
    getClientData?: any
    setNewCall: any
    setTitleMeeting: any
    popupCall: any
    setPopupCall: any
}

export const Plans: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, responsive, pageNeed, style, clientData, getClientData, setNewCall, setTitleMeeting, popupCall, setPopupCall }) => {
  
  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  
  return (
    <div className="w-full flex py-24 px-4" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className={`w-full flex flex-col gap-4 max-w-[1280px] m-auto`}>
        {
          edit === 'Planes'
            ? (
              <>
                <div className='flex flex-col gap-2 w-fit m-auto p-6 bg-white rounded-xl border border-black/5 shadow-md'>
                  <div className='flex flex-col gap-2'>
                    <p className='m-auto font-medium'>Tipo fondo</p>
                    <Select change={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.typeBackground = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.typeBackground = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.typeBackground = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.typeBackground = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.typeBackground = e.target.value
                        setPages(oldPages)
                      }
                    }} value={design.info.typeBackground} config='w-fit m-auto bg-transparent dark:border-neutral-100'>
                      <option>Sin fondo</option>
                      <option>Imagen</option>
                      <option>Color</option>
                      <option>Degradado</option>
                    </Select>
                  </div>
                  {
                    design.info.typeBackground === 'Imagen'
                      ? (
                        <>
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : ''
                          }
                          {
                            errorImage !== ''
                              ? <p className='bg-red-500 text-white px-2 py-1'>{errorImage}</p>
                              : ''
                          }
                          <input type='file' onChange={async (e: any) => {
                            if (!loadingImage) {
                              setLoadingImage(true)
                              setErrorImage('')
                              const formData = new FormData();
                              formData.append('image', e.target.files[0]);
                              formData.append('name', e.target.files[0].name);
                              try {
                                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                  headers: {
                                    accept: 'application/json',
                                    'Accept-Language': 'en-US,en;q=0.8'
                                  }
                                })
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  oldFunnels[inde].steps[ind].design![index].info.background = data
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  oldServices[indx].steps[ind].design![index].info.background = data
                                  setServices(oldServices)
                                } else if (inx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inx].design[index].info.background = data
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inxx].design[index].info.background = data
                                  setPages(oldPages)
                                } else {
                                  const oldPages = [...pages]
                                  oldPages[ind].design[index].info.background = data
                                  setPages(oldPages)
                                }
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={design.info.background} className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                        </>
                      )
                      : ''
                  }
                  {
                    design.info.typeBackground === 'Color'
                      ? <input type='color' onChange={(e: any) => {
                          if (inde !== undefined) {
                            const oldFunnels = [...funnels!]
                            oldFunnels[inde].steps[ind].design![index].info.background = e.target.value
                            setFunnels(oldFunnels)
                          } else if (indx !== undefined) {
                            const oldServices = [...services!]
                            oldServices[indx].steps[ind].design![index].info.background = e.target.value
                            setServices(oldServices)
                          } else if (inx !== undefined) {
                            const oldPages = [...pages]
                            oldPages[inx].design[index].info.background = e.target.value
                            setPages(oldPages)
                          } else if (inxx !== undefined) {
                            const oldPages = [...pages]
                            oldPages[inxx].design[index].info.background = e.target.value
                            setPages(oldPages)
                          } else {
                            const oldPages = [...pages]
                            oldPages[ind].design[index].info.background = e.target.value
                            setPages(oldPages)
                          }
                        }} className='m-auto' value={design.info.background} />
                      : ''
                  }
                  {
                    design.info.typeBackground === 'Degradado'
                      ? (
                        <div className='flex gap-4 m-auto'>
                          <div className='flex flex-col gap-2'>
                            <p>Tipo de degradado</p>
                            <Select change={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setGradient(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                setGradient(e.target.value)
                                oldServices[indx].steps[ind].design![index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setServices(oldServices)
                              } else if (inx !== undefined) {
                                const oldPages = [...pages]
                                setGradient(e.target.value)
                                oldPages[inx].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setPages(oldPages)
                              } else if (inxx !== undefined) {
                                const oldPages = [...pages]
                                setGradient(e.target.value)
                                oldPages[inxx].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setPages(oldPages)
                              } else {
                                const oldPages = [...pages]
                                setGradient(e.target.value)
                                oldPages[ind].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                setPages(oldPages)
                              }
                            }} config='bg-transparent dark:border-neutral-100'>
                              <option>Seleccionar tipo</option>
                              <option value='135'>Lineal</option>
                              <option value='circle'>Radial</option>
                            </Select>
                          </div>
                          {
                            design.info.background?.includes('linear-gradient')
                              ? <Input placeholder='Grados' change={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  setGradient(e.target.value)
                                  oldFunnels[inde].steps[ind].design![index].info.background =  `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  setGradient(e.target.value)
                                  oldServices[indx].steps[ind].design![index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setServices(oldServices)
                                } else if (inx !== undefined) {
                                  const oldPages = [...pages]
                                  setGradient(e.target.value)
                                  oldPages[inx].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  setGradient(e.target.value)
                                  oldPages[inxx].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setPages(oldPages)
                                } else {
                                  const oldPages = [...pages]
                                  setGradient(e.target.value)
                                  oldPages[ind].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setPages(oldPages)
                                }
                              }} value={gradient} config='w-fit' />
                              : ''
                          }
                          <div className='flex flex-col gap-2'>
                            <p>Primer color</p>
                            <input type='color' onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setFirstColor(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                setFirstColor(e.target.value)
                                oldServices[indx].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setServices(oldServices)
                              } else if (inx !== undefined) {
                                const oldPages = [...pages]
                                setFirstColor(e.target.value)
                                oldPages[inx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setPages(oldPages)
                              } else if (inxx !== undefined) {
                                const oldPages = [...pages]
                                setFirstColor(e.target.value)
                                oldPages[inxx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setPages(oldPages)
                              } else {
                                const oldPages = [...pages]
                                setFirstColor(e.target.value)
                                oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                setPages(oldPages)
                              }
                            }} className='m-auto' value={firstColor} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p>Segundo color</p>
                            <input type='color' onChange={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                setLastColor(e.target.value)
                                oldFunnels[inde].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                setLastColor(e.target.value)
                                oldServices[indx].steps[ind].design![index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setServices(oldServices)
                              } else if (inx !== undefined) {
                                const oldPages = [...pages]
                                setLastColor(e.target.value)
                                oldPages[inx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setPages(oldPages)
                              } else if (inxx !== undefined) {
                                const oldPages = [...pages]
                                setLastColor(e.target.value)
                                oldPages[inxx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setPages(oldPages)
                              } else {
                                const oldPages = [...pages]
                                setLastColor(e.target.value)
                                oldPages[ind].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                setPages(oldPages)
                              }
                            }} className='m-auto' value={lastColor} />
                          </div>
                        </div>
                      )
                      : ''
                  }
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Color texto</p>
                    <input type='color' onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.textColor = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.textColor = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.textColor = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.textColor = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.textColor = e.target.value
                        setPages(oldPages)
                      }
                    }} value={design.info.textColor} className='m-auto' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Color planes</p>
                    <input type='color' onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.image = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.image = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.image = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.image = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.image = e.target.value
                        setPages(oldPages)
                      }
                    }} value={design.info.image} className='m-auto' />
                  </div>
                </div>
                <textarea placeholder='Titulo' value={design.info.title} onChange={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].info.title = e.target.value
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.title = e.target.value
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.title = e.target.value
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.title = e.target.value
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.title = e.target.value
                    setPages(oldPages)
                  }
                }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} font-semibold m-auto text-center p-1.5 rounded border bg-transparent w-full`} style={{ color: design.info.textColor }} />
                <textarea placeholder='Descripción' value={design.info.description} onChange={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].info.description = e.target.value
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.description = e.target.value
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.description = e.target.value
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.description = e.target.value
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.description = e.target.value
                    setPages(oldPages)
                  }
                }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-center p-1.5 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
                <Select change={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].service = { service: e.target.value }
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].service = { service: e.target.value }
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  }
                }} config='w-fit m-auto bg-transparent dark:border-neutral-100' value={design.service?.service}>
                  <option value=''>Seleccionar servicio</option>
                  {
                    services?.map(service => <option key={service._id} value={service._id}>{service.name}</option>)
                  }
                </Select>
                <Select change={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].info.video = e.target.value
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.video = e.target.value
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.video = e.target.value
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.video = e.target.value
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.video = e.target.value
                    setPages(oldPages)
                  }
                }} config='w-fit m-auto bg-transparent dark:border-neutral-100' value={design.info.video}>
                  <option value=''>Seleccionar Siguiente paso</option>
                  <option>Realizar pago</option>
                  <option>Completar formulario</option>
                  <option>Agendar llamada</option>
                </Select>
                {
                  design.info.video === 'Agendar llamada'
                    ? (
                      <>
                        {
                          calls?.length
                            ? (
                              <>
                                <p className='m-auto'>Seleccionar llamada</p>
                                <Select value={design.meeting} change={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    oldFunnels[inde].steps[ind].design![index].meeting = e.target.value
                                    setFunnels(oldFunnels)
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    oldServices[indx].steps[ind].design![index].meeting = e.target.value
                                    setServices(oldServices)
                                  } else if (inx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inx].design[index].meeting = e.target.value
                                    setPages(oldPages)
                                  } else if (inxx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inxx].design[index].meeting = e.target.value
                                    setPages(oldPages)
                                  } else {
                                    const oldPages = [...pages]
                                    oldPages[ind].design[index].meeting = e.target.value
                                    setPages(oldPages)
                                  }
                                }} config='w-fit m-auto bg-transparent dark:border-neutral-100'>
                                  <option value=''>Seleccionar llamada</option>
                                  {
                                    calls.map(call => (
                                      <option key={call._id} value={call._id}>{call.nameMeeting}</option>
                                    ))
                                  }
                                </Select>
                              </>
                            )
                            : (
                              <p>No tienes llamadas creadas</p>
                            )
                        }
                        <div className='flex gap-2 m-auto'>
                          <Button2 action={(e: any) => {
                            e.preventDefault()
                            setLoading(true)
                            setError('')
                            setNewCall({ nameMeeting: '', duration: '15 minutos', description: '', title: '', labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '' })
                            setTitleMeeting('Crear llamada')
                            setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                            setTimeout(() => {
                              setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                            }, 10)
                          }}>Crear llamada</Button2>
                          {
                            design.meeting && design.meeting !== ''
                              ? <Button2Secondary action={(e: any) => {
                                e.preventDefault()
                                setError('')
                                const call = calls?.find(call => call._id === design.meeting)
                                setNewCall(call!)
                                setTitleMeeting('Editar llamada')
                                setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }} color='main'>Editar llamada</Button2Secondary>
                              : ''
                          }
                        </div>
                      </>
                    )
                    : (
                      <>
                        <p className='m-auto'>Agregar preguntas adicionales al formulario</p>
                          {
                            design.info.form?.map((label, i) => (
                              <>
                                <div className='flex gap-2 justify-between'>
                                  <p>Dato {i + 1}</p>
                                  <button onClick={(e: any) => {
                                    e.preventDefault()
                                    const oldForm = [...design.info.form!]
                                    oldForm.splice(i, 1)
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.form = oldForm
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.form = oldForm
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.form = oldForm
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.form = oldForm
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.form = oldForm
                                      setPages(oldPages)
                                    }
                                  }}><IoMdClose className='text-xl' /></button>
                                </div>
                                <Input change={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    oldFunnels[inde].steps[ind].design![index].info.form![i].text = e.target.value
                                    setFunnels(oldFunnels)
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    oldServices[indx].steps[ind].design![index].info.form![i].text = e.target.value
                                    setServices(oldServices)
                                  } else if (inx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inx].design[index].info.form![i].text = e.target.value
                                    setPages(oldPages)
                                  } else if (inxx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inxx].design[index].info.form![i].text = e.target.value
                                    setPages(oldPages)
                                  } else {
                                    const oldPages = [...pages]
                                    oldPages[ind].design[index].info.form![i].text = e.target.value
                                    setPages(oldPages)
                                  }
                                }} value={label.text} placeholder='Texto campo' config='bg-transparent dark:border-neutral-100' />
                                <Select value={label.data} change={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    oldFunnels[inde].steps[ind].design![index].info.form![i].data = e.target.value
                                    oldFunnels[inde].steps[ind].design![index].info.form![i].name = clientData!.find(dat => dat.data === e.target.value)!.name
                                    setFunnels(oldFunnels)
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    oldServices[indx].steps[ind].design![index].info.form![i].data = e.target.value
                                    oldServices[indx].steps[ind].design![index].info.form![i].name = clientData!.find(dat => dat.data === e.target.value)!.name
                                    setServices(oldServices)
                                  } else if (inx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inx].design[index].info.form![i].data = e.target.value
                                    oldPages[inx].design[index].info.form![i].name = clientData!.find(dat => dat.data === e.target.value)!.name
                                    setPages(oldPages)
                                  } else if (inxx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inxx].design[index].info.form![i].data = e.target.value
                                    oldPages[inxx].design[index].info.form![i].name = clientData!.find(dat => dat.data === e.target.value)!.name
                                    setPages(oldPages)
                                  } else {
                                    const oldPages = [...pages]
                                    oldPages[ind].design[index].info.form![i].data = e.target.value
                                    oldPages[ind].design[index].info.form![i].name = clientData!.find(dat => dat.data === e.target.value)!.name
                                    setPages(oldPages)
                                  }
                                }} config='bg-transparent dark:border-neutral-100'>
                                  <option value=''>Seleccionar dato</option>
                                  {
                                    clientData?.length
                                      ? clientData.filter(data => data.data !== 'email' && data.data !== 'firstName' && data.data !== 'lastName' && data.data !== 'phone').map(data => (
                                        <option key={data.data} value={data.data}>{data.name}</option>
                                      ))
                                      : ''
                                  }
                                </Select>
                                <Select value={label.type} change={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    oldFunnels[inde].steps[ind].design![index].info.form![i].type = e.target.value
                                    oldFunnels[inde].steps[ind].design![index].info.form![i].datas = ['']
                                    setFunnels(oldFunnels)
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    oldServices[indx].steps[ind].design![index].info.form![i].type = e.target.value
                                    oldServices[indx].steps[ind].design![index].info.form![i].datas = ['']
                                    setServices(oldServices)
                                  } else if (inx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inx].design[index].info.form![i].type = e.target.value
                                    oldPages[inx].design[index].info.form![i].datas = ['']
                                    setPages(oldPages)
                                  } else if (inxx !== undefined) {
                                    const oldPages = [...pages]
                                    oldPages[inxx].design[index].info.form![i].type = e.target.value
                                    oldPages[inxx].design[index].info.form![i].datas = ['']
                                    setPages(oldPages)
                                  } else {
                                    const oldPages = [...pages]
                                    oldPages[ind].design[index].info.form![i].type = e.target.value
                                    oldPages[ind].design[index].info.form![i].datas = ['']
                                    setPages(oldPages)
                                  }
                                }} config='bg-transparent dark:border-neutral-100'>
                                  <option value=''>Seleccionar tipo de respuesta</option>
                                  <option>Texto</option>
                                  <option>Selector</option>
                                </Select>
                                {
                                  label.type === 'Selector'
                                    ? (
                                      <>
                                        {
                                          label.datas?.map((data, indexx) => (
                                            <div key={indexx} className='flex gap-2'>
                                              <Input
                                                change={(e: any) => {
                                                  if (inde !== undefined) {
                                                    const oldFunnels = [...funnels!]
                                                    oldFunnels[inde].steps[ind].design![index].info.form![i].datas![indexx] = e.target.value
                                                    setFunnels(oldFunnels)
                                                  } else if (indx !== undefined) {
                                                    const oldServices = [...services!]
                                                    oldServices[indx].steps[ind].design![index].info.form![i].datas![indexx] = e.target.value
                                                    setServices(oldServices)
                                                  } else if (inx !== undefined) {
                                                    const oldPages = [...pages]
                                                    oldPages[inx].design[index].info.form![i].datas![indexx] = e.target.value
                                                    setPages(oldPages)
                                                  } else if (inxx !== undefined) {
                                                    const oldPages = [...pages]
                                                    oldPages[inxx].design[index].info.form![i].datas![indexx] = e.target.value
                                                    setPages(oldPages)
                                                  } else {
                                                    const oldPages = [...pages]
                                                    oldPages[ind].design[index].info.form![i].datas![indexx] = e.target.value
                                                    setPages(oldPages)
                                                  }
                                                }}
                                                value={data} // Aquí se pasa el valor actual del input
                                                placeholder={`Respuesta ${indexx + 1}`}
                                              />
                                              <button onClick={(e: any) => {
                                                e.preventDefault()
                                                if (inde !== undefined) {
                                                  const oldFunnels = [...funnels!]
                                                  oldFunnels[inde].steps[ind].design![index].info.form![i].datas?.splice(indexx, 1)
                                                  setFunnels(oldFunnels)
                                                } else if (indx !== undefined) {
                                                  const oldServices = [...services!]
                                                  oldServices[indx].steps[ind].design![index].info.form![i].datas?.splice(indexx, 1)
                                                  setServices(oldServices)
                                                } else if (inx !== undefined) {
                                                  const oldPages = [...pages]
                                                  oldPages[inx].design[index].info.form![i].datas?.splice(indexx, 1)
                                                  setPages(oldPages)
                                                } else if (inxx !== undefined) {
                                                  const oldPages = [...pages]
                                                  oldPages[inxx].design[index].info.form![i].datas?.splice(indexx, 1)
                                                  setPages(oldPages)
                                                } else {
                                                  const oldPages = [...pages]
                                                  oldPages[ind].design[index].info.form![i].datas?.splice(indexx, 1)
                                                  setPages(oldPages)
                                                }
                                              }}><IoMdClose className='text-2xl' /></button>
                                            </div>
                                          ))
                                        }
                                        <Button2 action={(e: any) => {
                                          e.preventDefault()
                                          if (inde !== undefined) {
                                            const oldFunnels = [...funnels!]
                                            oldFunnels[inde].steps[ind].design![index].info.form![i].datas?.push('')
                                            setFunnels(oldFunnels)
                                          } else if (indx !== undefined) {
                                            const oldServices = [...services!]
                                            oldServices[indx].steps[ind].design![index].info.form![i].datas?.push('')
                                            setServices(oldServices)
                                          } else if (inx !== undefined) {
                                            const oldPages = [...pages]
                                            oldPages[inx].design[index].info.form![i].datas?.push('')
                                            setPages(oldPages)
                                          } else if (inxx !== undefined) {
                                            const oldPages = [...pages]
                                            oldPages[inxx].design[index].info.form![i].datas?.push('')
                                            setPages(oldPages)
                                          } else {
                                            const oldPages = [...pages]
                                            oldPages[ind].design[index].info.form![i].datas?.push('')
                                            setPages(oldPages)
                                          }
                                        }}>Agregar</Button2>
                                        <div className='flex flex-col gap-2'>
                                          <p>Crear dato personalizado</p>
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
                                      </>
                                    )
                                    : ''
                                }
                              </>
                            ))
                          }
                          <Button2 action={(e: any) => {
                            e.preventDefault()
                            if (inde !== undefined) {
                              const oldFunnels = [...funnels!]
                              if (oldFunnels[inde].steps[ind].design![index].info.form?.length) {
                                oldFunnels[inde].steps[ind].design![index].info.form?.push({ data: '', name: '', text: '', type: 'text' })
                              } else {
                                oldFunnels[inde].steps[ind].design![index].info.form = [{ data: '', name: '', text: '', type: 'text' }]
                              }
                              setFunnels(oldFunnels)
                            } else if (indx !== undefined) {
                              const oldServices = [...services!]
                              if (oldServices[indx].steps[ind].design![index].info.form?.length) {
                                oldServices[indx].steps[ind].design![index].info.form?.push({ data: '', name: '', text: '', type: 'text' })
                              } else {
                                oldServices[indx].steps[ind].design![index].info.form = [{ data: '', name: '', text: '', type: 'text' }]
                              }
                              setServices(oldServices)
                            } else if (inx !== undefined) {
                              const oldPages = [...pages]
                              if (oldPages[inx].design[index].info.form?.length) {
                                oldPages[inx].design[index].info.form?.push({ data: '', name: '', text: '', type: 'text' })
                              } else {
                                oldPages[inx].design[index].info.form = [{ data: '', name: '', text: '', type: 'text' }]
                              }
                              setPages(oldPages)
                            } else if (inxx !== undefined) {
                              const oldPages = [...pages]
                              if (oldPages[inxx].design[index].info.form?.length) {
                                oldPages[inxx].design[index].info.form?.push({ data: '', name: '', text: '', type: 'text' })
                              } else {
                                oldPages[inxx].design[index].info.form = [{ data: '', name: '', text: '', type: 'text' }]
                              }
                              setPages(oldPages)
                            } else {
                              const oldPages = [...pages]
                              if (oldPages[ind].design[index].info.form?.length) {
                                oldPages[ind].design[index].info.form?.push({ data: '', name: '', text: '', type: 'text' })
                              } else {
                                oldPages[ind].design[index].info.form = [{ data: '', name: '', text: '', type: 'text' }]
                              }
                              setPages(oldPages)
                            }
                          }} config='m-auto'>Agregar pregunta</Button2>
                      </>
                    )
                }
                {
                  services?.find(service => service._id === design.service?.service)?.plans?.plans.length
                    ? (
                      <div className='flex gap-6 justify-around'>
                        {
                          services?.find(service => service._id === design.service?.service)?.plans?.plans.map(plan => (
                            <div className={`p-6 w-full max-w-96 flex flex-col gap-4`} key={plan._id} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                              <p className='text-center font-medium text-xl'>{plan.name}</p>
                              <div className='flex gap-2 w-fit m-auto'>
                                <p className='text-center font-bold text-3xl'>${NumberFormat(Number(plan.price))}</p>
                                {
                                  services?.find(service => service._id === design.service?.service)?.typePrice === 'Suscripción'
                                    ? <p className='my-auto'>/ mes</p>
                                    : ''
                                }
                              </div>
                              {
                                services?.find(service => service._id === design.service?.service)?.plans?.plans[0].characteristics?.length
                                  ? (
                                    <>
                                      <p className='font-medium text-lg'>Funcionalidades:</p>
                                      <div className='flex flex-col gap-2'>
                                        {
                                          plan.characteristics?.map(characteristic => characteristic ? <p key={characteristic}>{characteristic}</p> : '')
                                        }
                                      </div>
                                    </>
                                  )
                                  : ''
                              }
                              <ButtonDesign style={style} text='Me interesa este plan' config='w-full' />
                            </div>
                          ))
                        }
                      </div>
                    )
                    : ''
                }
              </>
            )
            : (
              <>
                {
                  index === 0
                  ? (
                    <h1
                      className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} transition-opacity duration-200 font-semibold text-center`}
                      style={{ color: design.info.textColor }}
                      dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                    />
                  )
                  : (
                    <h2
                      className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} transition-opacity duration-200 font-semibold text-center`}
                      style={{ color: design.info.textColor }}
                      dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                    />
                  )
                }
                <p
                  className={`${responsive === '400px' ? 'text-base' : 'text-lg'} transition-opacity duration-200 text-center`}
                  style={{ color: design.info.textColor }}
                  dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
                />
                {
                  services?.find(service => service._id === design.service?.service)?.plans?.plans.length
                    ? (
                      <div className={`flex gap-6 justify-around ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                        {
                          services?.find(service => service._id === design.service?.service)?.plans?.plans.map(plan => (
                            <div className={`p-6 w-full max-w-96 flex flex-col gap-4 justify-between`} key={plan._id} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                              <div className='flex flex-col gap-4 h-fit'>
                                <p className='text-center font-medium text-xl'>{plan.name}</p>
                                <div className='flex gap-2 w-fit m-auto'>
                                  <p className='text-center font-bold text-3xl'>${NumberFormat(Number(plan.price))}</p>
                                  {
                                    services?.find(service => service._id === design.service?.service)?.typePrice === 'Suscripción'
                                      ? <p className='my-auto'>/ mes</p>
                                      : ''
                                  }
                                </div>
                                {
                                  services?.find(service => service._id === design.service?.service)?.plans?.plans[0].characteristics?.length
                                    ? (
                                      <>
                                        <p className='font-medium text-lg'>Funcionalidades:</p>
                                        <div className='flex flex-col gap-2'>
                                          {
                                            plan.characteristics?.map(characteristic => characteristic ? <p key={characteristic}>{characteristic}</p> : '')
                                          }
                                        </div>
                                      </>
                                    )
                                    : ''
                                }
                              </div>
                              <ButtonDesign style={style} text='Me interesa este plan' config='w-full' />
                            </div>
                          ))
                        }
                      </div>
                    )
                    : ''
                }
              </>
            )
          }
      </div>
    </div>
  )
}
