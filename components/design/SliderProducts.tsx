"use client"
import React, { useState } from 'react'
import { ProductCard } from '.'
import { ICategory, ICategoryPage, IFunnel, IPage, IProduct, IService } from '@/interfaces'
import { Input, Select, Spinner } from '../ui'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./SliderProducts.module.css"
import { Pagination } from "swiper/modules"
import Link from 'next/link'
import { NumberFormat } from '@/utils'
import Image from 'next/image'

interface Props {
    edit: any
    order: any
    setOrder: any
    productsOrder: IProduct[] | undefined
    setPages: any
    design: any
    categories: ICategory[]
    pages: IPage[] | ICategoryPage[]
    index: number
    inde?: any
    ind?: any
    indx?: any
    inx?: any
    inxx?: any
    funnels?: IFunnel[]
    setFunnels?: any
    services?: IService[]
    setServices?: any
    style?: any
}

export const SliderProducts: React.FC<Props> = ({ edit, order, setOrder, productsOrder, setPages, design, categories, pages, index, ind, inde, indx, inx, inxx, funnels, setFunnels, services, setServices, style }) => {
  
  const [loading, setLoading] = useState(false)
  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  return (
    <div className='flex w-full p-4' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}`, color: design.info.textColor }}>
      <div className='m-auto w-full max-w-[1600px] relative flex flex-col gap-2'>
        {
          edit === 'Carrusel productos'
            ? (
              <>
                <div className='flex flex-col gap-2 w-fit m-auto bg-white text-black p-6 rounded-xl shadow-md border border-black/5'>
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
              <input type='text' placeholder='Titulo' className='text-[20px] font-medium lg:text-[24px] border p-1.5 rounded w-[800px] bg-transparent' value={design.info.title} onChange={(e: any) => {
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
              }} />
              <Swiper
                className={`${styles.mySwiper} w-full`}
                slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth > 850 ? 3 : 2}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {
                  productsOrder?.map(product => (
                    <SwiperSlide key={product._id} className='m-auto'>
                      <div className="flex flex-col gap-1 m-auto w-40 lg:w-60">
                        <Link className="w-fit" href=''><Image className="w-40 lg:w-60" style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={product.images[0]} alt={`Imagen producto ${product.name}`} width={500} height={500} /></Link>
                        <Link href={`/tienda/${product.category.slug}/${product.slug}`}><p className="font-medium text-sm lg:text-[16px]">{product.name}</p></Link>
                        <div className="flex gap-2">
                          <p className="text-sm lg:text-[16px]">${NumberFormat(product.price)}</p>
                          {
                            product.beforePrice
                              ? <p className="text-xs lg:text-sm line-through">${NumberFormat(product.beforePrice)}</p>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='h-8' />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <select onChange={(e: any) => {
                if (inde !== undefined) {
                  const oldFunnels = [...funnels!]
                  oldFunnels[inde].steps[ind].design![index].info.products = e.target.value
                  setFunnels(oldFunnels)
                } else if (indx !== undefined) {
                  const oldServices = [...services!]
                  oldServices[indx].steps[ind].design![index].info.products = e.target.value
                  setServices(oldServices)
                } else if (inx !== undefined) {
                  const oldPages = [...pages]
                  oldPages[inx].design[index].info.products = e.target.value
                  setPages(oldPages)
                } else if (inxx !== undefined) {
                  const oldPages = [...pages]
                  oldPages[inxx].design[index].info.products = e.target.value
                  setPages(oldPages)
                } else {
                  const oldPages = [...pages]
                  oldPages[ind].design[index].info.products = e.target.value
                  setPages(oldPages)
                }
              }} value={design.info.products} className='p-1.5 rounded border text-sm bg-transparent dark:border-neutral-100 focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main'>
                <option>Seleccionar productos</option>
                <option>Todos</option>
                <option>Productos en oferta</option>
                {
                  categories.map(category => (
                    <option key={category._id}>{category.category}</option>
                  ))
                }
              </select>
            </>
          )
          : (
            <>
              <h2 className="text-[20px] font-medium lg:text-[24px]">{ design.info.title }</h2>
              <Swiper
                className={`${styles.mySwiper} w-full`}
                slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth > 850 ? 3 : 2}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {
                  productsOrder?.map(product => (
                    <SwiperSlide key={product._id} className='m-auto'>
                      <div className="flex flex-col gap-1 m-auto w-40 lg:w-60">
                        <Link className="w-fit" href=''><Image className="w-40 lg:w-60" style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={product.images[0]} alt={`Imagen producto ${product.name}`} width={500} height={500} /></Link>
                        <Link href={`/tienda/${product.category.slug}/${product.slug}`}><p className="font-medium text-sm lg:text-[16px]">{product.name}</p></Link>
                        <div className="flex gap-2">
                          <p className="text-sm lg:text-[16px]">${NumberFormat(product.price)}</p>
                          {
                            product.beforePrice
                              ? <p className="text-xs lg:text-sm line-through">${NumberFormat(product.beforePrice)}</p>
                              : ''
                          }
                        </div>
                      </div>
                      <div className='h-8' />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </>
          )
      }
      </div>
    </div>
  )
}
