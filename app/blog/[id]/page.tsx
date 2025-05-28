"use client"
import { Content, Image, Seo, Visibility } from '@/components/blog'
import { ButtonSubmit, Spinner } from '@/components/ui'
import { IPost } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { id: string } }) {

  const [contentData, setContentData] = useState<IPost>({
    _id: '',
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
  const router = useRouter()

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`)
      setContentData(res.data)
      setContent(res.data.content)
    }

    getPost()
  }, [params.id])

  const handleSubmit = async () => {
    if (!submitLoading) {
      setSubmitLoading(true)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/${contentData._id}`, contentData)
      router.push('/blog')
    }
  }

  return (
    <>
      <Head>
        <title>Post {contentData?._id}</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={submitLoading} textButton='Guardar post' config='w-32' />
              <Link className='text-sm my-auto' href='/blog'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-4 lg:p-6 mb-16 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          {
            contentData._id !== ''
              ? (
                  <>
                    <div className='flex gap-2 w-full max-w-[1280px] mx-auto'>
                      <Link href='/blog' className='border rounded-lg transition-colors duration-150 p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                      <h1 className='text-lg font-medium my-auto'>Post {contentData._id}</h1>
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
                  </>
                )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
            )
          }
        </div>
    </>
  )
}