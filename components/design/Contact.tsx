"use client"
import { ICategoryPage, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Input, Select, Spinner } from '../ui'
import axios from 'axios'
import { ButtonDesign } from './ButtonDesign'

interface Props {
    edit: any
    design: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    ind: number
    inde?: number
    indx?: number
    inx?: number
    inxx?: any
    funnels?: IFunnel[]
    setFunnels?: any
    responsive: string
    services?: IService[]
    setServices?: any
    style?: any
}

export const Contact: React.FC<Props> = ({ edit, design, pages, setPages, index, ind, inde, indx, inx, inxx, funnels, setFunnels, responsive, services, setServices, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className="w-full flex py-10 px-2" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className={`w-full max-w-[1280px] m-auto flex ${responsive === '400px' ? 'flex-col gap-4' : 'flex-row'} flex-wrap`}>
        {
          edit !== 'Contacto'
            ? (
              <>
                <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2 pr-4'} flex flex-col gap-3 m-auto`}>
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
                </div>
                <div className={`${responsive === '400px' ? 'w-full' : 'w-1/2 pl-4'} m-auto`}>
                  <div className={`flex flex-col gap-4 p-6 sm:p-8`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', color: design.info.textColor, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: design.info.image }}>
                    {
                      index === 0
                        ? (
                          <h2
                            className={`${responsive === '400px' ? 'text-2xl' : 'text-3xl'} font-medium`}
                            dangerouslySetInnerHTML={{ __html: design.info.titleForm ? design.info.titleForm  : '' }}
                          />
                        )
                        : (
                          <h3
                            className={`${responsive === '400px' ? 'text-2xl' : 'text-3xl'} font-medium`}
                            dangerouslySetInnerHTML={{ __html: design.info.titleForm ? design.info.titleForm  : '' }}
                          />
                        )
                    }
                    <div className="flex flex-col gap-2">
                      <p>Nombre</p>
                      <input placeholder='Nombre' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Email</p>
                      <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Telefono</p>
                      <div className='flex gap-2'>
                        <p className='my-auto'>+56</p>
                        <input placeholder='Teléfono' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Mensaje</p>
                      <textarea placeholder='Mensaje' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border h-24 bg-white' />
                    </div>
                    <ButtonDesign style={style} text='Enviar' />
                  </div>
                </div>
              </>
            )
            : (
              <>  
                <div className='flex w-full mb-4'>
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
                      <p className='font-medium m-auto'>Color formulario</p>
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
                </div>
                <div className="w-1/2 flex flex-col gap-2 m-auto pr-4">
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
                  }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} p-1.5 rounded border font-semibold bg-transparent`} style={{ color: design.info.textColor }} />
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
                  }} className={`${responsive === '400px' ? 'text-base' : 'text-lg'} p-1.5 h-20 rounded border bg-transparent`} style={{ color: design.info.textColor }} />
                </div>
                <div className="w-1/2 pl-4">
                <div className={`p-8 flex flex-col bg-white gap-4`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', boxShadow: style.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: design.info.image }}>
                  <input type='text' placeholder='Titulo del formulario' value={design.info.titleForm} onChange={(e: any) => {
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
                  }} className='p-1.5 rounded border text-[20px] font-medium bg-transparent lg:text-[24px]' />
                    <div className="flex flex-col gap-2">
                      <p>Nombre</p>
                      <input placeholder='Nombre' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Email</p>
                      <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Telefono</p>
                      <div className='flex gap-2'>
                        <p className='my-auto'>+56</p>
                        <input placeholder='Teléfono' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Mensaje</p>
                      <textarea placeholder='Mensaje' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border h-24 bg-white' />
                    </div>
                    <ButtonDesign style={style} text='Enviar' />
                  </div>
                </div>
              </>
            )
        }
      </div>
    </div>
  )
}
