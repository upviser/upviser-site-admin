import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonAI, Card, Input, Select, Spinner2, Textarea } from '../ui'

interface Props {
  information: IProduct,
  setInformation: any
}

export const NameDescription: React.FC<Props> = ({information, setInformation}) => {

  const [descriptionAi, setDescriptionAi] = useState('')
  const [descriptionAiLoading, setDescriptionAiLoading] = useState(false)
  const [descriptionAiView, setDescriptionAiView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [newType, setNewType] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateDescription = async (e: any) => {
    e.preventDefault()
    if (!descriptionAiLoading) {
      setDescriptionAiLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/description-product`, { description: description, type: type === 'Personalizado' ? newType : type })
      setDescriptionAi(response.data)
      setDescriptionAiLoading(false)
    }
  }

  const changeDescriptionAi = (e: any) => {
    setDescriptionAi(e.target.value)
  }

  return (
    <Card title='Información'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Nombre</p>
        <Input placeholder='Nombre del producto' change={inputChange} name='name' value={information.name} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Descripción</p>
        <Textarea placeholder='Descripción del producto' name='description' change={inputChange} value={information.description} config='h-36' />
      </div>
      <ButtonAI click={(e: any) => {
        e.preventDefault()
        setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-1' })
        }, 10)
      }} text={'Generar descripción con IA'} config='w-fit' />
      <div onClick={() => {
        if (!descriptionAiView.mouse) {
          setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setDescriptionAiView({ ...descriptionAiView, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${descriptionAiView.view} ${descriptionAiView.opacity} transition-opacity duration-200 bg-black/30 flex fixed w-full h-full top-0 left-0 z-50`}>
        <div onMouseMove={() => setDescriptionAiView({ ...descriptionAiView, mouse: true })} onMouseEnter={() => setDescriptionAiView({ ...descriptionAiView, mouse: true })} onMouseLeave={() => setDescriptionAiView({ ...descriptionAiView, mouse: false })} className={`${descriptionAiView.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 bg-white m-auto p-6 flex flex-col gap-4 dark:bg-neutral-800 w-[500px] rounded-xl border shadow-popup dark:shadow-popup-dark dark:border-neutral-700`}>
          <h3 className='font-medium'>Generar descripción del producto con IA</h3>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Descripción del producto</p>
            <Textarea placeholder='Descripción del producto' change={(e: any) => setDescription(e.target.value)} value={description} config='h-20' />
            <p className='text-sm'>Tono del texto</p>
            <Select change={(e: any) => setType(e.target.value)} value={type}>
              <option>Experto</option>
              <option>Persuasivo</option>
              <option>Personalizado</option>
            </Select>
            {
              type === 'Personalizado'
                ? (
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Tono personalizado</p>
                    <Input placeholder='Tono' change={(e: any) => setNewType(e.target.value)} value={newType} />
                  </div>
                )
                : ''
            }
          </div>
          <ButtonAI click={generateDescription} text='Generar descripción' loading={descriptionAiLoading} />
          {
            descriptionAi !== ''
              ? (
                <div>
                  <Textarea placeholder='Descripción generada por la IA' name='descriptionAi' change={changeDescriptionAi} value={descriptionAi} config='h-40' />
                  <Button action={(e: any) => {
                    e.preventDefault()
                    setDescriptionAiView({ ...descriptionAiView, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setDescriptionAiView({ ...descriptionAiView, view: 'hidden', opacity: 'opacity-0' })
                    }, 200)
                    setInformation({...information, description: descriptionAi})
                  }} config='w-full'>Usar descripción</Button>
                </div>
              )
              : ''
          }
        </div>
      </div>
    </Card>
  )
}
