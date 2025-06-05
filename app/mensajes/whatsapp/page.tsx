"use client"
import { Button, MessagesCategories, Spinner } from '@/components/ui'
import { IWhatsappId, IWhatsappMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

export default function Page () {

  const [phones, setPhones] = useState<IWhatsappId[]>()
  const [messages, setMessages] = useState<IWhatsappMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedPhone, setSelectedPhone] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedPhoneRef = useRef(selectedPhone)

  const getMessages = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp`)
    setPhones(response.data)
  }
  
  useEffect(() => {
    getMessages()
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
        <div className='p-4 lg:p-6 w-full min-h-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='w-full max-w-[1280px] mx-auto flex flex-col gap-4'>
            <h1 className='text-lg font-medium'>Mensajes</h1>
            <MessagesCategories />
          </div>
          <div className='w-full max-w-[1280px] flex mx-auto gap-6'>
            <div className='w-1/2 flex flex-col gap-2'>
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
                        <div key={message._id} className='flex flex-col gap-2 mb-2'>
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