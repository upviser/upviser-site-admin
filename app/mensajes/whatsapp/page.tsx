"use client"
import { Button, ButtonRed, ButtonSecondary, Input, MessagesCategories, Popup, Select, Spinner, Spinner2, Textarea } from '@/components/ui'
import { IWhatsappId, IWhatsappMessage, IWhatsappTemplate } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

export default function Page () {

  const [phones, setPhones] = useState<IWhatsappId[]>()
  const [phonesFilter, setPhonesFilter] = useState<IWhatsappId[]>([])
  const [phonesAgent, setPhonesAgent] = useState(false)
  const [messages, setMessages] = useState<IWhatsappMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedPhone, setSelectedPhone] = useState('')
  const [shopLogin, setShopLogin] = useState<any>()
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popup2, setPopup2] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popup3, setPopup3] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [template, setTemplate] = useState<IWhatsappTemplate>({ name: '', category: '', components: [{ "type": "BODY" }] })
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [loadingDelete, setLoadingDelete] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedPhoneRef = useRef(selectedPhone)

  const getMessages = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp`)
    setPhones(response.data)
    const phones = response.data.filter((phone: any) => phone.agent)
    setPhonesFilter(phones)
  }
  
  useEffect(() => {
    getMessages()
  }, [])

  const getShopLogin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`)
    setShopLogin(res.data)
  }

  useEffect(() => {
    getShopLogin()
  }, [])

  const getTemplates = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp-templates`)
    setTemplates(res.data.data)
  }

  useEffect(() => {
    getTemplates()
  }, [])

  useEffect(() => {
    const interval = setInterval(getMessages, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    selectedPhoneRef.current = selectedPhone
  }, [selectedPhone])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  useEffect(() => {
    socket.on('whatsapp', async (message) => {
      if (selectedPhoneRef.current === message.phone) {
        setMessages(messagesRef.current.concat([{ phone: message.phone, message: message.message, agent: true, view: true, createdAt: new Date() }]))
      }
    })

    return () => {
      socket.off('whatsapp', message => console.log(message))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Mensajes</title>
      </Head>
        <Popup popup={popup3} setPopup={setPopup3}>
          <p className='font-medium'>¿Seguro que quieres eliminar la plantilla {template.name}?</p>
          <div className='flex gap-2'>
            <ButtonRed action={async () => {
              if (!loadingDelete) {
                setLoadingDelete(true)
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp-template/${template.name}`)
                getTemplates()
                setPopup3({ ...popup2, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup3({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
                setLoadingDelete(false)
              }
            }} config='w-24'>{loadingDelete ? <Spinner2 /> : 'Eliminar'}</ButtonRed>
            <button onClick={() => {
              setPopup3({ ...popup2, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup3({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }}>Cancelar</button>
          </div>
        </Popup>
        <Popup popup={popup2} setPopup={setPopup2}>
          <p className='font-medium'>Plantillas</p>
          {
            templates?.map((temp: any) => (
              <div key={temp.name} className='flex gap-2'>
                <button onClick={() => {
                  setTemplate(temp)
                  setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup2({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                  }, 10)
                }} className='border w-full bg-gray-50 flex gap-2 justify-between p-2 rounded-xl hover:bg-neutral-100 transition-colors duration-100 dark:hover:bg-neutral-600 dark:bg-neutral-700 dark:border-neutral-600'>
                  <div className='flex flex-col gap-1 text-left'>
                    <p>Nombre: {temp.name}</p>
                    <p>Categoria: {temp.category}</p>
                    <p>Estatus: {temp.status}</p>
                  </div>
                </button>
                <button onClick={() => {
                  setTemplate(temp)
                  setPopup2({ ...popup2, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup2({ ...popup2, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                  setPopup3({ ...popup3, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup3({ ...popup3, view: 'flex', opacity: 'opacity-1' })
                  }, 10)
                }} className='h-fit my-auto'>X</button>
              </div>
            ))
          }
        </Popup>
        <Popup popup={popup} setPopup={setPopup}>
          <p className='font-medium'>{template.id ? 'Editar' : 'Crear'} plantilla</p>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Nombre de la plantilla</p>
            <Input change={(e: any) => setTemplate({ ...template, name: e.target.value })} value={template.name} placeholder='Nombre de la platilla' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Categoria de la plantilla</p>
            <Select change={(e: any) => setTemplate({ ...template, category: e.target.value })} value={template.category}>
              <option value='AUTHENTICATION'>Autenticación</option>
              <option value='MARKETING'>Marketing</option>
              <option value='UTILITY'>Utilidad</option>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <p>Mensajes de la plantilla</p>
            {
              template.components.map((component, index) => (
                <>
                  <div className='flex gap-2 justify-between'>
                    <p className='text-sm'>Mensaje {index + 1}</p>
                    <button onClick={() => {
                      const oldComponents = [...template.components]
                      oldComponents.splice(index, 1)
                      setTemplate({ ...template, components: oldComponents })
                    }}>X</button>
                  </div>
                  <p className='text-sm'>Tipo</p>
                  <Select change={(e: any) => {
                    const oldComponents = [...template.components]
                    if (e.target.value === 'HEADER') {
                      oldComponents[index] = { type: e.target.value, format: 'TEXT', text: '', example: { header_text: [] } }
                    } else if (e.target.value === 'BODY') {
                      oldComponents[index] = { type: e.target.value, text: '', example: { body_text: [[]] } }
                    } else if (e.target.value === 'FOOTER') {
                      oldComponents[index] = { type: e.target.value, text: '' }
                    } else if (e.target.value === 'BUTTONS') {
                      oldComponents[index] = { type: e.target.value, buttons: [{ type: 'QUICK_REPLY', text: '' }] }
                    }
                    setTemplate({ ...template, components: oldComponents })
                  }} value={component.type}>
                    <option value='HEADER'>Cabecera</option>
                    <option value='BODY'>Cuerpo</option>
                    <option value='FOOTER'>Pie de página</option>
                    <option value='BUTTONS'>Botones</option>
                  </Select>
                  {
                    component.type === 'HEADER'
                      ? (
                        <>
                          <p className='text-sm'>Formato</p>
                          <Select change={(e: any) => {
                            const oldComponents = [...template.components]
                            oldComponents[index].format = e.target.value
                            setTemplate({ ...template, components: oldComponents })
                          }} value={component.format}>
                            <option value='TEXT'>Texto</option>
                          </Select>
                        </>
                      )
                      : ''
                  }
                  {
                    ((component.type === 'HEADER' && component.format === 'TEXT') || component.type === 'BODY' || component.type === 'FOOTER')
                      ? (
                        <>
                          <p className='text-sm'>Texto</p>
                          <Textarea change={(e: any) => {
                            const oldComponents = [...template.components]
                            oldComponents[index].text = e.target.value
                            const matches = e.target.value.match(/{{\s*\d+\s*}}/g) || [];
                            const count = matches.length;
                            if (component.type === 'HEADER') {
                              oldComponents[index].example = {
                                header_text: Array(count).fill('')
                              };
                            } else if (component.type === 'BODY') {
                              oldComponents[index].example = {
                                body_text: [
                                  Array(count).fill('')
                                ]
                              }
                            }
                            setTemplate({ ...template, components: oldComponents })
                          }} value={component.text!} placeholder='Texto' config='h-24' />
                          {
                            component.type === 'HEADER' && component.example?.header_text?.length
                              ? (
                                <>
                                  <p className='text-sm'>Variables de ejemplo</p>
                                  {
                                    component.example?.header_text.map((header, i) => (
                                      <div key={header} className='flex gap-2'>
                                        <p className='text-sm'>Variable {i + 1}</p>
                                        <Input change={(e: any) => {
                                          const oldComponents = [...template.components]
                                          oldComponents[index].example!.header_text![i] = e.target.value
                                          setTemplate({ ...template, components: oldComponents })
                                        }} value={header} placeholder={`Variable ${i + 1}`} />
                                      </div>
                                    ))
                                  }
                                </>
                              )
                              : ''
                          }
                          {
                            component.type === 'BODY' && component.example?.body_text?.length && component.example?.body_text[0].length
                              ? (
                                <>
                                  <p className='text-sm'>Variables de ejemplo</p>
                                  {
                                    component.example?.body_text[0].map((body, i) => (
                                      <div key={body} className='flex gap-2'>
                                        <p className='text-sm'>Variable {i + 1}</p>
                                        <Input change={(e: any) => {
                                          const oldComponents = [...template.components]
                                          oldComponents[index].example!.body_text![0][i] = e.target.value
                                          setTemplate({ ...template, components: oldComponents })
                                        }} value={body} placeholder={`Variable ${i + 1}`} />
                                      </div>
                                    ))
                                  }
                                </>
                              )
                              : ''
                          }
                        </>
                      )
                      : ''
                  }
                  {
                    component.type === 'BUTTONS'
                      ? (
                        <>
                          <p className='text-sm'>Botones</p>
                          {
                            component.buttons?.map((button, i) => (
                              <>
                                <p className='text-sm'>Tipo</p>
                                <Select change={(e: any) => {
                                  const oldComponents = [...template.components]
                                  oldComponents[index].buttons![i].type = e.target.value
                                  setTemplate({ ...template, components: oldComponents })
                                }} value={button.type}>
                                  <option value='QUICK_REPLY'>Repuesta rapida</option>
                                  <option value='PHONE_NUMBER'>Número de teléfono</option>
                                  <option>URL</option>
                                </Select>
                                <p className='text-sm'>Texto</p>
                                <Input change={(e: any) => {
                                  const oldComponents = [...template.components]
                                  oldComponents[index].buttons![i].text = e.target.value
                                  setTemplate({ ...template, components: oldComponents })
                                }} value={button.type} placeholder='Texto' />
                                {
                                  button.type === 'PHONE_NUMBER'
                                    ? (
                                      <>
                                        <p className='text-sm'>Número de teléfono</p>
                                        <Input change={(e: any) => {
                                          const oldComponents = [...template.components]
                                          oldComponents[index].buttons![i].phone_number = e.target.value
                                          setTemplate({ ...template, components: oldComponents })
                                        }} value={button.type} placeholder='Número de teléfono' />
                                      </>
                                    )
                                    : ''
                                }
                                {
                                  button.type === 'URL'
                                    ? (
                                      <>
                                        <p className='text-sm'>URL</p>
                                        <Input change={(e: any) => {
                                          const oldComponents = [...template.components]
                                          oldComponents[index].buttons![i].url = e.target.value
                                          setTemplate({ ...template, components: oldComponents })
                                        }} value={button.type} placeholder='URL' />
                                      </>
                                    )
                                    : ''
                                }
                              </>
                            ))
                          }
                        </>
                      )
                      : ''
                  }
                </>
              ))
            }
            <ButtonSecondary action={() => {
              const oldComponents = [...template.components]
              oldComponents.push({ "type": "BODY", "text": "" })
              setTemplate({ ...template, components: oldComponents })
            }}>Agregar mensaje</ButtonSecondary>
          </div>
          <Button action={async () => {
            if (!loading) {
              setLoading(true)
              if (template.id) {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/edit-template`, template)
                getTemplates()
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp-template`, template)
                getTemplates()
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
              setLoading(false)
            }
          }} loading={loading} config='w-full'>{template.id ? 'Editar' : 'Crear'} plantilla</Button>
        </Popup>
        <div className='p-4 lg:p-6 w-full h-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='w-full max-w-[1280px] mx-auto flex flex-col gap-4'>
            <h1 className='text-lg font-medium'>Mensajes</h1>
            <p className='p-2 border rounded-xl bg-white w-fit dark:border-neutral-700 dark:bg-neutral-800'>Agente IA: {shopLogin?.conversationsAI} conversaciones</p>
            <MessagesCategories />
          </div>
          <div className='w-full max-w-[1280px] flex mx-auto gap-6 flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 flex flex-col gap-2'>
              {
                phones === undefined
                  ? (
                    <div className='flex w-full mt-20'>
                      <div className='w-fit m-auto'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : phones.length
                    ? (
                      <>
                        <button className='flex gap-2' onClick={() => phonesAgent ? setPhonesAgent(false) : setPhonesAgent(true)}>
                          <input type='checkbox' checked={phonesAgent} />
                          <p>Incluir conversaciones con el agente IA</p>
                        </button>
                        {
                          phonesAgent
                            ? phones?.map(phone => {
                              const createdAt = new Date(phone.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/${phone.phone}`)
                                  setMessages(response.data)
                                  setSelectedPhone(phone.phone)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/${phone.phone}`)
                                  getMessages()
                                }} key={phone.phone} className={`${phone.phone === selectedPhone ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} bg-white w-full flex gap-2 transition-colors duration-150 justify-between text-left h-20 p-2 rounded-xl dark:bg-neutral-700/60 hover:bg-neutral-200/40 dark:hover:bg-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{phone.phone}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    phone.view === false
                                      ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                                      : ''
                                  }
                                </button>
                              )
                            })
                            : phonesFilter?.map(phone => {
                              const createdAt = new Date(phone.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/${phone.phone}`)
                                  setMessages(response.data)
                                  setSelectedPhone(phone.phone)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp/${phone.phone}`)
                                  getMessages()
                                }} key={phone.phone} className={`${phone.phone === selectedPhone ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} bg-white w-full flex gap-2 transition-colors duration-150 justify-between text-left h-20 p-2 rounded-xl dark:bg-neutral-700/60 hover:bg-neutral-200/40 dark:hover:bg-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{phone.phone}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    phone.view === false
                                      ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                                      : ''
                                  }
                                </button>
                              )
                          })
                        }
                      </>
                    )
                    : <p className='text-sm'>No hay chats</p>
              }
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='bg-white pt-4 pb-4 pl-4 flex flex-col gap-4 justify-between border border-black/5 rounded-xl w-full h-[70vh] dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
                <div ref={containerRef} className='w-full h-full pr-4 flex flex-col' style={{ overflow: 'overlay' }}>
                  {
                    messages?.map(message => {
                      const createdAt = new Date(message.createdAt!)
                      return (
                        <div key={message._id} className='flex flex-col gap-2 mb-2 w-full'>
                          {
                            message.message
                              ? (
                                <div className='bg-neutral-200 flex flex-col p-1.5 rounded-md w-fit text-black'>
                                  <p>{message.message}</p>
                                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                </div>
                              )
                              : ''
                          }
                          {
                            message.response
                              ? (
                                <div className='bg-main flex flex-col text-white p-1.5 rounded-md w-fit ml-auto'>
                                  <p>{message.response}</p>
                                  <p className='text-sm ml-auto dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                </div>
                              )
                              : ''
                          }
                        </div>
                      )
                    })
                  }
                  {
                    messages.length
                      ? ''
                      : <p className='m-auto text-black/60 dark:text-white'>Selecciona un chat</p>
                  }
                </div>
                <form onSubmit={async (e: any) => {
                  e.preventDefault()
                  setMessages(messages.concat({phone: selectedPhone, response: newMessage, agent: true, view: false, createdAt: new Date()}))
                  const newMe = newMessage
                  setNewMessage('')
                  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp`, {phone: selectedPhone, response: newMe, agent: true, view: false})
                  getMessages()
                }} className='flex gap-2 pr-4'>
                  <input onChange={(e: any) => setNewMessage(e.target.value)} value={newMessage} type='text' placeholder='Escribe tu mensaje' className='border border-black/5 px-3 py-2 text-sm w-full rounded-xl dark:border-neutral-600 focus:outline-none focus:border-main focus:ring-1 focus:ring-main hover:border-main/80' />
                  <Button type='submit'>Enviar</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}