"use client"
import { Config, PopupStadistics, Segment, Step } from '@/components/automatizations'
import { Button, Button2, ButtonSubmit, Input, Spinner } from '@/components/ui'
import { IAutomatization, ICall, IClientTag, IEmailAutomatization, IForm, IFunnel, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [automatization, setAutomatization] = useState<IAutomatization>({ name: '', startType: '', startValue: '', automatization: []})
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
  const [selectStep, setSelectStep] = useState()
  const [clientData, setClientData] = useState([])
  const [forms, setForms] = useState<IForm[]>([])
  const [calls, setCalls] = useState<ICall[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })

  const router = useRouter()

  useEffect(() => {
    const getAutomatization = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/automatization/${params.slug}`)
      setAutomatization(response.data)
    }

    getAutomatization()
  }, [params.slug])

  useEffect(() => {
    const getClientTags = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
      setClientTags(response.data)
    }

    getClientTags()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data?.length) {
      setStoreData(response.data[0])
    } else {
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

  const editEmail = (email: IEmailAutomatization, index: any, e: any) => {
    e.preventDefault()
    setTempEmail({ affair: email.affair, buttonText: email.buttonText, index: index, paragraph: email.paragraph, title: email.title, url: email.url })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      console.log(automatization)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/automatization/${automatization._id}`, { startType: automatization?.startType, startValue: automatization.startValue, name: automatization?.name, date: new Date(), automatization: automatization?.automatization })
      router.push('/automatizaciones')
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
        <div onMouseEnter={() => setPopupCondition({ ...popupCondition, mouse: true })} onMouseLeave={() => setPopupCondition({ ...popupCondition, mouse: false })} onMouseMove={() => setPopupCondition({ ...popupCondition, mouse: true })} className={`${popupCondition.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[500px] max-h-[600px] overflow-y-auto p-6 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="text-lg">Agrega una condición para el pasar al siguiente paso</p>
          <div className='flex flex-col gap-2'>
            <p>Condición por tags</p>
            <div className='flex gap-4 flex-wrap'>
              {
                clientTags.map(tag => (
                  <div key={tag.tag} className='flex gap-2'>
                    <input type='checkbox' checked={selectStep ? automatization.automatization[selectStep!].condition?.includes(tag.tag) : false} onChange={(e: any) => {
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
                    <p>{tag.tag}</p>
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
      <PopupStadistics popup={popup} setPopup={setPopup} automatization={automatization} />
      <Head>
        <title>Nueva automatización</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto justify-between w-full max-w-[1280px] mr-auto flex-col gap-4 lg:flex-row'>
            <div className='flex gap-2'>
              <p className='my-auto w-[450px] hidden lg:flex'>Nombre de la automatización:</p>
              <Input change={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization?.name} placeholder='Nombre' />
            </div>
            <div className='flex gap-6 w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Editar automatización' config='w-52' />
              <Link className='m-auto text-sm' href='/automatizaciones'><p className='m-auto'>Descartar</p></Link>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg h-[calc(100%-125px)] lg:h-[calc(100%-73px)] dark:bg-neutral-900'>
          {
            automatization
              ? (
                <>
                  <div className='flex gap-3 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
                    <div className='flex gap-3'>
                      <Link href='/automatizaciones' className='border rounded-xl h-fit my-auto p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-2xl my-auto font-medium'>Automatización: {automatization?.name}</h1>
                    </div>
                    <Button2 action={(e: any) => {
                      e.preventDefault()
                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Estadisticas</Button2>
                  </div>
                  <div className='w-full flex max-w-[1280px] mx-auto'>
                    <div className='m-auto flex gap-6 flex-col lg:flex-row'>
                      <div className='flex flex-col h-fit'>
                        <Segment setAutomatization={setAutomatization} automatization={automatization} clientTags={clientTags} forms={forms} calls={calls} services={services} funnels={funnels} />
                        {
                          automatization.automatization?.map((email, index) => (
                            <Step key={email.affair} email={email} index={index} setAutomatization={setAutomatization} automatization={automatization} setTempEmail={setTempEmail} selectStep={selectStep} setSelectStep={setSelectStep} popupCondition={popupCondition} setPopupCondition={setPopupCondition} />
                          ))
                        }
                        <Button2 action={(e: any) => {
                          e.preventDefault()
                          setAutomatization({ ...automatization, automatization: automatization.automatization?.concat({
                            affair: '',
                            title: 'Lorem ipsum',
                            paragraph: 'Lorem ipsum',
                            buttonText: 'Lorem ipsum',
                            url: '',
                            number: 0,
                            time: 'Días'
                          }) })
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