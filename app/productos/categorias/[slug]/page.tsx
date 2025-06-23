"use client"
import { Button2, Button2Red, ButtonSubmit, Popup, Spinner, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../../interfaces/categories'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { NameDescription, CategorySeo, Media } from '@/components/categories'

export default function Page ({ params }: { params: { slug: string } }) {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>()
  const [updatingLoading, setUpdatingLoading] = useState(false)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${params.slug}`)
      setCategoryInfo(data)
    }

    getCategory()
  }, [params.slug])

  const handleSubmit = async () => {
    if (!updatingLoading) {
      setUpdatingLoading(true)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`, categoryInfo)
      router.push('/productos/categorias')
    }
  }

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`)
      router.push('/productos/categorias')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{categoryInfo?.category}</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar la categoria: <span className='font-semibold'>{categoryInfo?.category}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteCategory} color='red-500' submitLoading={loading} textButton='Eliminar categoría' config='w-44' />
            <button onClick={() => {
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='text-sm'>Cancelar</button>
          </div>
        </Popup>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={updatingLoading} textButton='Modificar categoría' config='w-44' />
              <Link className='text-sm my-auto' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 w-full flex flex-col gap-4 overflow-y-auto bg-bg mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          {
            categoryInfo
              ? (
                <>
                  <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
                    <Link href='/productos/categorias' className='border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-lg font-medium mt-auto mb-auto'>{ categoryInfo.category }</h1>
                  </div>
                  <form className='flex gap-6 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
                    <div className='flex gap-6 flex-col w-full lg:w-2/3'>
                      <NameDescription categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <CategorySeo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                    </div>
                    <div className='flex gap-6 flex-col w-full lg:w-1/3'>
                      <Media categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <div className='flex flex-col gap-4 p-2'>
                        <h2 className='font-medium text-[15px]'>Eliminar categoria</h2>
                        <Button2Red action={async (e: any) => {
                          e.preventDefault()
                          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                          setTimeout(() => {
                            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                          }, 10)
                        }}>Eliminar</Button2Red>
                      </div>
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