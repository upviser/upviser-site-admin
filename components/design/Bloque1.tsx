"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Image from 'next/image'
import { ICall, ICategoryPage, IDesign, IForm, IFunnel, IPage, IService } from '@/interfaces'
import { Button, Input, Select, Spinner } from '../ui'
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
    inx?: number
    inxx?: number
    pageNeed: IPage[]
    funnels?: IFunnel[]
    setFunnels?: any
    responsive: string
    calls: ICall[] | undefined
    forms: IForm[] | undefined
    services?: IService[]
    setServices?: any
    style?: any
}

export const Bloque1: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, pageNeed, funnels, setFunnels, responsive, calls, forms, services, setServices, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  return (
    <div className="w-full flex py-24 px-2" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className={`${responsive === '400px' ? 'flex-col gap-4' : 'flex-row'} w-full flex max-w-[1280px] m-auto flex-wrap`}>
        {
          edit !== 'Bloque 1'
            ? (
              <>
                <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2 pr-2'} m-auto flex flex-col gap-3`}>
                  {
                    index === 0
                      ? (
                        <h1
                          className={`${responsive === '400px' ? 'text-3xl text-center' : 'text-5xl'} transition-opacity duration-200 font-semibold`}
                          style={{ color: design.info.textColor }}
                          dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                        />
                      )
                      : (
                        <h2
                          className={`${responsive === '400px' ? 'text-2xl text-center' : 'text-4xl'} transition-opacity duration-200 font-semibold`}
                          style={{ color: design.info.textColor }}
                          dangerouslySetInnerHTML={{ __html: design.info.title ? design.info.title  : '' }}
                        />
                      )
                  }
                  <p
                    className={`${responsive === '400px' ? 'text-base text-center' : 'text-lg'} transition-opacity duration-200`}
                    style={{ color: design.info.textColor }}
                    dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
                  />
                  {
                    design.info.button && design.info.button !== '' && design.info.buttonLink && design.info.buttonLink !== ''
                      ? <ButtonDesign style={style} text={design.info.button} config={`${responsive === '400px' ? 'm-auto' : ''}`} />
                      : ''
                  }
                </div>
                <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2 pl-2'} flex`}>
                  {
                    design.info?.image && design.info.image !== ''
                      ? <Image className='h-fit m-auto' style={{ borderRadius: `${style.borderBlock}px`, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }} width={480} height={300} alt='Imagen slider prueba' src={design.info.image} />
                      : ''
                  }
                </div>
              </>
            )
            : (
              <>
                <div className='w-full flex'>
                  <div className='flex flex-col gap-2 w-fit m-auto bg-white p-6 rounded-xl shadow-md border border-black/5 mb-4'>
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
                      }} value={design.info.typeBackground} config='w-fit m-auto bg-white dark:border-neutral-100'>
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
                              }} config=' bg-white dark:border-neutral-100'>
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
                  </div>
                </div>
                <div className="w-1/2 m-auto flex flex-col gap-4 pr-2">
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
                  }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} font-semibold p-1.5 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
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
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1.5 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
                  <div className='flex gap-4'>
                    <div className='w-fit text-white py-2 px-6' style={{ backgroundColor: style.primary, color: style.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>
                      <input type='text' placeholder='Boton' value={design.info.button} onChange={(e: any) => {
                        if (inde !== undefined) {
                          const oldFunnels = [...funnels!]
                          oldFunnels[inde].steps[ind].design![index].info.button = e.target.value
                          setFunnels(oldFunnels)
                        } else if (indx !== undefined) {
                          const oldServices = [...services!]
                          oldServices[indx].steps[ind].design![index].info.button = e.target.value
                          setServices(oldServices)
                        } else if (inx !== undefined) {
                          const oldPages = [...pages]
                          oldPages[inx].design[index].info.button = e.target.value
                          setPages(oldPages)
                        } else if (inxx !== undefined) {
                          const oldPages = [...pages]
                          oldPages[inxx].design[index].info.button = e.target.value
                          setPages(oldPages)
                        } else {
                          const oldPages = [...pages]
                          oldPages[ind].design[index].info.button = e.target.value
                          setPages(oldPages)
                        }
                      }} className='text-sm lg:text-[16px] bg-transparent border border-neutral-500' />
                    </div>
                    <select value={design.info.buttonLink} onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.buttonLink = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.buttonLink = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.buttonLink = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.buttonLink = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.buttonLink = e.target.value
                        setPages(oldPages)
                      }
                    }} className='rounded border bg-white max-w-40'>
                      <option>Acción boton</option>
                      {
                        pageNeed.map(page => (
                          <option key={page.slug}>/{page.slug}</option>
                        ))
                      }
                      {
                        funnels?.map(funnel => {
                          return funnel.steps.map(step => (
                            <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>
                          ))
                        })
                      }
                      {
                        calls?.map(call => <option key={call._id} value={`/llamadas/${call.nameMeeting}`}>Abrir llamada {call.nameMeeting}</option>)
                      }
                      <option>Abrir popup</option>
                      {
                        forms?.map(form => <option key={form._id} value={form._id}>Abrir formulario {form.nameForm} como popup</option>)
                      }
                      {
                        calls?.map(call => <option key={call._id} value={call._id}>Abrir llamada {call.nameMeeting} como popup</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2 pl-2">
                  {
                    design.info?.image && design.info.image !== ''
                      ? <Image className='h-fit m-auto' style={{ borderRadius: `${style.borderBlock}px`, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }} width={480} height={300} alt='Imagen slider prueba' src={design.info.image} />
                      : ''
                  }
                  {
                    loading
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
                    error !== ''
                      ? <p className='bg-red-500 text-white px-2 py-1'>{error}</p>
                      : ''
                  }
                  <input type='file' className='m-auto text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' style={{ color: design.info.textColor }} onChange={async (e: any) => {
                    if (!loading) {
                      setLoading(true)
                      setError('')
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
                          oldFunnels[inde].steps[ind].design![index].info.image = data
                          setFunnels(oldFunnels)
                        } else if (indx !== undefined) {
                          const oldServices = [...services!]
                          oldServices[indx].steps[ind].design![index].info.image = data
                          setServices(oldServices)
                        } else if (inx !== undefined) {
                          const oldPages = [...pages]
                          oldPages[inx].design[index].info.image = data
                          setPages(oldPages)
                        } else if (inxx !== undefined) {
                          const oldPages = [...pages]
                          oldPages[inxx].design[index].info.image = data
                          setPages(oldPages)
                        } else {
                          const oldPages = [...pages]
                          oldPages[ind].design[index].info.image = data
                          setPages(oldPages)
                        }
                        setLoading(false)
                      } catch (error) {
                        setLoading(false)
                        setError('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                      }
                    }
                  }} />
                </div>
              </>
            )
        }
      </div>
    </div>
  )
}
