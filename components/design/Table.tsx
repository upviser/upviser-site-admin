"use client"
import { ICall, ICategoryPage, IDesign, IFunnel, IPage, IService } from '@/interfaces'
import React, { useState } from 'react'
import { Input, Select, Spinner } from '../ui'
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'

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

export const Table: React.FC<Props> = ({ edit, pages, setPages, design, index, ind, inde, indx, inx, inxx, funnels, setFunnels, calls, services, setServices, responsive, pageNeed, style }) => {
  
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
          edit === 'Tabla comparativa'
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
                            }} config='bg-transparent dark:border-neutral-10'>
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
                    <p className='font-medium m-auto'>Color tabla</p>
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
                <Select change={(e: any) => {
                  if (inde !== undefined) {
                    const oldFunnels = [...funnels!]
                    oldFunnels[inde].steps[ind].design![index].service = { service: e.target.value }
                    setFunnels(oldFunnels)
                  } else if (indx !== undefined) {
                    const oldServices = [...services!]
                    oldServices[indx].steps[ind].design![index].service = { service: e.target.value }
                    setServices(oldServices)
                  } else if (inx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inx].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  } else if (inxx !== undefined) {
                    const oldPages = [...pages]
                    oldPages[inxx].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  } else {
                    const oldPages = [...pages]
                    oldPages[ind].design[index].service = { service: e.target.value }
                    setPages(oldPages)
                  }
                }} config='w-fit m-auto bg-transparent dark:border-neutral-100' value={design.service?.service}>
                  <option value=''>Seleccionar servicio</option>
                  {
                    services?.map(service => <option key={service._id} value={service._id}>{service.name}</option>)
                  }
                </Select>
                {
                  services?.find(service => service._id === design.service?.service)?.plans?.plans.length
                    ? (
                      <div className={`overflow-x-auto w-full`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style.design === 'Borde' ? `1px solid ${style.borderColor}`: '', color: design.info.textColor, backgroundColor: design.info.image }}>
                        <table className='min-w-full table-auto rounded-xl'>
                          <thead>
                            <tr>
                              <th className='px-4 py-5 text-left font-medium'>Funcionalidades</th>
                              {
                                services?.find(service => service._id === design.service?.service)?.plans?.plans.map((plan, idx) => (
                                  <th key={plan._id} className='px-4 py-5 text-center font-medium'>{plan.name}</th>
                                ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {
                              services?.find(service => service._id === design.service?.service)?.plans?.functionalities.map((functionality, index) => (
                                <tr key={index}>
                                  <td className='p-4' style={{ borderTop: `1px solid ${style.borderColor}` }}>{functionality}</td>
                                  {
                                    services?.find(service => service._id === design.service?.service)?.plans?.plans.map((plan) => (
                                      <td key={plan._id} className={`p-4 text-center`} style={{ borderTop: `1px solid ${style.borderColor}` }}>
                                        {
                                          // Buscar si la funcionalidad existe en el plan
                                          plan.functionalities?.some(f => f.name === functionality)
                                            ? (
                                              // Si la funcionalidad existe, muestra el valor de la funcionalidad
                                              plan.functionalities?.find(f => f.name === functionality)?.value === 'Si' ? <FaCheck className='m-auto text-xl min-w-7' style={{ color: style.primary }} /> : plan.functionalities?.find(f => f.name === functionality)?.value
                                            ) 
                                            : '✘'
                                        }
                                      </td>
                                    ))
                                  }
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    )
                    : ''
                }
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
                  services?.find(service => service._id === design.service?.service)?.plans?.plans.length
                    ? (
                      <div className={`overflow-x-auto w-full`} style={{ boxShadow: style.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: `1px solid ${style.borderColor}`, color: design.info.textColor, backgroundColor: design.info.image }}>
                        <table className='min-w-full table-auto rounded-xl'>
                          <thead>
                            <tr>
                              <th className='px-4 py-5 text-left font-medium'>Funcionalidades</th>
                              {
                                services?.find(service => service._id === design.service?.service)?.plans?.plans.map((plan, idx) => (
                                  <th key={plan._id} className='px-4 py-5 text-center font-medium'>{plan.name}</th>
                                ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {
                              services?.find(service => service._id === design.service?.service)?.plans?.functionalities.map((functionality, index) => (
                                <tr key={index}>
                                  <td className='p-4' style={{ borderTop: `1px solid ${style.borderColor}` }}>{functionality}</td>
                                  {
                                    services?.find(service => service._id === design.service?.service)?.plans?.plans.map((plan) => (
                                      <td key={plan._id} className={` p-4 text-center`} style={{ borderTop: `1px solid ${style.borderColor}` }}>
                                        {
                                          // Buscar si la funcionalidad existe en el plan
                                          plan.functionalities?.some(f => f.name === functionality)
                                            ? (
                                              // Si la funcionalidad existe, muestra el valor de la funcionalidad
                                              plan.functionalities?.find(f => f.name === functionality)?.value === 'Si' ? <FaCheck className='m-auto text-xl min-w-7' style={{ color: style.primary }} /> : plan.functionalities?.find(f => f.name === functionality)?.value
                                            ) 
                                            : '✘'
                                        }
                                      </td>
                                    ))
                                  }
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
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
