"use client"
import { ICategoryPage, IDesign, IFunnel, IPage, IService, IStoreData } from '@/interfaces'
import React, { useState } from 'react'
import { Button, Input, Select, Spinner } from '../ui'
import Script from 'next/script'
import { NumberFormat } from '@/utils'
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
    services: IService[]
    setError: any
    setTitle: any
    popupService: any
    setPopupService: any
    setNewService: any
    setServices?: any
    storeData?: IStoreData
    style?: any
}

declare global {
    interface Window {
      MercadoPago: any;
      cardPaymentBrickController: any;
    }
}

export const Checkout: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, services, setError, setTitle, popupService, setPopupService, setNewService, setServices, storeData, style }) => {

  const [gradient, setGradient] = useState('')
  const [firstColor, setFirstColor] = useState('')
  const [lastColor, setLastColor] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  const initMercadoPago = () => {
    const mp = new window.MercadoPago('TEST-1a27db10-a19d-4ab1-923e-6c5b1808a760', {
      locale: 'es-CL',
    });

    const bricksBuilder = mp.bricks();

    const renderCardPaymentBrick = async (bricksBuilder: any) => {
      const settings = {
        initialization: {
          amount: 100, // monto a ser pagado
          payer: {
            email: '',
          },
        },
        customization: {
          visual: {
            style: {
              customVariables: {
                theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
              },
            },
          },
          paymentMethods: {
            maxInstallments: 1,
          },
        },
        callbacks: {
          onReady: () => {
            // callback llamado cuando Brick esté listo
          },
          onSubmit: (cardFormData: any) => {
            // callback llamado cuando el usuario haga clic en el botón enviar los datos
            // ejemplo de envío de los datos recolectados por el Brick a su servidor
            return new Promise((resolve, reject) => {
              fetch('http://localhost:4000/process_payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardFormData),
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                  // tratar respuesta de error al intentar crear el pago
                  console.error('Error al procesar el pago:', error);
                  reject();
                });
            });
          },
          onError: (error: any) => {
            // callback llamado para todos los casos de error de Brick
            console.error('Error en el Brick:', error);
          },
        },
      };
      window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings)
    };

    renderCardPaymentBrick(bricksBuilder);
  }

  return (
    <div className='w-full flex px-4 py-8 md:py-14' style={{ background: `${design.info.typeBackground === 'Degradado' ? design.info.background : design.info.typeBackground === 'Color' ? design.info.background : ''}` }}>
      <div className='m-auto w-full max-w-[1280px] flex flex-wrap'>
        {
          edit === 'Checkout'
            ? (
              <>
                <div className='w-full flex mb-4'>
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
                                  oldPages[inx].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
                                  setPages(oldPages)
                                } else if (inxx !== undefined) {
                                  const oldPages = [...pages]
                                  setFirstColor(e.target.value)
                                  oldPages[inxx].design[index].info.background = `linear-gradient(${e.target.value}deg, ${firstColor}, ${lastColor})` 
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
                      <p className='font-medium m-auto'>Color bloque</p>
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
                </div>
                {
                  design.info.titleForm === 'Logo principal' && storeData?.logo && storeData.logo !== ''
                    ? <button className='w-full m-auto mb-8'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                      ? <button className='w-full m-auto mb-8'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                      : ''
                }
                <div className=' flex flex-col gap-6 w-3/5'>
                  <div className='flex flex-col gap-4 p-4'>
                    <p className='text-xl font-medium' style={{ color: design.info.textColor }}>Datos de contacto</p>
                    <div className='flex flex-col gap-2'>
                      <p style={{ color: design.info.textColor }}>Email</p>
                      <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className='flex gap-4'>
                      <div className='flex flex-col gap-2 w-1/2'>
                        <p style={{ color: design.info.textColor }}>Nombre</p>
                        <input placeholder='Nombre' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                      <div className='flex flex-col gap-2 w-1/2'>
                        <p style={{ color: design.info.textColor }}>Apellido</p>
                        <input placeholder='Apellido' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p style={{ color: design.info.textColor }}>Teléfono</p>
                      <input placeholder='Teléfono' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                  </div>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col'>
                      <Script src="https://sdk.mercadopago.com/js/v2" onLoad={() => initMercadoPago()} />
                      <div id="cardPaymentBrick_container"></div>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col gap-4 w-2/5 p-6 h-fit`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                  <p>Seleccionar servicio</p>
                  <Select change={(e: any) => {
                    if (inde !== undefined) {
                      const oldFunnels = [...funnels!]
                      oldFunnels[inde].steps[ind].design![index].service =  { service: e.target.value }
                      setFunnels(oldFunnels)
                    } else if (indx !== undefined) {
                      const oldServices = [...services!]
                      oldServices[indx].steps[ind].design![index].service = { service: e.target.value }
                      setServices(oldServices)
                    } else {
                      const oldPages = [...pages]
                      oldPages[ind].design[index].service = { service: e.target.value }
                      setPages(oldPages)
                    }
                  }} value={design.service?.service} config=' bg-transparent dark:border-neutral-100'>
                    <option>Seleccionar servicio</option>
                    {
                      services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                      ))
                    }
                  </Select>
                  {
                    services.find(servi => servi._id === design.service?.service)?.typeService === 'Diferentes planes'
                      ? (
                        <div className='flex flex-col gap-2'>
                          <p>Selecciona el plan</p>
                          <Select change={(e: any) => {
                            if (inde !== undefined) {
                              const oldFunnels = [...funnels!]
                              oldFunnels[inde].steps[ind].design![index].service!.plan = e.target.value
                              setFunnels(oldFunnels)
                            } else if (indx !== undefined) {
                              const oldServices = [...services!]
                              oldServices[indx].steps[ind].design![index].service!.plan = e.target.value
                              setServices(oldServices)
                            } else {
                              const oldPages = [...pages]
                              oldPages[ind].design[index].service!.plan = e.target.value
                              setPages(oldPages)
                            }
                          }} value={design.service?.plan}>
                            <option>Seleccionar plan</option>
                            {
                              services!.find(servi => servi._id === design.service?.service)?.plans?.plans.map(plan => <option key={plan._id}>{plan.name}</option>)
                            }
                          </Select>
                        </div>
                      )
                      : ''
                  }
                  <Button action={(e: any) => {
                    e.preventDefault()
                    setError('')
                    setTitle('Nuevo servicio')
                    setNewService({ name: '', description: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] } })
                    setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Nuevo servicio</Button>
                  {
                    design.service && design.service.service !== ''
                      ? (
                        <>
                          <p className='font-medium text-lg'>{services.find(servi => servi._id === design.service?.service)?.name}</p>
                          <p>Tipo de pago: {services.find(servi => servi._id === design.service?.service)?.typePrice}</p>
                          <div className='border-t w-full' />
                          {
                            services.find(servi => servi._id === design.service?.service)?.typePay === 'El precio incluye el IVA'
                              ? services.find(servi => servi._id === design.service?.service)?.typeService === 'Servicio unico' && (services.find(servi => servi._id === design.service?.service)?.typePrice === 'Facturación mensual' || services.find(servi => servi._id === design.service?.service)?.typePrice === 'Pago unico')
                                ? (
                                  <>
                                    <div className='flex gap-2 justify-between'>
                                      <p>Subtotal:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 96.39)}</p>
                                    </div>
                                    <div className='flex gap-2 justify-between'>
                                      <p>IVA:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 22.61)}</p>
                                    </div>
                                    <div className='border-t w-full' />
                                    <div className='flex gap-2 justify-between'>
                                      <p className='font-medium'>Total:</p>
                                      <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price))}</p>
                                    </div>
                                  </>
                                )
                                : services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)
                                  ? (
                                    <>
                                      <div className='flex gap-2 justify-between'>
                                        <p>Subtotal:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 96.39)}</p>
                                      </div>
                                      <div className='flex gap-2 justify-between'>
                                        <p>IVA:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 22.61)}</p>
                                      </div>
                                      <div className='border-t w-full' />
                                      <div className='flex gap-2 justify-between'>
                                        <p className='font-medium'>Total:</p>
                                        <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price))}</p>
                                      </div>
                                    </>
                                  )
                                  : ''
                              : services.find(servi => servi._id === design.service?.service)?.typeService === 'Servicio unico' && (services.find(servi => servi._id === design.service?.service)?.typePrice === 'Facturación mensual' || services.find(servi => servi._id === design.service?.service)?.typePrice === 'Pago unico')
                                ? (
                                  <>
                                    <div className='flex gap-2 justify-between'>
                                      <p>Subtotal:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price))}</p>
                                    </div>
                                    <div className='flex gap-2 justify-between'>
                                      <p>IVA:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 19)}</p>
                                    </div>
                                    <div className='border-t w-full' />
                                    <div className='flex gap-2 justify-between'>
                                      <p className='font-medium'>Total:</p>
                                      <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) + Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 19)}</p>
                                    </div>
                                  </>
                                )
                                : services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)
                                  ? (
                                    <>
                                      <div className='flex gap-2 justify-between'>
                                        <p>Subtotal:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price))}</p>
                                      </div>
                                      <div className='flex gap-2 justify-between'>
                                        <p>IVA:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 19)}</p>
                                      </div>
                                      <div className='border-t w-full' />
                                      <div className='flex gap-2 justify-between'>
                                        <p className='font-medium'>Total:</p>
                                        <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) + Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 19)}</p>
                                      </div>
                                    </>
                                  )
                                  : ''
                          }
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
                    ? <button className='w-full m-auto mb-8'><Image src={storeData.logo} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                    : design.info.titleForm === 'Logo blanco' && storeData?.logoWhite && storeData.logoWhite !== ''
                      ? <button className='w-full m-auto mb-8'><Image src={storeData.logoWhite} alt={`Logo ${storeData.name}`} width={320} height={150} className='w-44 m-auto lg:w-52' /></button>
                      : ''
                }
                <div className='flex flex-col gap-6 w-3/5'>
                  <div className='flex flex-col gap-4 p-4'>
                    <p className='text-xl font-medium' style={{ color: design.info.textColor }}>Datos de contacto</p>
                    <div className='flex flex-col gap-2'>
                      <p style={{ color: design.info.textColor }}>Email</p>
                      <input placeholder='Email' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                    <div className='flex gap-4'>
                      <div className='flex flex-col gap-2 w-1/2'>
                        <p style={{ color: design.info.textColor }}>Nombre</p>
                        <input placeholder='Nombre' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                      <div className='flex flex-col gap-2 w-1/2'>
                        <p style={{ color: design.info.textColor }}>Apellido</p>
                        <input placeholder='Apellido' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p style={{ color: design.info.textColor }}>Teléfono</p>
                      <input placeholder='Teléfono' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} className='p-2 text-sm border bg-white' />
                    </div>
                  </div>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col'>
                      <Script src="https://sdk.mercadopago.com/js/v2" onLoad={() => initMercadoPago()} />
                      <div id="cardPaymentBrick_container"></div>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col gap-4 w-2/5 p-6 h-fit`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', color: design.info.textColor, backgroundColor: design.info.image }}>
                  {
                    services.find(servi => servi._id === design.service?.service)?.name
                      ? ''
                      : <p>Seleccionar producto o servicio</p>
                  }
                  {
                    design.service && design.service.service !== ''
                      ? (
                        <>
                          <p className='font-medium text-lg'>{services.find(servi => servi._id === design.service?.service)?.name}</p>
                          <p>Tipo de pago: {services.find(servi => servi._id === design.service?.service)?.typePrice}</p>
                          <div className='border-t w-full' />
                          {
                            services.find(servi => servi._id === design.service?.service)?.typePay === 'El precio incluye el IVA'
                              ? services.find(servi => servi._id === design.service?.service)?.typeService === 'Servicio unico' && (services.find(servi => servi._id === design.service?.service)?.typePrice === 'Facturación mensual' || services.find(servi => servi._id === design.service?.service)?.typePrice === 'Pago unico')
                                ? (
                                  <>
                                    <div className='flex gap-2 justify-between'>
                                      <p>Subtotal:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 96.39)}</p>
                                    </div>
                                    <div className='flex gap-2 justify-between'>
                                      <p>IVA:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 22.61)}</p>
                                    </div>
                                    <div className='border-t w-full' />
                                    <div className='flex gap-2 justify-between'>
                                      <p className='font-medium'>Total:</p>
                                      <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price))}</p>
                                    </div>
                                  </>
                                )
                                : services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)
                                  ? (
                                    <>
                                      <div className='flex gap-2 justify-between'>
                                        <p>Subtotal:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 96.39)}</p>
                                      </div>
                                      <div className='flex gap-2 justify-between'>
                                        <p>IVA:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 22.61)}</p>
                                      </div>
                                      <div className='border-t w-full' />
                                      <div className='flex gap-2 justify-between'>
                                        <p className='font-medium'>Total:</p>
                                        <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price))}</p>
                                      </div>
                                    </>
                                  )
                                  : ''
                              : services.find(servi => servi._id === design.service?.service)?.typeService === 'Servicio unico' && (services.find(servi => servi._id === design.service?.service)?.typePrice === 'Facturación mensual' || services.find(servi => servi._id === design.service?.service)?.typePrice === 'Pago unico')
                                ? (
                                  <>
                                    <div className='flex gap-2 justify-between'>
                                      <p>Subtotal:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price))}</p>
                                    </div>
                                    <div className='flex gap-2 justify-between'>
                                      <p>IVA:</p>
                                      <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 19)}</p>
                                    </div>
                                    <div className='border-t w-full' />
                                    <div className='flex gap-2 justify-between'>
                                      <p className='font-medium'>Total:</p>
                                      <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.price) + Number(services.find(servi => servi._id === design.service?.service)?.price) / 100 * 19)}</p>
                                    </div>
                                  </>
                                )
                                : services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)
                                  ? (
                                    <>
                                      <div className='flex gap-2 justify-between'>
                                        <p>Subtotal:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price))}</p>
                                      </div>
                                      <div className='flex gap-2 justify-between'>
                                        <p>IVA:</p>
                                        <p>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 19)}</p>
                                      </div>
                                      <div className='border-t w-full' />
                                      <div className='flex gap-2 justify-between'>
                                        <p className='font-medium'>Total:</p>
                                        <p className='font-medium'>${NumberFormat(Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) + Number(services.find(servi => servi._id === design.service?.service)?.plans?.plans.find(plan => plan.name === design.service?.plan)?.price) / 100 * 19)}</p>
                                      </div>
                                    </>
                                  )
                                  : ''
                          }
                        </>
                      )
                      : ''
                  }
                </div>
              </>
            )
        }
      </div>
    </div>
  )
}
