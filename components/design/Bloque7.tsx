"use client"
import { ICategoryPage, IDesign, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Input, Select, Spinner } from '../ui'
import axios from 'axios'

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
    services?: IService[]
    setServices?: any
}

export const Bloque7: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, services, setServices }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className='w-full p-2 bg-main flex flex-col gap-4' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      {
        edit === 'Bloque 7'
          ? (
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
              </div>
              <input value={design.info.description} onChange={(e: any) => {
                if (inde !== undefined) {
                  const oldFunnels = [...funnels!]
                  oldFunnels[inde].steps[ind].design![index].info.description = e.target.value
                  setFunnels(oldFunnels)
                } else if (indx !== undefined) {
                  const oldServices = [...services!]
                  oldServices[indx].steps[ind].design![index].info.description = e.target.value
                  setServices(oldServices)
                } else {
                  const oldPages = [...pages]
                  oldPages[ind].design[index].info.description = e.target.value
                  setPages(oldPages)
                }
              }} className='m-auto bg-transparent border p-1 text-white w-full text-center font-medium' style={{ color: design.info.textColor }} />
            </>
          )
          : (
            <p
              className='font-medium text-center m-auto text-white'
              style={{ color: design.info.textColor }}
              dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
            />
          )
      }
    </div>
  )
}
