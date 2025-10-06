import { IPage, IDesign, IFunnel, ICall, IService, IForm, ICategoryPage } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Select, Spinner, Button2Red, Button2, Input } from '../ui'
import { ButtonDesign } from './'
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
    calls?: ICall[]
    services?: IService[]
    setServices?: any
    responsive: string
    pageNeed: IPage[]
    style?: any
    forms?: IForm[]
}

export const Blocks: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, responsive, pageNeed, style, forms }) => {
  
    const [gradient, setGradient] = useState('')
    const [firstColor, setFirstColor] = useState('')
    const [lastColor, setLastColor] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingImage, setLoadingImage] = useState(false)
    const [errorImage, setErrorImage] = useState('')
  
    return (
    <div className="w-full flex py-24 px-4" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className={`w-full flex flex-col gap-4 max-w-[1280px] m-auto`}>
        {
          edit === 'Bloques'
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
                  <div className='flex flex-col gap-2'>
                    <p className='font-medium m-auto'>Color bloques</p>
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
                {
                  design.info.blocks?.length
                    ? (
                      <div className='flex gap-6 justify-around flex-wrap'>
                        {
                            design.info.blocks?.map((block, i) => (
                                <div key={i} className={`flex flex-col gap-4 p-6 w-full max-w-96`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: design.info.image }}>
                                  {
                                    block.image && block.image !== ''
                                      ? <Image src={block.image} alt={`Imagen del bloque de ${block.title}`} width={500} height={400} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }} />
                                      : ''
                                  }
                                  <input onChange={(e: any) => {
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.blocks![i].title = e.target.value
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.blocks![i].title = e.target.value
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.blocks![i].title = e.target.value
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.blocks![i].title = e.target.value
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.blocks![i].title = e.target.value
                                      setPages(oldPages)
                                    }
                                  }} value={block.title} className='text-lg font-medium p-1.5 border w-full text-center bg-transparent' />
                                  <textarea onChange={(e: any) => {
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.blocks![i].description = e.target.value
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.blocks![i].description = e.target.value
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.blocks![i].description = e.target.value
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.blocks![i].description = e.target.value
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.blocks![i].description = e.target.value
                                      setPages(oldPages)
                                    }
                                  }} value={block.description} placeholder='Pregunta' className='p-1.5 border text-center bg-transparent' />
                                  <div className='m-auto w-fit text-white py-2 px-6' style={{ backgroundColor: style.primary, color: style.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>
                                    <input type='text' placeholder='Boton' value={block.buttonText} onChange={(e: any) => {
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.blocks![i].buttonText = e.target.value
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.blocks![i].buttonText = e.target.value
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.blocks![i].buttonText = e.target.value
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.blocks![i].buttonText = e.target.value
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.blocks![i].buttonText = e.target.value
                                      setPages(oldPages)
                                    }
                                  }} className='text-sm lg:text-[16px] bg-transparent border border-neutral-500' />
                                    </div>
                                    <select value={block.buttonLink} onChange={(e: any) => {
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.blocks![i].buttonLink = e.target.value
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.blocks![i].buttonLink = e.target.value
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.blocks![i].buttonLink = e.target.value
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.blocks![i].buttonLink = e.target.value
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.blocks![i].buttonLink = e.target.value
                                      setPages(oldPages)
                                    }
                                  }} className='rounded border p-1.5 m-auto w-full bg-transparent'>
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
                                      calls?.map(call => <option key={call._id}>/llamadas/{encodeURIComponent(call.nameMeeting)}</option>)
                                    }
                                    <option>Abrir popup</option>
                                    {
                                      forms?.map(form => <option key={form._id} value={form._id}>Abrir formulario {form.nameForm} como popup</option>)
                                    }
                                    {
                                      calls?.map(call => <option key={call._id} value={call._id}>Abrir llamada {call.nameMeeting} como popup</option>)
                                    }
                                    <option>Abrir Whatsapp</option>
                                  </select>
                                  <input type='file' className='m-auto text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 hover:file:bg-main/40 file:text-white' onChange={async (e: any) => {
                                    const formData = new FormData();
                                    formData.append('image', e.target.files[0]);
                                    formData.append('name', e.target.files[0].name);
                                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                      headers: {
                                        accept: 'application/json',
                                        'Accept-Language': 'en-US,en;q=0.8'
                                      }
                                    })
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.blocks![i].image = data
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.blocks![i].image = data
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.blocks![i].image = data
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.blocks![i].image = data
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.blocks![i].image = data
                                      setPages(oldPages)
                                    }
                                  }} />
                                  <Button2Red action={(e: any) => {
                                    const oldPages = [...pages]
                                    oldPages[ind].design[index].info.blocks?.splice(i, 1)
                                    setPages(oldPages)
                                  }}>Eliminar bloque</Button2Red>
                                </div>
                              ))
                        }
                      </div>
                    )
                    : <p>No hay bloques creados</p>
                }
                <Button2 action={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].info.blocks?.push({ title: 'Lorem ipsum', description: 'Lorem ipsum', buttonText: 'Lorem ipsum', buttonLink: '' })
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.blocks?.push({ title: 'Lorem ipsum', description: 'Lorem ipsum', buttonText: 'Lorem ipsum', buttonLink: '' })
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.blocks?.push({ title: 'Lorem ipsum', description: 'Lorem ipsum', buttonText: 'Lorem ipsum', buttonLink: '' })
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.blocks?.push({ title: 'Lorem ipsum', description: 'Lorem ipsum', buttonText: 'Lorem ipsum', buttonLink: '' })
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.blocks?.push({ title: 'Lorem ipsum', description: 'Lorem ipsum', buttonText: 'Lorem ipsum', buttonLink: '' })
                    setPages(oldPages)
                  }
                }}>Añadir bloque</Button2>
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
                  design.info.blocks?.length
                    ? (
                      <div className='flex gap-6 justify-around flex-wrap'>
                        {
                          design.info.blocks?.map((block, i) => (
                            <div key={i} className={`flex flex-col gap-4 p-6 w-full max-w-96`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', backgroundColor: design.info.image }}>
                              <div className='flex flex-col gap-4 m-auto'>
                                {
                                  block.image && block.image !== ''
                                    ? <Image src={block.image && block.image !== '' ? block.image : ''} alt={`Imagen del bloque de ${block.title}`} width={500} height={400} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }} />
                                    : ''
                                }
                                {
                                  index === 0
                                    ? (
                                      <h2
                                        className={`${responsive === '400px' ? 'text-2xl' : 'text-4xl'} transition-opacity duration-200 font-semibold text-center`}
                                        style={{ color: design.info.textColor }}
                                        dangerouslySetInnerHTML={{ __html: block.title ? block.title  : '' }}
                                      />
                                    )
                                    : (
                                      <h3
                                        className={`${responsive === '400px' ? 'text-xl' : 'text-2xl'} transition-opacity duration-200 font-semibold text-center`}
                                        style={{ color: design.info.textColor }}
                                        dangerouslySetInnerHTML={{ __html: block.title ? block.title  : '' }}
                                      />
                                    )
                                }
                                <p className='text-center' style={{ color: design.info.textColor }} dangerouslySetInnerHTML={{ __html: block.description ? block.description  : '' }} />
                                {
                                  block.buttonLink && block.buttonLink !== '' && block.buttonText && block.buttonText !== ''
                                    ? <ButtonDesign style={style} text={block.buttonText} config='m-auto' />
                                    : ''
                                }
                              </div>
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
