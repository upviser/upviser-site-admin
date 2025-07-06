"use client"
import { Nav } from '@/components/configuration'
import { ButtonSubmit, Input, Textarea } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [integrations, setIntegrations] = useState({
    idPhone: '',
    whatsappToken: '',
    idPage: '',
    idInstagram: '',
    messengerToken: '',
    apiToken: '',
    apiPixelId: '',
    googleAnalytics: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const getIntegrations = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/integrations`)
    if (response.data) {
      setIntegrations(response.data)
    }
  }

  useEffect(() => {
    getIntegrations()
  }, [])

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, integrations)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Integraciones</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            {
              error !== ''
                ? <p className='px-2 py-1 bg-red-500 text-white w-fit h-fit my-auto'>{ error }</p>
                : ''
            }
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Guardar datos' config='w-40' />
              <button onClick={() => router.refresh()} className='my-auto text-sm'>Descartar</button>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
            <Nav />
            <div className='w-full lg:w-3/4 flex flex-col gap-4'>
              <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Integraciones</h2>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>ID del número de teléfono</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, idPhone: e.target.value })} value={integrations.idPhone} placeholder='ID del número de teléfono' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Token Whatsapp App</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, whatsappToken: e.target.value })} value={integrations.whatsappToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>ID de la página de Facebook</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, idPage: e.target.value })} value={integrations.idPage} placeholder='ID de la página de Facebook' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>ID del Instagram</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, idInstagram: e.target.value })} value={integrations.idInstagram} placeholder='ID del Instagram' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Token Messenger App</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, messengerToken: e.target.value })} value={integrations.messengerToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Api Meta Token</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, apiToken: e.target.value })} value={integrations.apiToken} placeholder='Api Meta Token' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Api Pixel Id</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, apiPixelId: e.target.value })} value={integrations.apiPixelId} placeholder='Api Pixel Id' config='h-40' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-sm'>Google Analytics</h3>
                <Input change={(e: any) => setIntegrations({ ...integrations, googleAnalytics: e.target.value })} value={integrations.googleAnalytics} placeholder='Google Analytics' config='h-40' />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}