"use client"
import { CategorySeo, Media, NameDescription } from '@/components/categories'
import { ICategory } from '@/interfaces'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { ButtonSubmit, Spinner2 } from '../../../../components/ui'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default  function Page () {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [loading, setLoading] = useState(false)
  const initialCategory = { category: '' }

  const router = useRouter()

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, categoryInfo)
      router.push('/productos/categorias')
    }
  }

  return (
    <>
      <Head>
        <title>Nueva categoría</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              {
                categoryInfo.category === initialCategory.category
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 text-white text-sm rounded-lg w-40 h-10 cursor-not-allowed'>{loading ? <Spinner2 /> : 'Crear categoría'}</button>
                  : <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Crear categoría' config='w-40' />
              }
              <Link className='my-auto text-sm' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-bg w-full flex flex-col gap-6 mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/productos/categorias' className='border border-border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg font-medium mt-auto mb-auto'>Nueva categoría</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] m-auto flex-col lg:flex-row'>
            <div className='flex gap-6 flex-col w-full lg:w-2/3'>
              <NameDescription categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
              <CategorySeo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
            </div>
            <div className='flex gap-6 flex-col w-full lg:w-1/3'>
              <Media categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
            </div>
          </form>
        </div>
    </>
  )
}