"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ButtonLink, ButtonSubmit, Popup, Spinner, Table } from '../../../components/ui/'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import Image from 'next/image'

export default function Page () {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [categorySelect, setcategorySelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const router = useRouter()

  const getCategories = async () => {
    setLoadingCategories(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(res.data)
    setLoadingCategories(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySelect._id}`)
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      getCategories()
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
      }, 200)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Categorías</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar la categoría: <span className='font-semibold'>{categorySelect.name}</span></p>
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
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full bg-bg overflow-y-auto dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>Categorías</h1>
            <ButtonLink href='/productos/categorias/nueva-categoria'>Nueva categoría</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loadingCategories
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : categories.length
                  ? (
                    <Table th={['Categoría', 'Slug', 'Cantidad productos']}>
                      {
                        categories.map((category: any, index) => (
                          <tr key={category._id} className={`${index + 1 < categories.length ? 'border-b border-border' : ''} text-sm bg-white cursor-pointer transition-colors duration-150 w-full dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700`}>
                            <td className='flex gap-2 p-2 min-w-48' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                              {
                                category.image && category.image !== ''
                                  ? <Image className='w-20 object-contain' src={category.image} alt={category.category} width={100} height={100} />
                                  : ''
                              }
                              <div className='mt-auto mb-auto w-full'>
                                <p>{category.category}</p>
                              </div>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                              <p>{category.slug}</p>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                              <p>{products.length ? products.filter((product: any) => product.category.category === category.category).length : ''}</p>
                            </td>
                            <td className='p-2'>
                              <button onClick={async(e: any) => {
                                e.preventDefault()
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                                setcategorySelect({ _id: category._id!, name: category.category })
                              }}><AiOutlineClose /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>No hay categorías</p>
            }
          </div>
        </div>
    </>
  )
}