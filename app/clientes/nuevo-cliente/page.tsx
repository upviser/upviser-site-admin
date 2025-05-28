"use client"
import { Data, Tags } from '@/components/clients'
import { ButtonSubmit } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [clientTags, setClientTags] = useState([])
  const [newClientTag, setNewClientTag] = useState('')
  const [loadingClientTag, setLoadingClientTag] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const initialEmail = ''

  const getClientTags = async () => {
    const tags = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setClientTags(tags.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const inputChange = (e: any) => {
    setClientData({...clientData, [e.target.name]: e.target.value})
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    if (!submitLoading) {
      setSubmitLoading(true)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (clientData.email !== '') {
        if (emailRegex.test(clientData.email)) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, clientData)
          router.push('/clientes')
        } else {
          setError('Debes ingresar un email valido')
          setSubmitLoading(false)
        }
      } else {
        setError('Debes ingresar un email')
        setSubmitLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Nuevo cliente</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit h-fit my-auto'>{error}</p>
              : ''
          }
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={submitForm} color='main' submitLoading={submitLoading} textButton='Crear cliente' config='w-36' />
              <Link className='my-auto text-sm' href='/clientes'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 bg-bg flex flex-col gap-6 pb-24 w-full min-h-full overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/clientes' className='border border-black/5 rounded-xl p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg my-auto font-medium'>Nuevo cliente</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
            <div className='flex gap-6 flex-col w-full lg:w-2/3'>
              <Data inputChange={inputChange} clientData={clientData} />
            </div>
            <div className='flex gap-6 flex-col w-full lg:w-1/3'>
              <Tags clientTags={clientTags} clientData={clientData} setClientData={setClientData} setLoadingClientTag={setLoadingClientTag} setNewClientTag={setNewClientTag} newClientTag={newClientTag} getClientTags={getClientTags} loadingClientTag={loadingClientTag} />
            </div>
          </form>
        </div>
    </>
  )
}