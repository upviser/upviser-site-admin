"use client"
import { ButtonSubmit } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import { Content, Image, Seo, Visibility } from '@/components/blog'
import { IPost } from '@/interfaces'

export default function Page () {

  const [contentData, setContentData] = useState<IPost>({
    title: '',
    state: false,
    image: '',
    description: '',
    titleSeo: '',
    descriptionSeo: '',
    content: [{ content: '', html: '', image: '', type: '' }]
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    if (!submitLoading) {
      setSubmitLoading(true)
      setError('')
      if (contentData.title === '') {
        setError('El post debe tener un titulo')
        setSubmitLoading(false)
        return
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, { ...contentData, content: content })
      router.push('/blog')
    }
  }

  return (
    <>
      <Head>
        <title>Nuevo post</title>
      </Head>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
        <div className='flex m-auto w-full max-w-[1280px]'>
          {
            error !== ''
              ? <p className='bg-red-500 text-white w-fit p-2'>{error}</p>
              : ''
          }
          <div className='flex gap-6 ml-auto w-fit'>
            <ButtonSubmit action={handleSubmit} color='main' submitLoading={submitLoading} textButton='Crear post' config='w-32' />
            <Link className='my-auto text-sm' href='/blog'>Descartar</Link>
          </div>
        </div>
      </div>
      <div className='overflow-y-auto bg-bg dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
        <div className='p-4 lg:p-6 flex flex-col gap-6 w-full bg-bg dark:bg-neutral-900'>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/blog' className='border rounded-xl p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg my-auto font-medium'>Nuevo post</h1>
          </div>
          <form onSubmit={handleSubmit} className='flex gap-6 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
            <div className='flex gap-6 flex-col w-full lg:w-2/3'>
              <Content setContentData={setContentData} contentData={contentData} setContent={setContent} content={content} />
              <Seo setContentData={setContentData} contentData={contentData} />
            </div>
            <div className='w-full lg:w-1/3 flex flex-col gap-6'>
              <Visibility setContentData={setContentData} contentData={contentData} />
              <Image contentData={contentData} setContentData={setContentData} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}