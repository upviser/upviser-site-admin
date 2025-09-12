"use client"
import { Email, Segment, Config, PopupStadistics } from '@/components/campaigns'
import { Button2, ButtonSubmit, Spinner } from '@/components/ui'
import { ICall, IClientTag, IEmail, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [email, setEmail] = useState<IEmail>()
  const [date, setDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [clientData, setClientData] = useState([])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [services, setServices] = useState<IService[]>()
  const [calls, setCalls] = useState<ICall[]>()

  const router = useRouter()

  useEffect(() => {
    const getCampaign = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${params.slug}`)
      setEmail(response.data)
    }

    getCampaign()
  }, [params.slug])

  useEffect(() => {
    const getStoreData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
      if (response.data) {
        setStoreData(response.data)
      }
    }

    getStoreData()
  }, [])

  useEffect(() => {
    const getClientTags = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
      setClientTags(response.data)
    }

    getClientTags()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getCalls = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
    setCalls(res.data)
  }

  useEffect(() => {
    getCalls()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const submit = async () => {
    if (!loading) {
      setLoading(true)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${email?._id}`, email)
      router.push('/email-marketing/campanas')
    }
  }

  return (
    <>
      <Head>
        <title>Campaña: {email?._id}</title>
      </Head>
      <PopupStadistics popup={popup} setPopup={setPopup} campaign={email} />
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={submit} color='main' submitLoading={loading} textButton='Editar campaña' config='w-40' />
              <Link className='my-auto text-sm' href='/email-marketing/campanas'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 flex flex-col gap-6 w-full overflow-y-auto bg-bg dark:bg-neutral-900' style={{ height: 'calc(100% - 69px)' }}>
          {
            email
              ? (
                <>
                  <div className='flex gap-3 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
                    <div className='flex gap-3'>
                      <Link href='/email-marketing/campanas' className='border rounded-xl p-2 h-fit my-auto transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-lg font-medium mt-auto mb-auto'>Campaña: {email?._id}</h1>
                    </div>
                    <Button2 action={(e: any) => {
                      e.preventDefault()
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                      }, 10);
                    }}>Estadisticas</Button2>
                  </div>
                  <div className='flex flex-col gap-6 w-full max-w-[1280px] mx-auto'>
                    <Segment setEmail={setEmail} email={email} clientTags={clientTags} clientData={clientData} setClientData={setClientData} />
                    <div className='w-full flex'>
                      <div className='flex flex-wrap gap-6 m-auto'>
                        <Email email={email} storeData={storeData} />
                        <Config setEmail={setEmail} email={email} setDate={setDate} date={date} clientData={clientData} setClientData={setClientData} services={services} calls={calls} />
                      </div>
                    </div>
                  </div>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
    </>
  )
}