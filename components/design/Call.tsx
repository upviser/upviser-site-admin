"use client"
import { ICall, ICategoryPage, IDesign, IFunnel, IPage, IService, IStoreData } from '@/interfaces'
import React, { useState } from 'react'
import { Button2, Button2Secondary, Input, Select, Spinner } from '../ui'
import axios from 'axios'
import Image from 'next/image'

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
    calls: ICall[]
    setNewCall: any
    setTitleMeeting: any
    setPopupCall: any
    popupCall: any
    responsive: string
    error: string
    setError: any
    services?: IService[]
    setServices?: any
    storeData?: IStoreData
    style?: any
}

export const Call: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, setNewCall, setTitleMeeting, setPopupCall, popupCall, responsive, error, setError, services, setServices, storeData, style }) => {
  
  const [loading, setLoading] = useState(false)
  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <>
      {
        edit === 'Agendar llamada'
        ? (
          <div className="flex flex-col gap-16 py-8 md:py-14" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
            <div className='flex flex-col gap-2 w-fit m-auto bg-white p-6 rounded-xl shadow-md border border-black/5'>
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
                        }} config=' bg-transparent dark:border-neutral-100'>
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
                <p className='font-medium m-auto'>Color reunion</p>
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
              <div className='flex flex-col gap-2'>
                <p className='font-medium m-auto'>Cual logo utilizar</p>
                <Select change={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].info.titleForm = e.target.value
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.titleForm = e.target.value
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.titleForm = e.target.value
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.titleForm = e.target.value
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.titleForm = e.target.value
                    setPages(oldPages)
                  }
                }} config='w-fit m-auto bg-transparent dark:border-neutral-100' value={design.info.titleForm}>
                  <option>Seleccionar color logo</option>
                  <option>Logo principal</option>
                  <option>Logo blanco</option>
                  <option>Sin logo</option>
                </Select>
              </div>
            </div>
            {
              design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                ? <button className='w-fit m-auto'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                  ? <button className='w-fit m-auto'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                  : ''
            }
            <div className='flex flex-col gap-4'>
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
            }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} font-semibold p-1.5 rounded border bg-transparent text-center`} style={{ color: design.info.textColor }} />
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
            }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1.5 rounded border bg-transparent text-center`} style={{ color: design.info.textColor }} />
            </div>
            <div className="w-full flex px-4">
              <div className={`m-auto w-full max-w-[1280px]`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                <div className="lg:flex">
                  <div className="p-6 flex flex-col gap-8 w-full lg:w-5/12" style={{ borderRight: responsive === '400px' ? 'none' : `1px solid ${style.borderColor}`, borderBottom: responsive === '400px' ? `1px solid ${style.borderColor}` : 'none' }}>
                    <div className="flex flex-col gap-3">
                      <p>Seleccionar logo</p>
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
                      }} config='text-black bg-transparent dark:border-neutral-100' value={design.info.video}>
                        <option>Sin logo</option>
                        <option>Logo</option>
                        <option>Logo blanco</option>
                      </Select>
                      {
                        storeData?.logo && storeData.logo !== '' && design.info.video === 'Logo'
                          ? <Image src={storeData.logo} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                          : storeData?.logoWhite && storeData.logoWhite !== '' && design.info.video === 'Logo blanco'
                            ? <Image src={storeData.logoWhite} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                            : ''
                      }
                      {
                        calls?.length
                          ? (
                            <>
                              <p>Seleccionar llamada</p>
                              <Select value={design.meeting} config='text-black bg-transparent dark:border-neutral-100' change={(e: any) => {
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
                              }}>
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
                      <div className='flex gap-2'>
                        <Button2 action={(e: any) => {
                          e.preventDefault()
                          setLoading(true)
                          setError('')
                          setNewCall({ type: '', nameMeeting: '', duration: '15 minutos', intervals: '', description: '', title: '', labels: [{ data: '', name: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '', calendar: '' })
                          setTitleMeeting('Crear reunion')
                          setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }}>Crear reunion</Button2>
                        {
                          design.meeting && design.meeting !== ''
                            ? <Button2Secondary action={(e: any) => {
                              e.preventDefault()
                              setError('')
                              const call = calls.find(call => call._id === design.meeting)
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
                      {
                        calls?.find(call => call._id === design.meeting)
                          ? (
                            <>
                              <p className="text-xl font-semibold">{calls.find(call => call._id === design.meeting)?.nameMeeting}</p>
                              <div className="flex gap-2">
                                <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <p className="text-gray-500">{calls.find(call => call._id === design.meeting)?.duration}</p>
                              </div>
                            </>
                          )
                          : ''
                      }
                    </div>
                    {
                      calls?.find(call => call._id === design.meeting)
                        ? (
                          <div className="flex flex-col gap-3">
                            <p className="font-medium">Descripción:</p>
                            <div className="flex flex-col gap-2">
                              {
                                calls.find(call => call._id === design.meeting)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                              }
                            </div>
                          </div>
                        )
                        : ''
                    }
                  </div>
                  <div className="p-6 w-full lg:w-7/12">
                    <div className="w-full flex flex-col gap-6 h-full">
                      <div className='flex flex-col gap-6'>
                        <div className="flex gap-6 items-center m-auto">
                          <button className="text-gray-600 hover:text-gray-800">&lt;</button>
                          <h1 className="text-lg font-semibold">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h1>
                          <button className="text-gray-600 hover:text-gray-800">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          <div className="text-center font-semibold text-gray-600">Dom</div>
                          <div className="text-center font-semibold text-gray-600">Lun</div>
                          <div className="text-center font-semibold text-gray-600">Mar</div>
                          <div className="text-center font-semibold text-gray-600">Mié</div>
                          <div className="text-center font-semibold text-gray-600">Jue</div>
                          <div className="text-center font-semibold text-gray-600">Vie</div>
                          <div className="text-center font-semibold text-gray-600">Sáb</div>
                          {renderCalendar()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <div className="flex flex-col gap-16 py-8 md:py-14" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
            <div className="w-full flex flex-col gap-8 px-4">
              {
                design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                  ? <button className='w-fit m-auto'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                  : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                    ? <button className='w-fit m-auto'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : ''
              }
              <div className='flex flex-col gap-4'>
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
              </div>
              <div className={`m-auto w-full max-w-[1280px]`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                  <div className={`p-6 ${responsive === '400px' ? 'w-full' : 'w-5/12'} flex flex-col gap-8`} style={{ borderRight: responsive === '400px' ? 'none' : `1px solid ${style.borderColor}`, borderBottom: responsive === '400px' ? `1px solid ${style.borderColor}` : 'none' }}>
                    <div className="flex flex-col gap-3">
                      {
                        storeData?.logo && storeData.logo !== '' && design.info.video === 'Logo'
                          ? <Image src={storeData.logo} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                          : storeData?.logoWhite && storeData.logoWhite !== '' && design.info.video === 'Logo blanco'
                            ? <Image src={storeData.logoWhite} alt={`Imagen logo ${storeData.name}`} width={200} height={150} className='w-40' />
                            : ''
                      }
                      {
                        calls?.find(call => call._id === design.meeting)
                          ? (
                            <>
                              <p className="text-xl font-semibold">{calls.find(call => call._id === design.meeting)?.title}</p>
                              <div className="flex gap-2">
                                <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <p className="text-gray-500">{calls.find(call => call._id === design.meeting)?.duration}</p>
                              </div>
                            </>
                          )
                          : <p>No has seleccionado una llamada</p>
                      }
                    </div>
                    {
                      calls?.find(call => call._id === design.meeting)
                        ? (
                          <div className="flex flex-col gap-3">
                            <p className="font-medium">Descripción:</p>
                            <div onClick={() => console.log(calls.find(call => call._id === design.meeting)?.description)} className="flex flex-col gap-2">
                              {
                                calls.find(call => call._id === design.meeting)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                              }
                            </div>
                          </div>
                        )
                        : ''
                    }
                  </div>
                  <div className={`p-6 ${responsive === '400px' ? 'w-full' : 'w-7/12'}`}>
                    <div className="w-full flex flex-col gap-6 h-full">
                      <div className='flex flex-col gap-6'>
                        <div className="flex gap-6 items-center m-auto">
                          <button className="text-gray-600 hover:text-gray-800">&lt;</button>
                          <h1 className="text-lg font-semibold">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h1>
                          <button className="text-gray-600 hover:text-gray-800">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          <div className="text-center font-semibold text-gray-600">Dom</div>
                          <div className="text-center font-semibold text-gray-600">Lun</div>
                          <div className="text-center font-semibold text-gray-600">Mar</div>
                          <div className="text-center font-semibold text-gray-600">Mié</div>
                          <div className="text-center font-semibold text-gray-600">Jue</div>
                          <div className="text-center font-semibold text-gray-600">Vie</div>
                          <div className="text-center font-semibold text-gray-600">Sáb</div>
                          {renderCalendar()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

function renderCalendar(): JSX.Element[] {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month, 1).getDay();
  
    const days: JSX.Element[] = [];
  
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
  
    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <button 
          key={i}  
          className={`w-12 h-12 m-auto flex rounded-full $bg-gray-100 hover:bg-main hover:text-white transition-color duration-150`}
        >
          <p className='m-auto'>{i}</p>
        </button>
      );
    }
  
    return days;
  }
