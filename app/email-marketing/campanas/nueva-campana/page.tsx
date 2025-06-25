"use client"
import { Config, Email, Segment } from '@/components/campaigns'
import { ButtonSubmit, Spinner2 } from '@/components/ui'
import { IClientTag, IEmail, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [email, setEmail] = useState<IEmail>({
    address: 'Todos los suscriptores',
    affair: '',
    title: 'Lorem ipsum',
    paragraph: 'Lorem ipsum',
    buttonText: 'Lorem ipsum',
    url: '',
    date: undefined
  })
  const [date, setDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [clientData, setClientData] = useState([])
  const [error, setError] = useState('')

  const router = useRouter()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    if (response.data) {
      setClientTags(response.data)
    }
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const submit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      if (email.affair === '') {
        setError('La campaña debe tener un asunto')
        setLoading(false)
        return
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/new-campaign`, email)
      router.push('/email-marketing/campanas')
    }
  }

  return (
    <>
      <Head>
        <title>Nueva campaña</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
        <div className='flex m-auto w-full max-w-[1280px]'>
          {
            error !== ''
              ? <p className='bg-red-500 text-white p-2 w-fit'>{error}</p>
              : ''
          }
          <div className='flex gap-6 ml-auto w-fit'>
            <ButtonSubmit action={submit} color='main' submitLoading={loading} textButton='Crear campaña' config='w-40' />
            <Link className='my-auto text-sm' href='/email-marketing/campanas'>Descartar</Link>
          </div>
        </div>
      </div>
      <div className='bg-bg flex flex-col gap-6 overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
        <div className='p-4 lg:p-6 flex flex-col gap-4 w-full dark:bg-neutral-900'>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/email-marketing/campanas' className='border border-black/5 rounded-xl p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg font-medium my-auto'>Nueva campaña</h1>
          </div>
          <div className='flex flex-col gap-6 w-full max-w-[1280px] mx-auto'>
            <Segment setEmail={setEmail} email={email} clientTags={clientTags} clientData={clientData} setClientData={setClientData} />
            <div className='w-full flex'>
              <div className='flex gap-6 m-auto w-full flex-wrap'>
                <Email email={email} storeData={storeData} />
                <Config setEmail={setEmail} email={email} setDate={setDate} date={date} clientData={clientData} setClientData={setClientData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}