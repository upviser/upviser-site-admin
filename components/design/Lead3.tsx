import { IPage, IDesign, IFunnel, ICall, IService, IForm, ICategoryPage } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Select, Spinner, Button2, Input, Button2Secondary, Popup, ButtonSubmit, Button2Red } from '../ui'
import { FaCheck } from 'react-icons/fa'
import { ButtonDesign } from './ButtonDesign'
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
    forms?: IForm[]
    popupForm?: any
    setPopupForm?: any
    setTitleForm?: any
    setNewForm?: any
    style?: any
    storeData?: any
    newForm?: IForm
    getForms: any
}

export const Lead3: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, responsive, pageNeed, forms, popupForm, setPopupForm, setTitleForm, setNewForm, style, storeData, newForm, getForms }) => {
  
    const [gradient, setGradient] = useState('')
    const [firstColor, setFirstColor] = useState('')
    const [lastColor, setLastColor] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingImage, setLoadingImage] = useState(false)
    const [errorImage, setErrorImage] = useState('')
    const [message, setMessage] = useState('')
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
    const [loadingDeleteForm, setLoadingDeleteForm] = useState(false)

    const handleUpload = async (e: any) => {
      if (!loadingVideo) {
        setLoadingVideo(true)
        setError('')
        const formData = new FormData();
        formData.append('video', e.target.files[0]);
        formData.append('name', e.target.files[0].name.replace(' ', '-'));
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/video`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          })
          if (response.status === 500) {
            setError('Ha ocurrido un error al subir el video, intentalo nuevamente')
          } else {
            if (inde !== undefined) {
              const oldFunnels = [...funnels!]
              oldFunnels[inde].steps[ind].design![index].info.video = response.data
              setFunnels(oldFunnels)
            } else if (indx !== undefined) {
              const oldServices = [...services!]
              oldServices[indx].steps[ind].design![index].info.video = response.data
              setServices(oldServices)
            } else if (inx !== undefined) {
              const oldPages = [...pages]
              oldPages[inx].design[index].info.video = response.data
              setPages(oldPages)
            } else if (inxx !== undefined) {
              const oldPages = [...pages]
              oldPages[inxx].design[index].info.video = response.data
              setPages(oldPages)
            } else {
              const oldPages = [...pages]
              oldPages[ind].design[index].info.video = response.data
              setPages(oldPages)
            }
          }
          setMessage('El video se subio con exito, dale en guardar aun que no se vea el video ya que este demorara unos minutos en ser procesado, pero si no se guarda se perdera el video')
          setLoadingVideo(false)
        } catch (error) {
          setLoadingVideo(false)
          setError('Ha ocurrido un error al subir el video, intentalo nuevamente')
        } 
      }
    }
  
    return (
      <>
      <Popup popup={popup} setPopup={setPopup}>
        <p>¿Estas seguro que deseas eliminar el formulario: <span className='font-medium'>{newForm?.nameForm}</span>?</p>
        <div className='flex gap-6'>
          <ButtonSubmit submitLoading={loadingDeleteForm} textButton='Eliminar' action={async (e: any) => {
            e.preventDefault()
            if (!loadingDeleteForm) {
              setLoadingDeleteForm(true)
              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/form/${newForm?._id}`)
              getForms()
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
              setLoadingDeleteForm(false)
            }
          }} color='red-500' config='w-28' />
          <button onClick={(e: any) => {
            e.preventDefault()
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }} className='my-auto'>Cancelar</button>
        </div>
      </Popup>
      <div className="w-full flex py-24 px-4" style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
        <div className={`w-full flex flex-col gap-4 max-w-[1280px] m-auto`}>
          {
            edit === 'Lead 3'
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
                  <textarea placeholder='Descripción' value={design.info.description2} onChange={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].info.description2 = e.target.value
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].info.description2 = e.target.value
                      setServices(oldServices)
                    } else if (inx !== undefined) {
                      const oldPages = [...pages]
                      oldPages[inx].design[index].info.description2 = e.target.value
                      setPages(oldPages)
                    } else if (inxx !== undefined) {
                      const oldPages = [...pages]
                      oldPages[inxx].design[index].info.description2 = e.target.value
                      setPages(oldPages)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].info.description2 = e.target.value
                      setPages(oldPages)
                    }
                  }} className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} text-center p-1.5 rounded border bg-transparent font-medium`} style={{ color: design.info.textColor }} />
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
                  }} className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} text-center p-1.5 rounded border bg-transparent font-medium underline`} style={{ color: design.info.textColor }} />
                  <div className='flex gap-3 m-auto'>
                    <FaCheck className='my-auto text-lg' style={{ color: style.primary }} />
                    <input value={design.info.subTitle} onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.subTitle = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.subTitle = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.subTitle = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.subTitle = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.subTitle = e.target.value
                        setPages(oldPages)
                      }
                    }} className={`${responsive === '400px' ? 'text-lg' : 'text-xl'} w-96 text-center p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                  </div>
                  <div className='flex gap-3 m-auto'>
                    <FaCheck className='my-auto text-lg' style={{ color: style.primary }} />
                    <input value={design.info.subTitle2} onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.subTitle2 = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.subTitle2 = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.subTitle2 = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.subTitle2 = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.subTitle2 = e.target.value
                        setPages(oldPages)
                      }
                    }} className={`${responsive === '400px' ? 'text-lg' : 'text-xl'} w-96 text-center p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                  </div>
                  <div className='flex gap-3 m-auto'>
                    <FaCheck className='my-auto text-lg' style={{ color: style.primary }} />
                    <input value={design.info.subTitle3} onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.subTitle3 = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.subTitle3 = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.subTitle3 = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.subTitle3 = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.subTitle3 = e.target.value
                        setPages(oldPages)
                      }
                    }} className={`${responsive === '400px' ? 'text-lg' : 'text-xl'} w-96 text-center p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                  </div>
                  <div className='flex gap-3 m-auto'>
                    <FaCheck className='my-auto text-lg' style={{ color: style.primary }} />
                    <input value={design.info.subTitle4} onChange={(e: any) => {
                      if (inde !== undefined) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[inde].steps[ind].design![index].info.subTitle4 = e.target.value
                        setFunnels(oldFunnels)
                      } else if (indx !== undefined) {
                        const oldServices = [...services!]
                        oldServices[indx].steps[ind].design![index].info.subTitle4 = e.target.value
                        setServices(oldServices)
                      } else if (inx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inx].design[index].info.subTitle4 = e.target.value
                        setPages(oldPages)
                      } else if (inxx !== undefined) {
                        const oldPages = [...pages]
                        oldPages[inxx].design[index].info.subTitle4 = e.target.value
                        setPages(oldPages)
                      } else {
                        const oldPages = [...pages]
                        oldPages[ind].design[index].info.subTitle4 = e.target.value
                        setPages(oldPages)
                      }
                    }} className={`${responsive === '400px' ? 'text-lg' : 'text-xl'} w-96 text-center p-1 border bg-transparent`} style={{ color: design.info.textColor }} />
                  </div>
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
                  <div className={`flex flex-col gap-4 h-fit m-auto w-full p-6 max-w-[500px]`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor }}>
                    <p className='font-medium text-lg'>Selecciona un formulario</p>
                      {
                        forms?.length
                          ? (
                            <Select change={(e: any) => {
                              if (inde !== undefined) {
                                const oldFunnels = [...funnels!]
                                oldFunnels[inde].steps[ind].design![index].form = e.target.value
                                setFunnels(oldFunnels)
                              } else if (indx !== undefined) {
                                const oldServices = [...services!]
                                oldServices[indx].steps[ind].design![index].form = e.target.value
                                setServices(oldServices)
                              } else if (inx !== undefined) {
                                const oldPages = [...pages]
                                oldPages[inx].design[index].form = e.target.value
                                setPages(oldPages)
                              } else if (inxx !== undefined) {
                                const oldPages = [...pages]
                                oldPages[inxx].design[index].form = e.target.value
                                setPages(oldPages)
                              } else {
                                const oldPages = [...pages]
                                oldPages[ind].design[index].form = e.target.value
                                setPages(oldPages)
                              }
                            }} value={design.form} config='text-black bg-transparent dark:border-neutral-100'>
                              <option>Seleccionar formulario</option>
                              {
                                forms?.map(form => (
                                  <option key={form._id} value={form._id}>{form.nameForm}</option>
                                ))
                              }
                            </Select>
                          )
                          : <p>No tienes formularios creados</p>
                      }
                      <div className='flex gap-2 flex-wrap'>
                        <Button2 action={(e: any) => {
                          e.preventDefault()
                          setError('')
                          setTitleForm('Nuevo formulario')
                          setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '', datas: [''], type: '' }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                          setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }}>Crear un formulario</Button2>
                        {
                          design.form && design.form !== ''
                            ? (
                              <>
                                <Button2Secondary color='main' action={(e: any) => {
                                  e.preventDefault()
                                  setError('')
                                  setTitleForm(forms?.find(form => form._id === design.form)?.nameForm)
                                  setNewForm(forms?.find(form => form._id === design.form))
                                  setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }}>Editar formulario</Button2Secondary>
                                <Button2Red action={(e: any) => {
                                  e.preventDefault()
                                  setNewForm(forms?.find(form => form._id === design.form))
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10);
                                }}>Eliminar formulario</Button2Red>
                              </>
                            )
                            : ''
                        }
                      </div>
                    {
                      design.form && design.form !== ''
                        ? (
                          <>
                            <p className="text-xl font-medium text-center" style={{ color: style.primary }}>{forms?.find(form => form._id === design.form)?.title}</p>
                            {
                              forms?.find(form => form._id === design.form)?.informations.map(information => (
                                <div key={information.text} className="flex gap-2">
                                  <div
                                    className="my-auto"
                                    dangerouslySetInnerHTML={{ __html: information.icon }}
                                  />
                                  <div className="flex flex-col my-auto">
                                    <p>{information.text}</p>
                                    {
                                      information.subText && information.subText !== ''
                                        ? <p className="text-gray-400">{information.subText}</p>
                                        : ''
                                    }
                                  </div>
                                </div>
                              ))
                            }
                            {
                              forms?.find(form => form._id === design.form)?.labels.map(label => (
                                <div key={label.data} className="flex flex-col gap-2">
                                  <p>{label.text !== '' ? label.text : label.name}</p>
                                  {
                                    label.type === 'Texto'
                                      ? <input placeholder={label.name} className='border py-2 px-3 text-sm bg-white' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} />
                                      : ''
                                  }
                                  {
                                    label.type === 'Selector'
                                      ? (
                                        <select className='border p-2 text-sm' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>
                                          <option>Seleccionar opción</option>
                                          {
                                            label.datas?.map(data => <option key={data}>{data}</option>)
                                          }
                                        </select>
                                      )
                                      : ''
                                  }
                                </div>
                              ))
                            }
                            <ButtonDesign style={style} text={forms?.find(form => form._id === design.form)?.button} config='w-full' />
                          </>
                        )
                        : ''
                    }
                  </div>
                </>
              )
              : (
                <>
                  {
                    design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                      ? <button className='w-fit m-auto'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                      : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                        ? <button className='w-fit m-auto'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                        : ''
                  }
                  <p
                    className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} transition-opacity duration-200 text-center font-medium`}
                    style={{ color: design.info.textColor }}
                    dangerouslySetInnerHTML={{ __html: design.info.description2 ? design.info.description2 : '' }}
                  />
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
                    className={`${responsive === '400px' ? 'text-xl' : 'text-3xl'} transition-opacity duration-200 text-center font-medium underline`}
                    style={{ color: design.info.textColor }}
                    dangerouslySetInnerHTML={{ __html: design.info.description ? design.info.description : '' }}
                  />
                  {
                    design.info.subTitle && design.info.subTitle !== ''
                      ? (
                        <div className='flex gap-3 m-auto'>
                          <FaCheck className='my-auto text-lg min-w-7' style={{ color: style.primary }} />
                          <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-center`} style={{ color: design.info.textColor }}>{design.info.subTitle}</p>
                        </div>
                      )
                      : ''
                  }
                  {
                    design.info.subTitle2 && design.info.subTitle2 !== ''
                      ? (
                        <div className='flex gap-3 m-auto'>
                          <FaCheck className='my-auto text-lg min-w-7' style={{ color: style.primary }} />
                          <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-center`} style={{ color: design.info.textColor }}>{design.info.subTitle2}</p>
                        </div>
                      )
                      : ''
                  }
                  {
                    design.info.subTitle3 && design.info.subTitle3 !== ''
                      ? (
                        <div className='flex gap-3 m-auto'>
                          <FaCheck className='my-auto text-lg min-w-7' style={{ color: style.primary }} />
                          <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-center`} style={{ color: design.info.textColor }}>{design.info.subTitle3}</p>
                        </div>
                      )
                      : ''
                  }
                  {
                    design.info.subTitle4 && design.info.subTitle4 !== ''
                      ? (
                        <div className='flex gap-3 m-auto'>
                          <FaCheck className='my-auto text-lg min-w-7' style={{ color: style.primary }} />
                          <p className={`${responsive === '400px' ? 'text-base' : 'text-lg'} text-center`} style={{ color: design.info.textColor }}>{design.info.subTitle4}</p>
                        </div>
                      )
                      : ''
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
                  <div className={`w-full flex`}>
                    {
                      design.form && design.form !== ''
                        ? ''
                        : (
                          <div className={`flex flex-col gap-4 h-fit m-auto w-full p-6 max-w-[500px]`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor }}>
                            <p>Selecciona un formulario</p>
                          </div>
                        )
                    }
                    {
                      design.form && design.form !== ''
                        ? (
                          <form className="flex w-full">
                            <div className={`flex flex-col gap-4 h-fit m-auto w-full p-6 max-w-[500px]`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor }}>
                              <p className="text-xl font-medium text-center" style={{ color: style.primary }}>{forms?.find(form => form._id === design.form)?.title}</p>
                              {
                                forms?.find(form => form._id === design.form)?.informations.map(information => (
                                  <div key={information.text} className="flex gap-2">
                                    <div
                                      className="my-auto"
                                      dangerouslySetInnerHTML={{ __html: information.icon }}
                                    />
                                    <div className="flex flex-col my-auto">
                                      <p>{information.text}</p>
                                      {
                                        information.subText && information.subText !== ''
                                          ? <p>{information.subText}</p>
                                          : ''
                                      }
                                    </div>
                                  </div>
                                ))
                              }
                              {
                                forms?.find(form => form._id === design.form)?.labels.map(label => (
                                  <div key={label.data} className="flex flex-col gap-2">
                                    <p>{label.text !== '' ? label.text : label.name}</p>
                                    <Input placeholder={label.name} change={undefined} value={undefined} config='dark:bg-white dark:border-neutral-100' />
                                  </div>
                                ))
                              }
                              <ButtonDesign style={style} text={forms?.find(form => form._id === design.form)?.button} config='w-full' />
                            </div>
                          </form>
                        )
                        : ''
                    }
                  </div>
                </>
              )
            }
        </div>
      </div>
    </>
  )
}
