"use client"
import { CategoryProduct, Information, Media, NameDescription, Price, ProductOffer, ProductSeo, QuantityOffers, StockVariations, Visibility } from '@/components/product'
import { ButtonSubmit, NewCategoryModal, Spinner2 } from '@/components/ui'
import { ICategory, IProduct, IProductsOffer } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [information, setInformation] = useState<IProduct>({
    name: '',
    description: '',
    category: { category: '', slug: '' },
    price: 0,
    images: [],
    stock: 0,
    slug: '',
    state: false,
    tags: [],
    titleSeo: '',
    descriptionSeo: '',
    variations: { nameVariation: '', formatVariation: 'Imagen', nameVariations: [{ variation: '', colorVariation: '#000000' }], variations: [] },
    informations: [{ title: '', description: '', image: '', align: 'Izquierda' }],
    dimentions: { height: '', length: '', weight: '', width: '' }
  })
  const [categories, setCategories] = useState<ICategory[]>()
  const [quantityOffers, setQuantityOffers] = useState([{
    quantity: undefined,
    descount: undefined
  }])

  const initial = {
    name: ''
  }

  const [newCategory, setNewCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const getCategories = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    if (response.data) {
      setCategories(response.data)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async () => {
    if (!submitLoading) {
      setSubmitLoading(true)
      setError('')
      if (!information?.name || information?.name === '') {
        setError('El producto debe tener un nombre')
        setSubmitLoading(false)
        return
      }
      if (!information?.description || information?.description === '') {
        setError('El producto debe tener una descripción')
        setSubmitLoading(false)
        return
      }
      if (!information?.slug || information?.slug === '') {
        setError('El producto debe tener un slug')
        setSubmitLoading(false)
        return
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, { name: information?.name, description: information?.description, category: information?.category, price: information?.price, beforePrice: information?.beforePrice, images: information?.images, stock: information?.stock, slug: information?.slug, state: information?.state, tags: information?.tags, titleSeo: information?.titleSeo, descriptionSeo: information?.descriptionSeo, variations: information?.variations, productsOffer: productsOffer, cost: information?.cost, quantityOffers: quantityOffers, informations: information.informations })
      router.push('/productos')
    }
  }

  return (
    <>
      <Head>
        <title>Nuevo Producto</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            {
              error !== ''
                ? <p className='bg-red-500 text-white p-2 w-fit'>{error}</p>
                : ''
            }
            <div className='flex gap-6 ml-auto w-fit'>
              {
                information.name === initial.name
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed text-white text-sm rounded-xl w-40 h-10'>Crear producto</button>
                  : <ButtonSubmit action={handleSubmit} color='main' submitLoading={submitLoading} textButton='Crear producto' config='w-40' /> 
              }
              <Link className='my-auto text-sm' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal setCategories={setCategories} newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/productos' className='border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg my-auto font-medium'>Nuevo Producto</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
            <div className='flex gap-6 flex-col w-full lg:w-2/3'>
              <NameDescription information={information} setInformation={setInformation} />
              <Media information={information} setInformation={setInformation} />
              <StockVariations information={information} setInformation={setInformation} />
              <ProductOffer productsOffer={productsOffer} setProductsOffer={setProductsOffer} />
              <Information information={information} setInformation={setInformation} />
              <ProductSeo information={information} setInformation={setInformation} />
            </div>
            <div className='w-full lg:w-1/3 flex flex-col gap-6'>
              <Visibility information={information} setInformation={setInformation} />
              <Price information={information} setInformation={setInformation} />
              <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} newCategory={newCategory} />
              <QuantityOffers quantityOffers={quantityOffers} setQuantityOffers={setQuantityOffers} />
            </div>
          </form>
        </div>
    </>
  )
}