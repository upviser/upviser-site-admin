"use client"
import { ICategory } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { ButtonSubmit, Input, Select, Spinner2, Textarea } from './'

interface Props {
  newCategory: any,
  setNewCategory: any,
  setNewCategoryData: any,
  newCategoryData: ICategory
  setCategories: any
}

export const NewCategoryModal: React.FC<Props> = ({ newCategory, setNewCategory, setNewCategoryData, newCategoryData, setCategories }) => {

  const [descriptionLoading, setDecriptionLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')

  const inputCategoryChange = (e: any) => {
    setNewCategoryData({ ...newCategoryData, [e.target.name]: e.target.value })
  }

  const generateDescription = async () => {
    setDecriptionLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-description-category`, { description: newCategoryData.category, type: type === 'Personalizado' ? newType : type })
    const filterSeo = response.data[0].text.split('\n').filter((item: any) => item !== '')
    setNewCategoryData({ ...newCategoryData, description: filterSeo[0] })
    setDecriptionLoading(false)
  }

  const imageChange = async (e: any) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setNewCategoryData({...newCategoryData, image: { public_id: data.image.public_id, url: data.image.url }})
  }

  const handleSubmit = async (e: any) => {
    if (!loading) {
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, newCategoryData)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      if (response.data) {
        setCategories(response.data)
      }
      setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-0' })
      setTimeout(() => {
        setNewCategory({ ...newCategory, view: 'hidden', opacity: 'opacity-0' })
      }, 200)
      setLoading(false)
    }
  }

  return (
    <div className={`fixed right-0 w-full flex flex-col gap-4 h-full top-0 left-0 z-50 bg-black/30 ${newCategory.view} ${newCategory.opacity} transition-opacity duration-200 dark:bg-black/40`} onClick={() => {
      if (!newCategory.mouse) {
        setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setNewCategory({ ...newCategory, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    }}>
      <div className={`${newCategory.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 p-6 bg-white w-[600px] flex flex-col gap-4 rounded-xl border border-border h-fit m-auto dark:bg-neutral-800 dark:border-neutral-700`} onMouseEnter={() => setNewCategory({ ...newCategory, mouse: true })} onMouseLeave={() => setNewCategory({ ...newCategory, mouse: false })}>
        <h2 className='font-medium'>Nueva categoría</h2>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Nombre</p>
          <Input placeholder='Nombre de la categoría' name='category' change={inputCategoryChange} value={newCategoryData.category} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción</p>
          <Textarea placeholder='Descripción de la categoría' name='description' change={inputCategoryChange} value={newCategoryData.description} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Url</p>
          <Input placeholder='Slug de la url' name='slug' change={inputCategoryChange} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Imagen</p>
          <input type='file' onChange={imageChange} className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
        </div>
        <div className='flex gap-4'>
          <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Crear categoría' config='w-40' />
          <a onClick={() => {
            setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setNewCategory({ ...newCategory, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }} className='text-sm cursor-pointer my-auto'>Cancelar</a>
        </div>
      </div>
    </div>
  )
}
