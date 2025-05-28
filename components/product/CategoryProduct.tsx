import { ICategory, IProduct, ITag } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button2, ButtonSubmit2, Card, Input, Select, Spinner2 } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
  categories: ICategory[] | undefined
  setNewCategory: any
  newCategory: any
}

export const CategoryProduct: React.FC<Props> = ({information, setInformation, categories, setNewCategory, newCategory}) => {

  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)

  const getTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
    setTags(response.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const tagChange = (e: any) => {
    setTag(e.target.value)
  }

  const inputTagChange = (e: any) => {
    if (e.target.checked) {
      setInformation({...information, tags: information.tags.concat([e.target.name])})
    } else {
      const tagsFilter = information.tags.filter(tag => tag !== e.target.name)
      setInformation({...information, tags: tagsFilter})
    }
  }

  const newTagSubmit = async (e: any) => {
    e.preventDefault()
    if (!tagLoading) {
      setTagLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {tag: tag})
      getTags()
      setTag('')
      setTagLoading(false)
    }
  }

  return (
    <Card title='Otros'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Categoría</p>
          <Select value={information.category.category} change={(e: any) => {
            const category = categories?.find(category => category.category === e.target.value)
            setInformation({ ...information, category: { category: category?.category, slug: category?.slug } })
          }} name='category'>
            <option>Seleccionar categoría</option>
            {
              categories?.map(category => (
                <option key={category._id}>{category.category}</option>
              ))
            }
          </Select>
        </div>
        <Button2 action={(e: any) => {
          e.preventDefault()
          setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setNewCategory({ ...newCategory, view: 'flex', opacity: 'opacity-1' })
          }, 10)
        }}>Crear nueva categoria</Button2>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-sm'>Dimensiones</p>
        <div className='flex gap-2 justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Ancho</p>
            <Input change={(e: any) => setInformation({ ...information, dimentions: { ...information.dimentions, width: e.target.value } })} value={information.dimentions?.width} placeholder='Ancho' />
            <p className='text-sm'>Alto</p>
            <Input change={(e: any) => setInformation({ ...information, dimentions: { ...information.dimentions, height: e.target.value } })} value={information.dimentions?.height} placeholder='Alto' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Largo</p>
            <Input change={(e: any) => setInformation({ ...information, dimentions: { ...information.dimentions, length: e.target.value } })} value={information.dimentions?.length} placeholder='Largo' />
            <p className='text-sm'>Peso</p>
            <Input change={(e: any) => setInformation({ ...information, dimentions: { ...information.dimentions, weight: e.target.value } })} value={information.dimentions?.weight} placeholder='Peso' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Tags</p>
          {
            tags?.length
              ? (
                <div className='flex gap-2 flex-wrap mb-2'>
                  {tags.map(tag => (
                    <div className='flex gap-1' key={tag._id?.toString()}>
                      <input type='checkbox' checked={information.tags.find(e => e === tag.tag) ? true : false} name={tag.tag.toString()} onChange={inputTagChange} />
                      <span className='text-sm'>{tag.tag}</span>
                    </div>
                  ))}
                </div>
              )
              : ''
          }
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Nuevo tag</p>
          <div className='flex gap-2'>
            <Input placeholder='Nuevo Tag' change={tagChange} value={tag} />
            <ButtonSubmit2 action={newTagSubmit} color='main' submitLoading={tagLoading} textButton='Crear tag' config='w-32' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Url</p>
        <Input placeholder='Slug del producto' name='slug' change={inputChange} value={information.slug} />
      </div>
    </Card>
  )
}
