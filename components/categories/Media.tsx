import { ICategory } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Card } from '../ui'
import Image from 'next/image'

interface Props {
  setCategoryInfo: any
  categoryInfo: ICategory
}

export const Media: React.FC<Props> = ({ setCategoryInfo, categoryInfo }) => {

  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  const imageChange = async (e: any) => {
    if (!loadingImage) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('name', e.target.files[0].name);
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8'
          }
        })
        setCategoryInfo({...categoryInfo, [e.target.name]: data})
        setLoadingImage(false)
      } catch (error) {
        setLoadingImage(false)
        setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
      }
    }
  }

  return (
    <Card title='Elementos multimedia'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Imagen categoria</p>
        <input type='file' onChange={imageChange} name='image' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
        {
          categoryInfo.image
            ? (
              <div className='mt-3'>
                <Image src={categoryInfo.image} alt={categoryInfo.category} width={400} height={400} className='object-contain w-fit' />
              </div>
            )
            : ''
        }
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Banner categoria</p>
        <input type='file' onChange={imageChange} name='banner' className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
        {
          categoryInfo.banner
            ? (
              <div className='mt-3'>
                <Image src={categoryInfo.banner} alt={categoryInfo.category} width={400} height={400} className='object-contain w-fit' />
              </div>
            )
            : ''
        }
      </div>
    </Card>
  )
}
