"use client"
import React, { useEffect, useState } from 'react'
import { Input, Select, Textarea } from '../ui'
import axios from 'axios'
import { Design, ICall, IFunnel, IService } from '@/interfaces'

interface Props {
    setEmail: any
    email: any
    setDate: any
    date: any
    clientData: any
    setClientData: any
    services?: IService[]
    calls?: ICall[]
}

export const Config: React.FC<Props> = ({ setEmail, email, setDate, date, clientData, setClientData, services, calls }) => {

  const [titleData, setTitleData] = useState('')
  const [paragraphData, setParagraphData] = useState('')
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [design, setDesign] = useState<Design>()

  const getDesign = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    setDesign(res.data)
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getFunnels = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  return (
    <div className='p-5 flex flex-col gap-4 m-auto bg-white w-full max-w-96 rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <h2 className='font-medium'>Contenido</h2>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between'>
          <p className='text-sm my-auto'>Titulo</p>
          <Select change={(e: any) => {
            e.preventDefault()
            setEmail({...email, title: email.title + e.target.value})
          }} value={titleData} config='w-fit'>
            <option value=''>Agregar dato cliente</option>
            {
              clientData.length
                ? clientData.map((data: any) => (
                  <option key={data.data} value={'{' + data.data + '}'}>{data.name}</option>
                ))
                : ''
            }
          </Select>
        </div>
        <Input placeholder='Titulo' change={(e: any) => setEmail({...email, title: e.target.value})} value={email.title} />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-between'>
          <p className='text-sm my-auto'>Parrafo</p>
          <Select change={(e: any) => {
            e.preventDefault()
            setEmail({...email, paragraph: email.paragraph + e.target.value})
          }} value={paragraphData} config='w-fit'>
            <option value=''>Agregar dato cliente</option>
            {
              clientData.length
                ? clientData.map((data: any) => (
                  <option key={data.data} value={'{' + data.data + '}'}>{data.name}</option>
                ))
                : ''
            }
          </Select>
        </div>
        <Textarea placeholder='Parrafo' change={(e: any) => setEmail({...email, paragraph: e.target.value})} value={email.paragraph} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Texto boton</p>
        <Input placeholder='Boton' change={(e: any) => setEmail({...email, buttonText: e.target.value})} value={email.buttonText} />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 justify-between'>
          <p className='text-sm'>Link boton</p>
          <Select change={(e: any) => setEmail({...email, url: e.target.value})}>
            <option>Selecciona una pagina</option>
            {
              design?.pages.map(page => <option key={page._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${page.slug}`}>{page.page}</option>)
            }
            {
              funnels.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${step.slug}`}>{funnel.funnel} - {step.step}</option>))
            }
            {
              services?.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${step.slug}`}>Servicio: {service.name} - {step.step}</option>))
            }
            {
              calls?.map(call => <option key={call._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/llamadas/${call.nameMeeting.replaceAll(' ', '-')}`}>Llamada: {call.nameMeeting}</option>)
            }
          </Select>
        </div>
        <Input placeholder='Url' change={(e: any) => setEmail({...email, url: e.target.value})} value={email.url} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Programar envio</p>
        <div className='flex gap-2'>
          <input type='radio' name='send' onClick={() => setEmail({...email, date: undefined})} />
          <p className='text-sm'>En este momento</p>
        </div>
        <div className='flex gap-2'>
          <input type='radio' name='send' onClick={() => setDate(true)} />
          <p className='text-sm'>Fecha personalizada</p>
        </div>
        {
          date
            ? (
              <div className='flex gap-2'>
                <Input type='datetime-local' change={(e: any) => setEmail({...email, date: e.target.value})} />
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}
