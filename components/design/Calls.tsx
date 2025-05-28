"use client"
import { ICall, ICategoryPage, IDesign, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Button, Input, Select, Spinner } from '../ui'
import { NumberFormat } from '@/utils'
import { LiaTrashAlt } from 'react-icons/lia'
import axios from 'axios'
import { ButtonDesign } from './ButtonDesign'

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
    style?: any
}

export const Calls: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className="w-full flex py-24 px-2" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className={`w-full flex flex-col gap-4 max-w-[1280px] m-auto`}>
        {
          edit === 'Llamadas'
            ? (
                (
                    <>
                      <div className='flex flex-col gap-2 w-fit m-auto bg-white p-6 shadow-md rounded-xl bodder border-black/5'>
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
                                      oldServices[indx].steps[ind].design![index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.background = `${e.target.value === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${e.target.value === 'circle' ? e.target.value : `${e.target.value}deg`}, ${firstColor}, ${lastColor})` 
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
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
                                        oldPages[inx].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                        setPages(oldPages)
                                      } else if (inxx !== undefined) {
                                        const oldPages = [...pages]
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
                                      oldPages[inx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${e.target.value}, ${lastColor})` 
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
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
                                      oldPages[inx].design[index].info.background = `${gradient === 'circle' ? 'radial-gradient' : 'linear-gradient'}(${gradient}deg, ${firstColor}, ${e.target.value})` 
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
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
                      </div>
                      <div className='flex flex-col gap-2 p-6 bg-white rounded-xl shadow-md border border-black/5 w-fit'>
                        <p>Elije las llamadas que quieres mostrar</p>
                        {
                          calls?.length
                            ? (
                              <Select change={(e: any) => {
                                  if (inde !== undefined) {
                                    const oldFunnels = [...funnels!]
                                    if (!oldFunnels[inde].steps[ind].design![index].meetings?.includes(e.target.value)) {
                                      oldFunnels[inde].steps[ind].design![index].meetings?.push(e.target.value)
                                      setFunnels(oldFunnels)
                                    }
                                  } else if (indx !== undefined) {
                                    const oldServices = [...services!]
                                    if (!oldServices[indx].steps[ind].design![index].meetings?.includes(e.target.value)) {
                                      oldServices[indx].steps[ind].design![index].meetings?.push(e.target.value)
                                      setServices(oldServices)
                                    }
                                  } else if (inx !== undefined) {
                                    const oldPages = [...pages]
                                    if (!oldPages[inx].design![index].meetings?.includes(e.target.value)) {
                                      oldPages[inx].design![index].meetings?.push(e.target.value)
                                      setServices(oldPages)
                                    }
                                  } else if (inxx !== undefined) {
                                    const oldPages = [...pages]
                                    if (!oldPages[inxx].design![index].meetings?.includes(e.target.value)) {
                                      oldPages[inxx].design![index].meetings?.push(e.target.value)
                                      setServices(oldPages)
                                    }
                                  } else {
                                    const oldPages = [...pages]
                                    if (!oldPages[ind].design[index].meetings?.includes(e.target.value)) {
                                      oldPages[ind].design[index].meetings?.push(e.target.value)
                                      setPages(oldPages)
                                    }
                                  }
                                }} config='w-fit bg-transparent dark:border-neutral-100'>
                                <option>Seleccionar llamada</option>
                                {
                                  calls.map(call => (
                                    <option key={call._id} value={call._id}>{call.nameMeeting}</option>
                                  ))
                                }
                              </Select>
                            )
                            : <p>No tienes llamadas creadas</p>
                        }
                      </div>
                      {
                        design.meetings?.map((meeting) => {
                          const call = calls?.find(call => call._id === meeting)
                          if (call) {
                            return (
                              <div key={meeting} className={` p-6`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor }}>
                                <div className='flex gap-6 justify-between'>
                                  <div className='flex flex-col gap-4'>
                                    <p className='text-lg font-medium'>{call.nameMeeting}</p>
                                    {
                                      call.price
                                        ? <p className='text-xl font-medium'>${NumberFormat(Number(call.price))}</p>
                                        : ''
                                    }
                                    <div className="flex gap-2">
                                      <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                      <p className="text-gray-500">{call.duration}</p>
                                    </div>
                                    <p>{call.description}</p>
                                  </div>
                                  <div className='my-auto flex gap-4'>
                                    <ButtonDesign style={style} text='Agendar llamada' />
                                    <button onClick={(e: any) => {
                                      e.preventDefault()
                                      const oldMeetings = [...design.meetings!]
                                      const newMeetings = oldMeetings.filter((meet) => meet !== meeting)
                                      if (inde !== undefined) {
                                        const oldFunnels = [...funnels!]
                                        oldFunnels[inde].steps[ind].design![index].meetings = newMeetings
                                        setFunnels(oldFunnels)
                                      } else if (indx !== undefined) {
                                        const oldServices = [...services!]
                                        oldServices[indx].steps[ind].design![index].meetings = newMeetings
                                        setServices(oldServices)
                                      } else if (inx !== undefined) {
                                        const oldPages = [...pages]
                                        oldPages[inx].design[index].meetings = newMeetings
                                        setPages(oldPages)
                                      } else if (inxx !== undefined) {
                                        const oldPages = [...pages]
                                        oldPages[inxx].design[index].meetings = newMeetings
                                        setPages(oldPages)
                                      } else {
                                        const oldPages = [...pages]
                                        oldPages[ind].design[index].meetings = newMeetings
                                        setPages(oldPages)
                                      }
                                    }}><LiaTrashAlt className='text-2xl my-auto' /></button>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        })
                      }
                    </>
                  )
            )
            : design.meetings?.length
              ? design.meetings?.map(meeting => {
                const call = calls?.find(call => call._id === meeting)
                if (call) {
                  return (
                    <div key={meeting} className={` p-6`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor }}>
                      <div className='flex gap-6 justify-between'>
                        <div className='flex flex-col gap-4'>
                          <p className='text-lg font-medium'>{call.nameMeeting}</p>
                          {
                            call.price
                              ? <p className='text-xl font-medium'>${NumberFormat(Number(call.price))}</p>
                              : ''
                          }
                          <div className="flex gap-2">
                            <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="text-gray-500">{call.duration}</p>
                          </div>
                          <p>{call.description}</p>
                        </div>
                        <div className='my-auto'>
                          <ButtonDesign style={style} text='Agendar llamada' />
                        </div>
                      </div>
                    </div>
                  )
                }
              })
              : <p>Elije las llamadas que quieres mostrar</p>
        }
      </div>
    </div>
  )
}
