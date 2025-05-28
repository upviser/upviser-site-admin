import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Button2, ButtonSubmit2, Input, Select, Spinner2 } from '../ui'
import { IClientData, IForm, IFunnel, ITag } from '@/interfaces'
import { IoMdClose } from 'react-icons/io'

interface Props {
  popupForm: { view: string, opacity: string, mouse: boolean }
  setPopupForm: any
  titleForm: string
  newForm: IForm
  setNewForm: any
  getForms: any
  tags: ITag[]
  funnels: IFunnel[]
  getTags: any
  error: string
  setError: any
  newData: string
  setNewData: any
  loadingNewData: boolean
  setLoadingNewData: any
  clientData: IClientData[]
  getClientData: any
  style?: any
}

export const PopupNewForm: React.FC<Props> = ({ popupForm, setPopupForm, titleForm, newForm, setNewForm, getForms, tags, funnels, getTags, error, setError, newData, setNewData, loadingNewData, setLoadingNewData, clientData, getClientData, style }) => {

  const [loadingNewForm, setLoadingNewForm] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [loadingTag, setLoadingTag] = useState(false)

  const popupRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupForm.view === 'flex') {
        setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupForm({ ...popupForm, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupForm, setPopupForm]);

  return (
    <div className={`${popupForm.view} ${popupForm.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loadingNewForm) {
            setLoadingNewForm(true)
            if (titleForm === 'Nuevo formulario') {
              if (newForm.nameForm !== '') {
                console.log(newForm)
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/form`, newForm)
                getForms()
                setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupForm({ ...popupForm, view: 'hidden', opacity: 'opacity-0' })
                  setLoadingNewForm(false)
                }, 200)
              } else {
                setError('Debes llenar todos los datos')
                setLoadingNewForm(false)
              }
            } else {
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/form/${newForm._id}`, newForm)
              getForms()
              setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupForm({ ...popupForm, view: 'hidden', opacity: 'opacity-0' })
                setLoadingNewForm(false)
              }, 200)
            }
          }
        }} onMouseEnter={() => setPopupForm({ ...popupForm, mouse: true })} onMouseMove={() => setPopupForm({ ...popupForm, mouse: true })} onMouseLeave={() => setPopupForm({ ...popupForm, mouse: false })} className={`${popupForm.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 rounded-xl m-auto border border-black/50 flex flex-col gap-4 border-white bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{ error }</p>
              : ''
          }
          <p className="text-lg font-medium">{titleForm}</p>
          <div className="flex flex-col gap-2">
            <p>Nombre del formulario</p>
            <Input change={(e: any) => setNewForm({ ...newForm, nameForm: e.target.value })} placeholder='Nombre' value={newForm.nameForm} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Titulo</p>
            <Input change={(e: any) => setNewForm({ ...newForm, title: e.target.value })} placeholder='Titulo' value={newForm.title} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Información</p>
            {
              newForm.informations.map((information, i) => (
                <>
                  <p>Información {i + 1}</p>
                  <p>Icono</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      const oldInformations = [...newForm.informations]
                      oldInformations[i].icon = `<svg style="width: 35px; height: 35px; color: ${style.primary}; margin-top: auto; margin-bottom: auto;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 flex-shrink-0 text-[${style.primary}]"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"></path></svg>`
                      setNewForm({ ...newForm, informations: oldInformations })
                    }} className={`p-2 rounded border ${information.icon === `<svg style="width: 35px; height: 35px; color: ${style.primary}; margin-top: auto; margin-bottom: auto;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 flex-shrink-0 text-[${style.primary}]"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"></path></svg>` ? `border-main` : `hover:border-main`} transition-colors duration-150`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 flex-shrink-0 text-main"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"></path></svg></button>
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      const oldInformations = [...newForm.informations]
                      oldInformations[i].icon = `<svg style="width: 35px; height: 35px; color: ${style.primary}; margin-top: auto; margin-bottom: auto;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 text-[${style.primary}] flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path></svg>`
                      setNewForm({ ...newForm, informations: oldInformations })
                    }} className={`p-2 rounded border ${information.icon === `<svg style="width: 35px; height: 35px; color: ${style.primary}; margin-top: auto; margin-bottom: auto;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 text-[${style.primary}] flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path></svg>` ? 'border-main' : 'hover:border-main'} transition-colors duration-150`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="my-auto h-7 w-7 text-main flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path></svg></button>
                  </div>
                  <p>Texto</p>
                  <Input change={(e: any) => {
                    const oldInformations = [...newForm.informations]
                    oldInformations[i].text = e.target.value
                    setNewForm({ ...newForm, informations: oldInformations })
                  }} placeholder={`Información ${i + 1}`} value={information.text} />
                  <p>Sub Texto</p>
                  <Input change={(e: any) => {
                    const oldInformations = [...newForm.informations]
                    oldInformations[i].subText = e.target.value
                    setNewForm({ ...newForm, informations: oldInformations })
                  }} placeholder={`Información ${i + 1}`} value={information.subText} />
                </>
              ))
            }
            <Button2 action={(e: any) => {
              e.preventDefault()
              const oldInformations = [...newForm.informations]
              oldInformations.push({ icon: '', text: '' })
              setNewForm({ ...newForm, informations: oldInformations })
            }}>Crear información</Button2>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Datos</p>
            {
              newForm.labels.map((label, i) => (
                <>
                  <p>Dato {i + 1}</p>
                  <Input change={(e: any) => {
                    const oldLabels = [...newForm.labels]
                    oldLabels[i].text = e.target.value
                    setNewForm({ ...newForm, labels: oldLabels })
                  }} value={label.text} placeholder='Texto campo'/>
                  <Select value={label.data} change={(e: any) => {
                    const oldLabels = [...newForm.labels]
                    oldLabels[i].data = e.target.value
                    oldLabels[i].name = clientData.find(dat => dat.data === e.target.value)!.name
                    setNewForm({ ...newForm, labels: oldLabels })
                  }}>
                    <option value=''>Seleccionar dato</option>
                    {
                      clientData.length
                        ? clientData.map(data => (
                          <option key={data.data} value={data.data}>{data.name}</option>
                        ))
                        : ''
                    }
                  </Select>
                  <Select value={label.type} change={(e: any) => {
                    const oldLabels = [...newForm.labels]
                    oldLabels[i].type = e.target.value
                    oldLabels[i].datas = ['']
                    setNewForm({ ...newForm, labels: oldLabels })
                  }}>
                    <option value=''>Seleccionar tipo de respuesta</option>
                    <option>Texto</option>
                    <option>Selector</option>
                  </Select>
                  {
                    label.type === 'Selector'
                      ? (
                        <>
                          {
                            label.datas?.map((data, index) => (
                              <div key={data} className='flex gap-2'>
                                <Input change={(e: any) => {
                                  e.preventDefault()
                                  const oldLabels = [...newForm.labels]
                                  oldLabels![i].datas![index] =e.target.value
                                  setNewForm({ ...newForm, labels: oldLabels })
                                }} placeholder={`Respuesta ${i + 1}`} />
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  const oldLabels = [...newForm.labels]
                                  oldLabels![i].datas?.splice(index, 1)
                                  setNewForm({ ...newForm, labels: oldLabels })
                                }}><IoMdClose className='text-2xl' /></button>
                              </div>
                            ))
                          }
                          <Button2 action={(e: any) => {
                            e.preventDefault()
                            const oldLabels = [...newForm.labels]
                            oldLabels[i].datas?.push('')
                            setNewForm({ ...newForm, labels: oldLabels })
                          }}>Agregar </Button2>
                        </>
                      )
                      : ''
                  }
                </>
              ))
            }
            <Button2 action={(e: any) => {
              e.preventDefault()
              const oldLabels = [...newForm.labels]
              oldLabels.push({ data: '', name: '', text: '', type: '' })
              setNewForm({ ...newForm, labels: oldLabels })
            }}>Agregar campo</Button2>
            <div className='flex flex-col gap-2'>
              <p>Crear dato personalizado</p>
              <div className='flex gap-2'>
                <Input change={(e: any) => setNewData(e.target.value)} value={newData} placeholder='Nuevo dato' />
                <ButtonSubmit2 color='main' action={async (e: any) => {
                  e.preventDefault()
                  if (!loadingNewData) {
                    setLoadingNewData(true)
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-data`, { data: newData })
                    setNewData('')
                    getClientData()
                    setLoadingNewData(false)
                  }
                }} submitLoading={loadingNewData} textButton='Crear dato' config='w-36' />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Boton</p>
            <Input change={(e: any) => setNewForm({ ...newForm, button: e.target.value })} placeholder='Boton' value={newForm.button} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Tags</p>
            {
              tags.length
                ? (
                  <div className="flex gap-2 flex-wrap">
                    {
                      tags.map((tag, index) => (
                        <div key={tag._id} className="flex gap-1">
                          <input onClick={(e: any) => {
                            if (e.target.checked) {
                              const oldTags = [...newForm.tags!]
                              oldTags.push(tag.tag)
                              setNewForm({ ...newForm, tags: oldTags })
                            } else {
                              const oldTags = newForm.tags!.filter(tg => tg !== tag.tag)
                              setNewForm({ ...newForm, tags: oldTags })
                            }
                          }} type="checkbox" checked={newForm.tags?.includes(tag.tag)} />
                          <p>{tag.tag}</p>
                        </div>
                      ))
                    }
                  </div>
                )
                : <p>No tienes tags creados</p>
            }
            <p>Nuevo tag</p>
            <div className='flex gap-2'>
              <Input placeholder='Nuevo tag' change={(e: any) => setNewTag(e.target.value)} />
              <ButtonSubmit2 submitLoading={loadingTag} textButton='Crear tag' action={async (e: any) => {
                e.preventDefault()
                if (!loadingTag) {
                  setLoadingTag(true)
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newTag })
                  getTags()
                  setNewTag('')
                  setLoadingTag(false)
                }
              }} color='main' config='w-32' />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Acción al enviar el formulario</p>
            <Select value={newForm.action} change={(e: any) => setNewForm({ ...newForm, action: e.target.value })}>
              <option>Ir a una pagina</option>
              <option>Mostrar mensaje</option>
            </Select>
          </div>
          {
            newForm.action === 'Ir a una pagina'
              ? (
                <div className="flex flex-col gap-2">
                  <p>¿A que pagina se redirigira?</p>
                  <Select value={newForm.redirect} change={(e: any) => setNewForm({ ...newForm, redirect: e.target.value })}>
                    <option value=''>Seleccionar pagina</option>
                    {
                      funnels.map(funnel => (
                        <>
                          {
                            funnel.steps.map(step => (
                              <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>
                            ))
                          }
                        </>
                      ))
                    }
                  </Select>
                </div>
              )
              : (
                <div className="flex flex-col gap-2">
                  <p>Mensaje</p>
                  <Input change={(e: any) => setNewForm({ ...newForm, message: e.target.value })} placeholder='Mensaje' value={newForm.message} />
                </div>
              )
          }
          <Button type='submit' loading={loadingNewForm} config='min-h-10 w-full'>{titleForm === 'Nuevo formulario' ? 'Crear formulario' : 'Editar formulario'}</Button>
        </form>
      </div>
  )
}
