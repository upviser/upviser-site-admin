import axios from 'axios'
import React, { useState } from 'react'
import { ICategory } from '../../interfaces'
import { Button, Button2, ButtonAI, Card, Input, Popup, Select, Textarea } from '../ui'

interface Props {
  setCategoryInfo: any
  categoryInfo: ICategory
}

export const CategorySeo: React.FC<Props> = ({setCategoryInfo, categoryInfo}) => {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-1', mouse: false })
  const [metaTitleAiLoading, setMetaTitleAiLoading] = useState(false)
  const [metaDescriptionAiLoading, setMetaDescriptionAiLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [titleSeo, setTitleSeo] = useState('')
  const [descriptionSeo, setDescriptionSeo] = useState('')

  const inputChange = (e: any) => {
    setCategoryInfo({...categoryInfo, [e.target.name]: e.target.value})
  }

  const generateSeo = async (e: any) => {
    e.preventDefault()
    if (!aiLoading) {
      setAiLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category-seo`, { description: description, type: type === 'Personalizado' ? newType : type })
      const filterTitleSeo = response.data.title
      const filterDescriptionSeo = response.data.description
      setTitleSeo(filterTitleSeo)
      setDescriptionSeo(filterDescriptionSeo)
      setAiLoading(false)
    }
  }

  return (
    <>
      <Popup popup={popup} setPopup={setPopup}>
        <p className='font-medium'>Generar metadatos con IA</p>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción del producto</p>
          <Textarea change={(e: any) => setDescription(e.target.value)} value={description} placeholder='Descripción del producto' config='h-20' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Tono del texto</p>
          <Select change={(e: any) => setType(e.target.value)} value='type'>
            <option>Experto</option>
            <option>Persuasivo</option>
            <option>Personalizado</option>
          </Select>
        </div>
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
        <ButtonAI click={generateSeo} text={'Generar metadatos'} loading={aiLoading} />
        {
          titleSeo !== ''
            ? (
              <div className='flex flex-col gap-2'>
                <Input placeholder='Titulo generado por la inteligencia artificial' value={titleSeo} change={(e: any) => setTitleSeo(e.target.value)} />
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  categoryInfo.descriptionSeo
                  setCategoryInfo({...categoryInfo, titleSeo: titleSeo})
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }}>Usar titulo SEO</Button2>
              </div>
            )
            : ''
        }
        {
          descriptionSeo !== ''
            ? (
              <div className='flex flex-col gap-2'>
                <Textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionSeo} change={(e: any) => setDescriptionSeo(e.target.value)} config='h-24' />
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  setCategoryInfo({...categoryInfo, descriptionSeo: descriptionSeo})
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }}>Usar descripción SEO</Button2>
              </div>
            )
            : ''
        }
        {
          titleSeo !== '' && descriptionSeo !== ''
            ? (
              <Button action={(e: any) => {
                e.preventDefault()
                setCategoryInfo({...categoryInfo, titleSeo: titleSeo, descriptionSeo: descriptionSeo})
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Usar ambos</Button>
            )
            : ''
        }
      </Popup>
      <Card title='Configuración SEO'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Titulo SEO</p>
          <Input placeholder='Titulo SEO' name='titleSeo' change={inputChange} value={categoryInfo.titleSeo} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción SEO</p>
          <Textarea placeholder='Descripción SEO de la categoría' name='descriptionSeo' change={inputChange} value={categoryInfo.descriptionSeo!} />
        </div>
        <ButtonAI click={(e: any) => {
          e.preventDefault()
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
          }, 10)
        }} text={'Generar metadatos con IA'} config='w-fit' />
      </Card>
    </>
  )
}
