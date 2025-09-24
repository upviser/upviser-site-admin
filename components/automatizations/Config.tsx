"use client"
import { Design, ICall, IFunnel, IService, IStoreData } from '@/interfaces'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button2, Input, Select, Textarea } from '../ui'
import axios from 'axios'

interface Props {
    setTempEmail: any
    automatization: any
    tempEmail: any
    setAutomatization: any
    storeData: IStoreData | undefined
    clientData: any
    setClientData: any
    services?: IService[]
    calls?: ICall[]
    funnels?: IFunnel[]
}

export const Config: React.FC<Props> = ({ setTempEmail, automatization, tempEmail, setAutomatization, storeData, clientData, setClientData, services, calls, funnels }) => {

  const [design, setDesign] = useState<Design>()

  const getDesign = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    setDesign(res.data)
  }

  useEffect(() => {
    getDesign()
  }, [])

  return (
    <div className='flex flex-col gap-6 sticky top-10 w-full'>
      <div className='w-full max-w-[600px] p-5 flex flex-col gap-4 bg-white rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
        <h2 className='font-medium text-lg'>Configuración correo</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 justify-between'>
              <p className='text-sm my-auto'>Asunto:</p>
              <Select change={(e: any) => {
                e.preventDefault()
                setTempEmail({...tempEmail, affair: tempEmail.affair + e.target.value})
              }} value='' config='w-fit'>
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
            <Input change={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, affair: e.target.value })} value={tempEmail.affair} placeholder='Asunto' />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 justify-between'>
              <p className='text-sm mt-auto mb-auto'>Título:</p>
              <Select change={(e: any) => {
                e.preventDefault()
                setTempEmail({...tempEmail, title: tempEmail.title + e.target.value})
              }} value='' config='w-fit'>
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
            <Input change={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, title: e.target.value })} value={tempEmail.title} placeholder='Titulo' />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 justify-between'>
              <p className='text-sm mt-auto mb-auto'>Parrafo:</p>
              <Select change={(e: any) => {
                e.preventDefault()
                setTempEmail({...tempEmail, paragraph: tempEmail.paragraph + e.target.value})
              }} value='' config='w-fit'>
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
            <Textarea change={(e: ChangeEvent<HTMLTextAreaElement>) => setTempEmail({ ...tempEmail, paragraph: e.target.value })} value={tempEmail.paragraph} placeholder='Parrafo' />
          </div>
          <div className='flex gap-2'>
            <p className='text-sm mt-auto mb-auto w-32'>Texto botón:</p>
            <Input change={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, buttonText: e.target.value })} value={tempEmail.buttonText} type='text' placeholder='Boton' />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex gap-4 justify-between'>
              <p className='text-sm mt-auto mb-auto'>Url:</p>
              <Select change={(e: any) => setTempEmail({ ...tempEmail, url: e.target.value })}>
                <option>Selecciona una pagina</option>
                {
                  design?.pages.map(page => <option key={page._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${page.slug}`}>{page.page}</option>)
                }
                {
                  funnels?.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${step.slug}`}>Embudo: {funnel.funnel} - {step.step}</option>))
                }
                {
                  services?.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/${step.slug}`}>Servicio: {service.name} - {step.step}</option>))
                }
                {
                  calls?.map(call => <option key={call._id} value={`${process.env.NEXT_PUBLIC_WEB_URL}/llamadas/${call.nameMeeting.replaceAll(' ', '-')}`}>Llamada: {call.nameMeeting}</option>)
                }
              </Select>
            </div>
            <Input change={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, url: e.target.value })} value={tempEmail.url} placeholder='Url' />
          </div>
          <div className='flex gap-4 w-full flex-col lg:flex-row'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Si la url es una página de pago y el valor es variable debes seleccionar el servicio despues de agregar la url de la página de pago.</p>
              <Select change={(e: any) => setTempEmail({ ...tempEmail, url: e.target.value })}>
                <option value=''>Selecciona un servicio</option>
                {
                  services?.map(service => <option key={service._id} value={`${tempEmail.url}?email={email}&service=${service._id}`}>{service.name}</option>)
                }
              </Select>
            </div>
          </div>
          <Button2 action={(e: any) => {
            e.preventDefault()
            const data = automatization.automatization
            data[tempEmail.index] = { ...data[tempEmail.index], affair: tempEmail.affair, buttonText: tempEmail.buttonText, paragraph: tempEmail.paragraph, title: tempEmail.title, url: tempEmail.url }
            setAutomatization({ ...automatization, automatization: data })
            setTempEmail({
              affair: '',
              buttonText: '',
              paragraph: '',
              title: '',
              url: '',
              index: 0
            })
          }}>Guardar correo</Button2>
        </div>
      </div>
      <div className='flex flex-col h-fit gap-4 p-4 border border-black/5 bg-white w-full max-w-[600px] dark:bg-neutral-800 dark:border-neutral-700'>
        {
          storeData?.logo && storeData.logo !== ''
            ? <Image className='w-40 mx-auto' src={storeData?.logo!} alt={`Logo tienda ${storeData?.name}`} width={160} height={50} />
            : <p className='text-2xl font-medium text-center'>SITIO WEB</p>
        }
        <h1 className='text-center mx-auto text-3xl font-medium'>{tempEmail.title}</h1>
        <p className='text-center mx-auto'>{tempEmail.paragraph}</p>
        {
          tempEmail.buttonText !== ''
            ? <button className='py-2 px-6 bg-main rounded-xl w-fit m-auto text-white'>{tempEmail.buttonText}</button>
            : ''
        }
        <div className='border-t pt-6 px-6 flex flex-col gap-2 dark:border-neutral-700'>
          <p className="text-center m-auto text-sm">Enviado a:</p>
          <p className="text-center m-auto text-sm"><a href="https://yourcompany.com/unsubscribe">Anular suscripción</a></p>
        </div>
      </div>
    </div>
  )
}
