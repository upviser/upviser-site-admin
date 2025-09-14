"use client"
import { Button, MessagesCategories, Spinner } from '@/components/ui'
import { IChatId, IChatMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { FaTag } from 'react-icons/fa'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/`, {
  transports: ['websocket']
})

export default function Page () {

  const [chatIds, setChatIds] = useState<IChatId[]>()
  const [chatIdsFilter, setChatIdsFilter] = useState<IChatId[]>()
  const [chatAgent, setChatAgent] = useState(false)
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [chatId, setChatId] = useState('')
  const [shopLogin, setShopLogin] = useState<any>()
  const [chatTags, setChatTags] = useState<any>()

  const chatIdRef = useRef(chatId)
  const messagesRef = useRef(messages)
  const containerRef = useRef<HTMLDivElement>(null)

  const getChats = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat`)
    setChatIds(response.data)
    const chatFilter = response.data.filter((chat: any) => chat.agent)
    setChatIdsFilter(chatFilter)
  }

  useEffect(() => {
    getChats()
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
    chatIdRef.current = chatId
  }, [chatId])

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
    socket.on('message', async (message) => {  
      if (chatIdRef.current === message.senderId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat/${message.senderId}`)
        setMessages(messagesRef.current.concat([{ senderId: message.senderId, message: message.message, agent: true, adminView: true, userView: true, createdAt: message.createdAt }]))
      }
      getChats()
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Mensajes</title>
      </Head>
       <div className='p-4 lg:p-6 w-full flex flex-col md:flex-row gap-6 overflow-y-auto h-full bg-bg dark:bg-neutral-900'>
          <div className='flex flex-col gap-6 w-full lg:w-1/2'>
            <div className='w-full flex flex-col gap-4 max-w-[1280px] mx-auto'>
              <h1 className='text-lg font-medium'>Mensajes</h1>
              <p className='p-2 border rounded-xl bg-white w-fit dark:border-neutral-700 dark:bg-neutral-800'>Agente IA: {shopLogin?.conversationsAI} conversaciones</p>
              <MessagesCategories />
            </div>
            <div className='w-full flex flex-col gap-2'>
              {
                chatIds === undefined
                  ? (
                    <div className='w-full flex mt-20'>
                      <div className='w-fit m-auto'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : chatIds.length
                    ? (
                      <>
                        <button className='flex gap-2' onClick={() => chatAgent ? setChatAgent(false) : setChatAgent(true)}>
                          <input type='checkbox' checked={chatAgent} />
                          <p>Incluir conversaciones con el agente IA</p>
                        </button>
                        {
                          chatAgent
                            ? chatIds?.map((chat, i: any) => {
                              const createdAt = new Date(chat.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chat.senderId}`)
                                  setMessages(response.data)
                                  setChatId(chat.senderId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chat.senderId}`)
                                  getChats()
                                }} key={i} className={`${chat.senderId === chatId ? 'bg-main text-white' : 'bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 hover:bg-neutral-200/40'} w-full border border-border transition-colors duration-150 text-left h-20 p-2 rounded-xl flex gap-4 justify-between dark:border-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <div className='flex gap-2'>
                                      <p className='my-auto'>{chat.senderId}</p>
                                      <p className={`px-2 py-1 rounded-lg text-white flex gap-2`} style={{ backgroundColor: chatTags.find((chatTag: any) => chatTag.tag === chat.tag)?.color }}><FaTag className='my-auto' />{chat.tag}</p>
                                    </div>
                                    <p>{chat.message}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    chat.adminView === false
                                      ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                                      : ''
                                  }
                                </button>
                              )
                            })
                            : chatIdsFilter?.map((chat, i: any) => {
                              const createdAt = new Date(chat.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chat.senderId}`)
                                  setMessages(response.data)
                                  setChatId(chat.senderId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chat.senderId}`)
                                  getChats()
                                }} key={i} className={`${chat.senderId === chatId ? 'bg-main text-white' : 'bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 hover:bg-neutral-200/40'} w-full border border-border transition-colors duration-150 text-left h-20 p-2 rounded-xl flex gap-4 justify-between dark:border-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <div className='flex gap-2'>
                                      <p className='my-auto'>{chat.senderId}</p>
                                      <p className={`px-2 py-1 rounded-lg text-white flex gap-2`} style={{ backgroundColor: chatTags.find((chatTag: any) => chatTag.tag === chat.tag)?.color }}><FaTag className='my-auto' />{chat.tag}</p>
                                    </div>
                                    <p>{chat.message}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    chat.adminView === false
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
                chatId
                  ? (
                    <div className='flex gap-4 border-b px-4 py-6'>
                      <p className='my-auto'>{chatId}</p>
                      <select onChange={async (e: any) => {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/chat-tag/${chatId}`, { tag: e.target.value })
                        getChats()
                      }} className='px-2 py-1 rounded-lg' style={{ backgroundColor: chatTags?.find((chatTag: any) => chatTag.tag === chatIds?.find(id => chatId === id.senderId)?.tag)?.color, color: '#ffffff' }} value={chatTags?.find((chatTag: any) => chatTag.tag === chatIds?.find(id => chatId === id.senderId)?.tag)?.tag}>
                        {
                          chatTags?.map((chatTag: any) => <option key={chatTag.tag}>{chatTag.tag}</option>)
                        }
                      </select>
                    </div>
                  )
                  : ''
              }
              <div ref={containerRef} className='w-full h-full flex flex-col p-4' style={{ overflow: 'overlay' }}>
                {
                  messages?.map(message => {
                    const createdAt = new Date(message.createdAt!)
                    return (
                      <div key={message._id} className='flex flex-col gap-2 mb-2'>
                        {
                          message.message
                            ? (
                              <div className='bg-neutral-200 p-1.5 rounded-lg w-fit text-black'>
                                <p>{message.message}</p>
                                <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          message.response
                            ? (
                              <div className='flex ml-4'>
                                <div className='bg-main flex flex-col text-white p-1.5 rounded-lg w-fit ml-auto'>
                                  <p>{message.response}</p>
                                  <p className='text-sm ml-auto dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                </div>
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
                setMessages(messages.concat({senderId: chatId, response: newMessage, agent: true, adminView: true, createdAt: new Date()}))
                const newMe = newMessage
                setNewMessage('')
                socket.emit('messageAdmin', { senderId: chatId, response: newMe, adminView: true })
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/create`, {senderId: chatId, response: newMe, agent: true, adminView: true})
                getChats()
              }} className='flex gap-2 p-4'>
                <input onChange={(e: any) => setNewMessage(e.target.value)} value={newMessage} type='text' placeholder='Escribe tu mensaje' className='border border-black/5 px-3 py-2 text-sm w-full rounded-xl dark:border-neutral-600 focus:outline-none focus:border-main focus:ring-1 focus:ring-main hover:border-main/80' />
                <Button type='submit'>Envíar</Button>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}