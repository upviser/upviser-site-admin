import { IPage, IDesign, IFunnel, ICall, IService, ICategoryPage } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Select, Spinner, Button2Red, Button2, Input, Button } from '../ui'
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6'

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
}

export const Reviews: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, responsive, pageNeed, style }) => {
  
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
          edit === 'Reseñas'
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
                  design.info.reviews?.length
                    ? (
                      <div className='flex gap-6 justify-around flex-wrap'>
                        {
                          design.info.reviews?.map((review, i) => (
                            <div key={i} className={`${style.design === 'Borde' ? 'border' : ''} flex flex-col gap-4 p-6 w-full max-w-96 bg-white`} style={{ boxShadow: style.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '' }}>
                              <div className='flex flex-col gap-2'>
                                <p>Estrellas</p>
                                <div className='flex gap-2 flex-wrap'>
                                  <button className={`${review.stars === '0.5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '0.5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '0.5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '0.5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '0.5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '0.5'
                                      setPages(oldPages)
                                    }
                                  }}>0.5</button>
                                  <button className={`${review.stars === '1' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '1'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '1'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '1'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '1'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '1'
                                      setPages(oldPages)
                                    }
                                  }}>1</button>
                                  <button className={`${review.stars === '1.5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '1.5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '1.5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '1.5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '1.5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '1.5'
                                      setPages(oldPages)
                                    }
                                  }}>1.5</button>
                                  <button className={`${review.stars === '2' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '2'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '2'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '2'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '2'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '2'
                                      setPages(oldPages)
                                    }
                                  }}>2</button>
                                  <button className={`${review.stars === '2.5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '2.5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '2.5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '2.5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '2.5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '2.5'
                                      setPages(oldPages)
                                    }
                                  }}>2.5</button>
                                  <button className={`${review.stars === '3' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '3'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '3'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '3'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '3'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '3'
                                      setPages(oldPages)
                                    }
                                  }}>3</button>
                                  <button className={`${review.stars === '3.5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '3.5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '3.5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '3.5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '3.5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '3.5'
                                      setPages(oldPages)
                                    }
                                  }}>3.5</button>
                                  <button className={`${review.stars === '4' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '4'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '4'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '4'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '4'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '4'
                                      setPages(oldPages)
                                    }
                                  }}>4</button>
                                  <button className={`${review.stars === '4.5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '4.5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '4.5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '4.5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '4.5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '4.5'
                                      setPages(oldPages)
                                    }
                                  }}>4.5</button>
                                  <button className={`${review.stars === '5' ? 'bg-main border-main text-white' : ''} py-1.5 w-10 border rounded-lg`} onClick={(e: any) => {
                                    e.preventDefault()
                                    if (inde !== undefined) {
                                      const oldFunnels = [...funnels!]
                                      oldFunnels[inde].steps[ind].design![index].info.reviews![i].stars = '5'
                                      setFunnels(oldFunnels)
                                    } else if (indx !== undefined) {
                                      const oldServices = [...services!]
                                      oldServices[indx].steps[ind].design![index].info.reviews![i].stars = '5'
                                      setServices(oldServices)
                                    } else if (inx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inx].design[index].info.reviews![i].stars = '5'
                                      setPages(oldPages)
                                    } else if (inxx !== undefined) {
                                      const oldPages = [...pages]
                                      oldPages[inxx].design[index].info.reviews![i].stars = '5'
                                      setPages(oldPages)
                                    } else {
                                      const oldPages = [...pages]
                                      oldPages[ind].design[index].info.reviews![i].stars = '5'
                                      setPages(oldPages)
                                    }
                                  }}>5</button>
                                </div>
                              </div>
                              <textarea onChange={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  oldFunnels[inde].steps[ind].design![index].info.reviews![i].review = e.target.value
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  oldServices[indx].steps[ind].design![index].info.reviews![i].review = e.target.value
                                  setServices(oldServices)
                                } else if (inx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inx].design[index].info.reviews![i].review = e.target.value
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inxx].design[index].info.reviews![i].review = e.target.value
                                  setPages(oldPages)
                                } else {
                                  const oldPages = [...pages]
                                  oldPages[ind].design[index].info.reviews![i].review = e.target.value
                                  setPages(oldPages)
                                }
                              }} value={review.review} placeholder='Reseña' className='p-1.5 border text-center bg-white' />
                              <input type='text' onChange={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  oldFunnels[inde].steps[ind].design![index].info.reviews![i].name = e.target.value
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  oldServices[indx].steps[ind].design![index].info.reviews![i].name = e.target.value
                                  setServices(oldServices)
                                } else if (inx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inx].design[index].info.reviews![i].name = e.target.value
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inxx].design[index].info.reviews![i].name = e.target.value
                                  setPages(oldPages)
                                } else {
                                  const oldPages = [...pages]
                                  oldPages[ind].design[index].info.reviews![i].name = e.target.value
                                  setPages(oldPages)
                                }
                              }} placeholder='Nombre' value={review.name} className='p-1.5 border bg-white' />
                              <Button2Red action={(e: any) => {
                                if (inde !== undefined) {
                                  const oldFunnels = [...funnels!]
                                  oldFunnels[inde].steps[ind].design![index].info.reviews?.splice(i, 1)
                                  setFunnels(oldFunnels)
                                } else if (indx !== undefined) {
                                  const oldServices = [...services!]
                                  oldServices[indx].steps[ind].design![index].info.reviews?.splice(i, 1)
                                  setServices(oldServices)
                                } else if (inx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inx].design[index].info.reviews?.splice(i, 1)
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  oldPages[inxx].design[index].info.reviews?.splice(i, 1)
                                  setPages(oldPages)
                                } else {
                                  const oldPages = [...pages]
                                  oldPages[ind].design[index].info.reviews?.splice(i, 1)
                                  setPages(oldPages)
                                }
                              }}>Eliminar review</Button2Red>
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
                    oldFunnels[inde].steps[ind].design![index].info.reviews?.push({ review: 'Lorem ipsum', stars: '5', name: 'Lorem ipsum' })
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].info.reviews?.push({ review: 'Lorem ipsum', stars: '5', name: 'Lorem ipsum' })
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].info.reviews?.push({ review: 'Lorem ipsum', stars: '5', name: 'Lorem ipsum' })
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].info.reviews?.push({ review: 'Lorem ipsum', stars: '5', name: 'Lorem ipsum' })
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].info.reviews?.push({ review: 'Lorem ipsum', stars: '5', name: 'Lorem ipsum' })
                    setPages(oldPages)
                  }
                }}>Añadir review</Button2>
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
                  design.info.reviews?.length
                    ? (
                      <div className='flex gap-6 justify-around flex-wrap'>
                        {
                          design.info.reviews?.map((review, i) => (
                            <div key={i} className={`${style.design === 'Borde' ? 'border' : ''} flex flex-col gap-4 p-6 w-full max-w-96 bg-white`} style={{ boxShadow: style.design === 'Sombreado' ? '0px 3px 20px 3px #11111110' : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '' }}>
                              <div className='flex flex-col gap-4 m-auto'>
                                <div className='flex gap-1 m-auto'>
                                  {
                                    review.stars === '0.5'
                                      ? <FaRegStarHalfStroke className='text-yellow-400 text-xl' />
                                      : <FaStar className='text-yellow-400 text-xl' />
                                  }
                                  {
                                    review.stars === '1.5'
                                      ? <FaRegStarHalfStroke className='text-yellow-400 text-xl' />
                                      : Number(review.stars) > 1.5 ? <FaStar className='text-yellow-400 text-xl' /> : <FaRegStar className='text-yellow-400 text-xl' />
                                  }
                                  {
                                    review.stars === '2.5'
                                      ? <FaRegStarHalfStroke className='text-yellow-400 text-xl' />
                                      : Number(review.stars) > 2.5 ? <FaStar className='text-yellow-400 text-xl' /> : <FaRegStar className='text-yellow-400 text-xl' />
                                  }
                                  {
                                    review.stars === '3.5'
                                      ? <FaRegStarHalfStroke className='text-yellow-400 text-xl' />
                                      : Number(review.stars) > 3.5 ? <FaStar className='text-yellow-400 text-xl' /> : <FaRegStar className='text-yellow-400 text-xl' />
                                  }
                                  {
                                    review.stars === '4.5'
                                      ? <FaRegStarHalfStroke className='text-yellow-400 text-xl' />
                                      : Number(review.stars) > 4.5 ? <FaStar className='text-yellow-400 text-xl' /> : <FaRegStar className='text-yellow-400 text-xl' />
                                  }
                                </div>
                                <p className='text-center'>&quot;{review.review}&quot;</p>
                                <p className='font-medium'>{review.name}</p>
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
