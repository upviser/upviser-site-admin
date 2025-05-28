"use client"
import { ICategoryPage, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Button, Input, Select, Spinner } from '../ui'
import axios from 'axios'
import { ButtonDesign } from './ButtonDesign'

interface Props {
    edit: any
    pages: IPage[] | ICategoryPage[]
    setPages: any
    index: number
    design: any
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

export const Subscription: React.FC<Props> = ({ edit, pages, setPages, index, design, ind, inde, indx, inx, inxx, funnels, setFunnels, responsive, services, setServices, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className='w-full pl-4 pr-4 flex' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <form className='m-auto w-full max-w-[1280px] mt-16 mb-16 flex flex-col gap-4'>
      {
        edit !== 'Suscripción'
          ? (
            <>
              <h3 className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} font-medium text-center`} style={{ color: design.info.textColor }}>{design.info.title}</h3>
              <div className='flex gap-2'>
                <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='text-sm px-3 py-2 border w-full bg-white' />
                <ButtonDesign style={style} text='Enviar' />
              </div>
            </>
          )
          : (
            <>
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
              }} className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} p-1.5 border rounded text-center font-medium m-auto bg-transparent w-full`} style={{ color: design.info.textColor }} />
              <div className='flex gap-2'>
                <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='text-sm px-3 py-2 border w-full bg-white' />
                <ButtonDesign style={style} text='Enviar' />
              </div>
            </>
          )
      }
      </form>
    </div>
  )
}
