"use client"
import { ICategoryPage, IDesign, IFunnel, IPage, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Input, Select, Spinner } from '../ui'
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
    responsive: string
    services?: IService[]
    setServices?: any
    style?: any
    storeData?: IStoreData
}

export const Video: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, responsive, services, setServices, style, storeData }) => {

  const [loadingVideo, setLoadingVideo] = useState(false)
  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  
  const handleUpload = async (e: any) => {
    if (!loadingVideo) {
      const file = e.target.files[0];
      if (!file) return;

      setLoadingVideo(true);
      setError("");
      setMessage("");

      try {
        // 1. Pedir a tu backend el guid y token
        const createRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/video`, {
          name: file.name,
        });

        const { uploadUrl, embedUrl } = createRes.data;

        // 2. Subir el archivo directo a Bunny
        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": "application/octet-stream",
            AccessKey: process.env.NEXT_PUBLIC_BUNNY_KEY, // ⚠️ aún expone la key
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });

        if (inde !== undefined) {
          const oldFunnels = [...funnels!]
          oldFunnels[inde].steps[ind].design![index].info.video = embedUrl
          setFunnels(oldFunnels)
        } else if (indx !== undefined) {
          const oldServices = [...services!]
          oldServices[indx].steps[ind].design![index].info.video = embedUrl
          setServices(oldServices)
        } else if (inx !== undefined) {
          const oldPages = [...pages]
          oldPages[inx].design[index].info.video = embedUrl
          setPages(oldPages)
        } else if (inxx !== undefined) {
          const oldPages = [...pages]
          oldPages[inxx].design[index].info.video = embedUrl
          setPages(oldPages)
        } else {
          const oldPages = [...pages]
          oldPages[ind].design[index].info.video = embedUrl
          setPages(oldPages)
        }

        setMessage('El video se subio con exito, dale en guardar aun que no se vea el video ya que este demorara unos minutos en ser procesado, pero si no se guarda se perdera el video')
        setLoadingVideo(false)
      } catch (err) {
        console.error(err);
        setError("❌ Error al subir el video.");
      } finally {
        setLoadingVideo(false);
      }
    }
  };
  
  return (
    <>
      {
        edit === 'Video'
          ? (
            <div className='w-full p-4 flex flex-col gap-4' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
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
              <div className='p-2 w-fit' style={{ backgroundColor: style.primary, color: style.button }}>
                  <input value={design.info.description} onChange={(e: any) => {
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
                  }} className='border p-1 text-white bg-transparent' />
                </div>
              <textarea value={design.info.title} onChange={(e: any) => {
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
              }} className={`${responsive === '400px' ? 'text-3xl' : 'text-5xl'} font-semibold text-center m-auto p-1 border bg-transparent w-full`} style={{ color: design.info.textColor }} />
              {
                error !== ''
                  ? <p className='bg-red-500 px-2 py-1 w-fit text-white m-auto'>{error}</p>
                  : ''
              }
              {
                message !== ''
                  ? <p className='bg-green-500 px-2 py-1 w-fit text-white m-auto'>{message}</p>
                  : ''
              }
              <input type='file' onChange={handleUpload} accept="video/*" className='m-auto w-fit text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' style={{ color: design.info.textColor }} />
              {
                loadingVideo
                  ? (
                    <div className='flex w-full'>
                      <div className='w-fit m-auto'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : design.info.video && design.info.video !== ''
                    ? (
                      <>
                        <div style={{ position: 'relative', paddingTop: '56.25%' }}><iframe src={design.info.video} loading="lazy" style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;" allowFullScreen={true}></iframe></div>
                      </>
                    )
                    : <p className='m-auto text-center' style={{ color: design.info.textColor }}>No se ha seleccionado un video</p>
              }
            </div>
          )
          : (
            <div className='w-full p-4 flex flex-col gap-4' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
              {
                design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                  ? <button className='w-fit m-auto'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                  : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                    ? <button className='w-fit m-auto'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : ''
              }
              {
                design.info.description && design.info.description !== ''
                  ? <p className='px-4 py-2 w-fit' style={{ backgroundColor: style?.primary, color: style?.button }}>{design.info.description}</p>
                  : ''
              }
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
              {
                design.info.video && design.info.video !== ''
                  ? (
                    <>
                      <div style={{ position: 'relative', paddingTop: '56.25%' }}><iframe src={design.info.video} loading="lazy" style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;" allowFullScreen={true}></iframe></div>
                    </>
                  )
                  : <p className='m-auto text-center' style={{ color: design.info.textColor }}>No se ha seleccionado un video</p>
              }
            </div>
          )
      }
    </>
  )
}
