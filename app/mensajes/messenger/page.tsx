"use client"
import { Button, MessagesCategories, Spinner } from '@/components/ui'
import { IMessengerId, IMessengerMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

export default function Page () {

  const [messengerIds, setMessengerIds] = useState<IMessengerId[]>()
  const [messengerIdsFilter, setMessengerIdsFilter] = useState<IMessengerId[]>()
  const [messengerAgent, setMessengerAgent] = useState(false)
  const [messages, setMessages] = useState<IMessengerMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessengerId, setSelectedMessengerId] = useState('')
  const [shopLogin, setShopLogin] = useState<any>()

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedMessengerIdRef = useRef(selectedMessengerId)

  const getMessages = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messenger`)
    setMessengerIds(response.data)
    const messengerFilter = response.data.filter((messenger: any) => messenger.agent)
    setMessengerIdsFilter(messengerFilter)
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

  useEffect(() => {
    const interval = setInterval(getMessages, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    selectedMessengerIdRef.current = selectedMessengerId
  }, [selectedMessengerId])

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
    socket.on('messenger', async (message) => {
      if (selectedMessengerIdRef.current === message.messengerId) {
        setMessages(messagesRef.current.concat([{ messengerId: message.messengerId, message: message.message, agent: true, view: true, createdAt: new Date() }]))
      }
    })

    return () => {
      socket.off('messenger', message => console.log(message))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Mensajes</title>
      </Head>
        <div className='p-4 lg:p-6 w-full h-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='w-full max-w-[1280px] mx-auto flex flex-col gap-4'>
            <h1 className='text-lg font-medium'>Mensajes</h1>
            <p className='p-2 border rounded-xl bg-white w-fit dark:border-neutral-700 dark:bg-neutral-800'>Agente IA: {shopLogin?.conversationsAI} conversaciones</p>
            <MessagesCategories />
          </div>
          <div className='w-full max-w-[1280px] flex mx-auto gap-6 flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 flex flex-col gap-2'>
              {
                messengerIds === undefined
                  ? (
                    <div className='flex w-full mt-20'>
                      <div className='m-auto w-fit'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : messengerIds.length
                    ? (
                      <>
                        <button className='flex gap-2' onClick={() => messengerAgent ? setMessengerAgent(false) : setMessengerAgent(true)}>
                          <input type='checkbox' checked={messengerAgent} />
                          <p>Incluir conversaciones con el agente IA</p>
                        </button>
                        {
                          messengerAgent
                            ? messengerIds?.map(messenger => {
                              const createdAt = new Date(messenger.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messenger/${messenger.messengerId}`)
                                  setMessages(response.data)
                                  setSelectedMessengerId(messenger.messengerId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/messenger/${messenger.messengerId}`)
                                  getMessages()
                                }} key={messenger.messengerId} className={`${messenger.messengerId === selectedMessengerId ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} w-full text-left transition-colors duration-150 h-20 p-2 flex gap-2 justify-between rounded-xl hover:bg-neutral-200/40 dark:hover:bg-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{messenger.messengerId}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    messenger.view === false
                                      ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                                      : ''
                                  }
                                </button>
                              )
                            })
                            : messengerIdsFilter?.map(messenger => {
                              const createdAt = new Date(messenger.createdAt!)
                              return (
                                <button onClick={async () => {
                                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messenger/${messenger.messengerId}`)
                                  setMessages(response.data)
                                  setSelectedMessengerId(messenger.messengerId)
                                  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/messenger/${messenger.messengerId}`)
                                  getMessages()
                                }} key={messenger.messengerId} className={`${messenger.messengerId === selectedMessengerId ? 'bg-main/50' : 'bg-white dark:bg-neutral-700/60'} w-full text-left transition-colors duration-150 h-20 p-2 flex gap-2 justify-between rounded-xl hover:bg-neutral-200/40 dark:hover:bg-neutral-700`}>
                                  <div className='mt-auto mb-auto'>
                                    <p>{messenger.messengerId}</p>
                                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                  </div>
                                  {
                                    messenger.view === false
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
                <div ref={containerRef} className='w-full h-full pr-4 flex' style={{ overflow: 'overlay' }}>
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
                  setMessages(messages.concat({messengerId: selectedMessengerId, response: newMessage, agent: true, view: false, createdAt: new Date()}))
                  const newMe = newMessage
                  setNewMessage('')
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messenger`, {messengerId: selectedMessengerId, response: newMe, agent: true, view: true})
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