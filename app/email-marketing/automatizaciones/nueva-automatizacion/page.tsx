"use client"
import { Config, Segment, Step } from '@/components/automatizations'
import { Button, Button2, ButtonSubmit, Input, Select, Spinner2 } from '@/components/ui'
import { IAutomatization, ICall, IClientTag, IEmailAutomatization, IForm, IFunnel, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page() {

  const [automatization, setAutomatization] = useState<IAutomatization>({
    startType: '',
    startValue: '',
    name: '',
    automatization: [{
      affair: '',
      title: 'Lorem ipsum',
      paragraph: 'Lorem ipsum',
      buttonText: 'Lorem ipsum',
      condition: [],
      url: '',
      number: 0,
      time: 'Días'
    }]
  })
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [loading, setLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState({
    affair: '',
    buttonText: '',
    paragraph: '',
    title: '',
    url: '',
    index: 0
  })
  const [storeData, setStoreData] = useState<IStoreData>()
  const [popupCondition, setPopupCondition] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [selectStep, setSelectStep] = useState(0)
  const [clientData, setClientData] = useState([])
  const [forms, setForms] = useState<IForm[]>([])
  const [calls, setCalls] = useState<ICall[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [error, setError] = useState('')

  const router = useRouter()

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    if (response.data) {
      setClientTags(response.data)
    }
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getForms = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forms`)
    setForms(res.data)
  }

  useEffect(() => {
    getForms()
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

  const getFunnels = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setError('')
      if (automatization.name === '') {
        setError('Debes ponerle un nombre a la automatización')
        setLoading(false)
        return
      }
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/automatization`, { startType: automatization.startType, startValue: automatization.startValue, name: automatization.name, date: new Date(), automatization: automatization.automatization })
      router.push('/email-marketing/automatizaciones')
    }
  }

  return (
    <>
      <div onClick={() => {
        if (!popupCondition.mouse) {
          setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupCondition({ ...popupCondition, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupCondition.view} ${popupCondition.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50 p-4`}>
        <div onMouseEnter={() => setPopupCondition({ ...popupCondition, mouse: true })} onMouseLeave={() => setPopupCondition({ ...popupCondition, mouse: false })} onMouseMove={() => setPopupCondition({ ...popupCondition, mouse: true })} className={`${popupCondition.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 shadow-popup w-full max-w-[500px] max-h-[600px] overflow-y-auto p-6 rounded-xl flex flex-col gap-4 m-auto border bg-white dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="font-medium">Agrega una condición para el pasar al siguiente paso</p>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Condición por tags</p>
            <div className='flex gap-4 flex-wrap'>
              {
                clientTags.map(tag => (
                  <div key={tag.tag} className='flex gap-2'>
                    <input type='checkbox' checked={automatization.automatization[selectStep!].condition?.includes(tag.tag)} onChange={(e: any) => {
                      const isChecked = e.target.checked;
                      const oldAutomatizations = [...automatization.automatization];
                      const currentConditions = oldAutomatizations[selectStep!].condition || [];

                      if (isChecked) {
                        // Add tag to conditions if checked
                        oldAutomatizations[selectStep!].condition = [...currentConditions, tag.tag];
                      } else {
                        // Remove tag from conditions if unchecked
                        oldAutomatizations[selectStep!].condition = currentConditions.filter(c => c !== tag.tag);
                      }

                      setAutomatization({ ...automatization, automatization: oldAutomatizations });
                    }} />
                    <p className='text-sm'>{tag.tag}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <Button action={(e: any) => {
            e.preventDefault()
            setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopupCondition({ ...popupCondition, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }}>Guardar condición</Button>
        </div>
      </div>
      <Head>
        <title>Nueva automatización</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
        <div className='flex m-auto w-full max-w-[1280px] justify-between gap-4 flex-col lg:flex-row'>
          <div className='flex gap-4'>
            <p className='my-auto w-[450px] hidden text-[15px] lg:flex'>Nombre de la automatización:</p>
            <Input change={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization.name} placeholder='Nombre' />
          </div>
          {
            error !== ''
              ? <p className='text-white bg-red-500 px-2 py-1 w-fit'>{error}</p>
              : ''
          }
          <div className='flex gap-6 w-fit'>
            <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Crear automatización' config='w-48 my-auto' />
            <Link className='my-auto text-sm' href='/email-marketing/automatizaciones'><p className='m-auto text-sm'>Descartar</p></Link>
          </div>
        </div>
      </div>
      <div className='overflow-y-auto bg-bg dark:bg-neutral-900 h-[calc(100%-125px)] lg:h-[calc(100%-73px)] lg:pb-0'>
        <div className='p-4 lg:p-6 flex flex-col gap-6 bg-bg dark:bg-neutral-900'>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/email-marketing/automatizaciones' className='border rounded-xl p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg my-auto font-medium'>Nueva automatización</h1>
          </div>
          <div className='w-full flex max-w-[1280px] mx-auto'>
            <div className='m-auto flex gap-6 flex-col lg:flex-row'>
              <div className='flex flex-col h-fit'>
                <Segment setAutomatization={setAutomatization} automatization={automatization} clientTags={clientTags} forms={forms} calls={calls} services={services} funnels={funnels} />
                {
                  automatization.automatization.map((email, index) => (
                    <Step key={email.affair} email={email} index={index} setAutomatization={setAutomatization} automatization={automatization} setTempEmail={setTempEmail} selectStep={selectStep} setSelectStep={setSelectStep} popupCondition={popupCondition} setPopupCondition={setPopupCondition} />
                  ))
                }
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  setAutomatization({
                    ...automatization, automatization: automatization.automatization.concat({
                      affair: '',
                      title: 'Lorem ipsum',
                      paragraph: 'Lorem ipsum',
                      buttonText: 'Lorem ipsum',
                      condition: [],
                      url: '',
                      number: 0,
                      time: 'Días'
                    })
                  })
                }} config='m-auto mt-4'>Agregar paso</Button2>
              </div>
              {
                (tempEmail.buttonText !== '' || tempEmail.paragraph !== '' || tempEmail.title !== '')
                  ? (
                    <div className='w-full'>
                      <Config setTempEmail={setTempEmail} automatization={automatization} tempEmail={tempEmail} setAutomatization={setAutomatization} storeData={storeData} clientData={clientData} setClientData={setClientData} services={services} calls={calls} funnels={funnels} />
                    </div>
                  )
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}