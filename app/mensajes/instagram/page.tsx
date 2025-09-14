"use client"
import { Button, MessagesCategories, Spinner } from '@/components/ui'
import { IInstagramId, IInstagramMessage } from '@/interfaces/'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { FaTag } from 'react-icons/fa'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

export default function Page () {
  
  const [instagramIds, setInstagramIds] = useState<IInstagramId[]>()
  const [instagramIdsFilter, setInstagramIdsFilter] = useState<IInstagramId[]>()
  const [instagramAgent, setInstagramAgent] = useState(false)
  const [messages, setMessages] = useState<IInstagramMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedInstagramId, setSelectedInstagramId] = useState('')
  const [shopLogin, setShopLogin] = useState<any>()
  const [chatTags, setChatTags] = useState<any>()

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedInstagramIdRef = useRef(selectedInstagramId)

  const getMessages = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/instagram`)
    setInstagramIds(response.data)
    const instagramFilter = response.data.filter((instagram: any) => instagram.agent)
    setInstagramIdsFilter(instagramFilter)
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

  const getChatTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat-tags`)
    setChatTags(res.data)
  }

  useEffect(() => {
    getChatTags()
  }, [])

  useEffect(() => {
    const interval = setInterval(getMessages, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    selectedInstagramIdRef.current = selectedInstagramId
  }, [selectedInstagramId])

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
    socket.on('instagram', async (message) => {
      if (selectedInstagramIdRef.current === message.instagramId) {
        setMessages(messagesRef.current.concat([{ instagramId: message.instagramId, message: message.message, agent: true, view: true, createdAt: new Date() }]))
      }
    })

    return () => {
      socket.off('instagram', message => console.log(message))
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>Mensajes</title>
      </Head>
        <div className='p-4 lg:p-6 w-full flex flex-col md:flex-row gap-6 h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='flex flex-col gap-2 w-full lg:w-1/2'>
            <div className='w-full max-w-[1280px] mx-auto flex flex-col gap-4'>
              <h1 className='text-lg font-medium'>Mensajes</h1>
              <p className='p-2 border rounded-xl bg-white w-fit dark:border-neutral-700 dark:bg-neutral-800'>Agente IA: {shopLogin?.conversationsAI} conversaciones</p>
              <MessagesCategories />
            </div>
            <div className='w-full flex flex-col gap-2'>
              {
                instagramIds === undefined
                  ? (
                    <div className='mt-20 flex w-full'>
                      <div className='m-auto w-fit'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : instagramIds.length
                    ? (
                      <>
                        <button className='flex gap-2' onClick={() => instagramAgent ? setInstagramAgent(false) : setInstagramAgent(true)}>
                          <input type='checkbox' checked={instagramAgent} />
                          <p>Incluir conversaciones con el agente IA</p>
                        </button>
                        {
                          instagramAgent
                            ? instagramIds?.map(instagram => {
                              const createdAt = new Date(instagram.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/instagram/${instagram.instagramId}`)
                                  setMessages(response.data)
                                  setSelectedInstagramId(instagram.instagramId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/instagram/${instagram.instagramId}`)
                                  getMessages()
                                }} key={instagram.instagramId} className={`${instagram.instagramId === selectedInstagramId ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} w-full text-left border border-border transition-colors duration-150 flex gap-2 justify-between h-20 p-2 rounded-xl hover:bg-neutral-200/40 dark:hover:bg-neutral-700 dark:border-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{instagram.instagramId}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    instagram.view === false
                                      ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                                      : ''
                                  }
                                </button>
                              )
                            })
                            : instagramIdsFilter?.map(instagram => {
                              const createdAt = new Date(instagram.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/instagram/${instagram.instagramId}`)
                                  setMessages(response.data)
                                  setSelectedInstagramId(instagram.instagramId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/instagram/${instagram.instagramId}`)
                                  getMessages()
                                }} key={instagram.instagramId} className={`${instagram.instagramId === selectedInstagramId ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} w-full text-left transition-colors duration-150 border border-border flex gap-2 justify-between h-20 p-2 rounded-xl hover:bg-neutral-200/40 dark:hover:bg-neutral-700 dark:border-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <div className='flex gap-2'>
                                      <p className='my-auto'>{instagram.instagramId}</p>
                                      <p className={`px-2 py-1 rounded-lg text-white flex gap-2`} style={{ backgroundColor: chatTags.find((chatTag: any) => chatTag.tag === instagram.tag)?.color }}><FaTag className='my-auto' />{instagram.tag}</p>
                                    </div>
                                    <p>{instagram.message}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    instagram.view === false
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
          </div>
          <div className='w-full lg:w-1/2'>
            <div className='bg-white flex flex-col justify-between border border-black/5 rounded-xl w-full h-[60vh] md:h-full dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
              {
                selectedInstagramId
                  ? (
                    <div className='flex gap-4 border-b px-4 py-6'>
                      <p className='my-auto'>{selectedInstagramId}</p>
                      <select onChange={async (e: any) => {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/instagram-tag/${selectedInstagramId}`, { tag: e.target.value })
                        getMessages()
                      }} className='px-2 py-1 rounded-lg' style={{ backgroundColor: chatTags?.find((chatTag: any) => chatTag.tag === instagramIds?.find(instagramId => selectedInstagramId === instagramId.instagramId)?.tag)?.color, color: '#ffffff' }} value={chatTags?.find((chatTag: any) => chatTag.tag === instagramIds?.find(instagramId => selectedInstagramId === instagramId.instagramId)?.tag)?.tag}>
                        {
                          chatTags?.map((chatTag: any) => <option key={chatTag.tag}>{chatTag.tag}</option>)
                        }
                      </select>
                    </div>
                  )
                  : ''
              }
              <div ref={containerRef} className='w-full h-full p-4 flex flex-col' style={{ overflow: 'overlay' }}>
                {
                  messages?.map(message => {
                    const createdAt = new Date(message.createdAt!)
                    return (
                      <div key={message._id} className='flex flex-col gap-2 mb-2 w-full'>
                        {
                          message.message
                            ? (
                              <div className='bg-neutral-200 flex flex-col p-1.5 rounded-lg w-fit text-black'>
                                <p>{message.message}</p>
                                <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          message.response
                            ? (
                              <div className='bg-main flex flex-col text-white p-1.5 rounded-lg w-fit ml-auto'>
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
                setMessages(messages.concat({instagramId: selectedInstagramId, response: newMessage, agent: true, view: false, createdAt: new Date()}))
                const newMe = newMessage
                setNewMessage('')
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/instagram`, {instagramId: selectedInstagramId, response: newMe, agent: true, view: true})
                getMessages()
              }} className='flex gap-2 p-4'>
                <input onChange={(e: any) => setNewMessage(e.target.value)} value={newMessage} type='text' placeholder='Escribe tu mensaje' className='border border-black/5 px-3 py-2 text-sm w-full rounded-xl dark:border-neutral-600 focus:outline-none focus:border-main focus:ring-1 focus:ring-main hover:border-main/80' />
                <Button type='submit'>Enviar</Button>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}