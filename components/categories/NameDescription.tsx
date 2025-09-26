"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../interfaces'
import { Button, ButtonAI, Card, Input, Popup, Select, Textarea } from '../ui'

interface Props {
  setCategoryInfo: any
  categoryInfo: ICategory
}

export const NameDescription: React.FC<Props> = ({setCategoryInfo, categoryInfo}) => {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [descriptionLoading, setDecriptionLoading] = useState(false)
  const [descriptionAi, setDescriptionAi] = useState('')
  const [descriptionAiLoading, setDescriptionAiLoading] = useState(false)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [newType, setNewType] = useState('')
  const [shopLogin, setShopLogin] = useState<any>()
  const [error, setError] = useState('')

  const getShopLogin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`)
    setShopLogin(res.data)
  }

  useEffect(() => {
    getShopLogin()
  }, [])

  const inputChange = (e: any) => {
    setCategoryInfo({...categoryInfo, [e.target.name]: e.target.value})
  }

  const generateDescription = async () => {
    if (!descriptionLoading) {
      setDecriptionLoading(true)
      setError('')
      if (shopLogin.textAI === 0) {
        setError('No tienes textos disponibles')
        setDecriptionLoading(false)
        return
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/description-category`, { description: description, type: type === 'Personalizado' ? newType : type })
      setDescriptionAi(response.data)
      setDecriptionLoading(false)
      const res2 = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, { textAI: shopLogin.textAI - 1 })
      setShopLogin(res2.data)
    }
  }

  return (
    <>
      <Popup popup={popup} setPopup={setPopup}>
        <p className='font-medium'>Generar descripción de la categoría con IA</p>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción de la categoría</p>
          <Textarea placeholder='Descripción de la categoría' change={(e: any) => setDescription(e.target.value)} value={description} config='h-20' />
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
        <ButtonAI click={generateDescription} text='Generar con IA' loading={descriptionAiLoading} />
        {
          descriptionAi !== ''
            ? (
              <div>
                <Textarea placeholder='Descripción generada por la IA' name='descriptionAi' change={setDescription} value={descriptionAi} config='h-40' />
                <Button action={(e: any) => {
                  e.preventDefault()
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                  setCategoryInfo({...categoryInfo, description: descriptionAi})
                }} config='w-full'>Usar descripción</Button>
              </div>
            )
            : ''
        }
      </Popup>
      <Card title='Información'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Nombre</p>
          <Input placeholder='Nombre del producto' name='category' change={inputChange} value={categoryInfo.category} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción</p>
          <Textarea placeholder='Descripción de la categoría' name='description' change={inputChange} value={categoryInfo.description} />
        </div>
        <ButtonAI click={(e: any) => {
          e.preventDefault()
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
          }, 10);
        }} text={'Generar descripción con IA'} config='w-fit' />
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Url</p>
          <Input placeholder='Slug' name='slug' change={inputChange} value={categoryInfo.slug} />
        </div>
      </Card>
    </>
  )
}
