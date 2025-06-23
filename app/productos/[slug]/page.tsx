"use client"
import { Button2, Button2Red, ButtonSubmit, NewCategoryModal, Spinner, Spinner2 } from '@/components/ui'
import { IProduct } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'
import Head from 'next/head'
import { ICategory } from '../../../interfaces'
import { CategoryProduct, Information, Media, NameDescription, Price, ProductOffer, ProductSeo, QuantityOffers, StockVariations, Visibility } from '@/components/product'
import { IProductsOffer } from '../../../interfaces/products'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Page ({ params }: { params: { slug: string } }) {

  const [information, setInformation] = useState<IProduct>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [quantityOffers, setQuantityOffers] = useState([{
    quantity: undefined,
    descount: undefined
  }])
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getProduct = async () => {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug}`)
      setInformation(data)
      setProductsOffer(data.productsOffer?.length ? data.productsOffer : [{productsSale: [], price: 0}])
      setQuantityOffers(data.quantityOffers?.length ? data.quantityOffers : [{
        quantity: undefined,
        descount: undefined
      }])
    }
  
    const getCategories = async () => {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      setCategories(data)
    }

    getProduct()
    getCategories()
  }, [params.slug])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`, { name: information?.name, description: information?.description, category: information?.category, price: information?.price, beforePrice: information?.beforePrice, images: information?.images, stock: information?.stock, slug: information?.slug, state: information?.state, tags: information?.tags, titleSeo: information?.titleSeo, descriptionSeo: information?.descriptionSeo, variations: information?.variations, productsOffer: productsOffer, cost: information?.cost, quantityOffers: quantityOffers, informations: information?.informations, dimentions: information?.dimentions })
    router.push('/productos')
  }

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`)
      router.push('/productos')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{information?.name}</title>
      </Head>
        <div onClick={() => {
          if (!popup.mouse) {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
            }, 200)
          }
        }} className={`${popup.view} ${popup.opacity} ${popup} transition-opacity duration-200 right-0 w-full h-full top-0 z-50 left-0 fixed flex bg-black/30`}>
          <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-[500px] p-5 flex flex-col gap-2 rounded-xl bg-white border border-border m-auto dark:bg-neutral-800 dark:border-neutral-700`}>
            <p>Estas seguro que deseas eliminar el producto: <span className='font-semibold'>{information?.name}</span></p>
            <div className='flex gap-6'>
              <ButtonSubmit action={deleteProduct} color='red-500' submitLoading={loading} textButton='Eliminar producto' config='w-44' />
              <button onClick={() => {
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700 w-full lg:w-[calc(100%-250px)]'>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={submitLoading} textButton='Modificar producto' config='w-44' />
              <Link className='text-sm my-auto' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal setCategories={setCategories} newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 w-full bg-bg flex flex-col gap-6 overflow-y-auto mb-16 dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          {
            information
              ? (
                <>
                  <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
                    <Link href='/productos' className='border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-lg font-medium my-auto'>{ information.name }</h1>
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
                      <Visibility setInformation={setInformation} information={information} />
                      <Price information={information} setInformation={setInformation} />
                      <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} newCategory={newCategory} />
                      <QuantityOffers quantityOffers={quantityOffers} setQuantityOffers={setQuantityOffers} />
                      <div className='p-2 flex flex-col gap-4'>
                        <h2 className='font-medium text-[15px]'>Eliminar producto</h2>
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