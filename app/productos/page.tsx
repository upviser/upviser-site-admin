"use client"
import { ButtonLink, ButtonSubmit, Popup, Spinner, Table } from '@/components/ui'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [productSelect, setProductSelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [products, setProducts] = useState([])

  const router = useRouter()

  const getProducts = async () => {
    setLoadingProducts(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(res.data)
    setLoadingProducts(false)
  }
  
  useEffect(() => {
    getProducts()
  }, [])

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSelect._id}`)
    setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
    getProducts()
    setTimeout(() => {
      setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
    }, 200)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar el producto: <span className='font-semibold'>{productSelect.name}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteProduct} color='red-500' submitLoading={loading} textButton='Eliminar producto' config='w-44' />
            <button onClick={() => {
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='text-sm'>Cancelar</button>
          </div>
        </Popup>
        <div className='p-4 lg:p-6 flex flex-col gap-6 w-full h-full bg-bg overflow-y-auto dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg my-auto font-medium'>Productos</h1>
            <ButtonLink href='/productos/nuevo-producto'>Nuevo producto</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loadingProducts
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : products.length
                  ? (
                    <Table th={['Producto', 'Precio', 'Estado', 'Stock', 'Categoria']}>
                      {
                        products.map((product: any, index) => (
                          <tr className={`${index + 1 < products.length ? 'border-b border-border' : ''} text-sm cursor-pointer w-full transition-colors bg-white duration-150 dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={product._id}>
                            <td className='flex gap-2 p-2 min-w-48' style={{width: '100%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                              {
                                product.images.length && product.images[0] && product.images[0] !== ''
                                  ? <Image className='w-20 object-contain' src={product.images[0]} alt={`Imagen producto ${product.name}`} width={100} height={100} />
                                  : ''
                              }
                              <div className='mt-auto mb-auto w-full'>
                                <p>{product.name}</p>
                              </div>
                            </td>
                            <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                              <p>${NumberFormat(product.price)}</p>
                              {
                                product.beforePrice
                                  ? <p className='text-sm line-through'>${NumberFormat(product.beforePrice)}</p>
                                  : ''
                              }
                            </td>
                            <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                              {
                                product.state === true
                                  ? <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                  : <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Borrador</p>
                              }
                            </td>
                            <td className='p-2' style={{width: '10%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                              <p>{product.stock}</p>
                            </td>
                            <td className='p-2' style={{width: '20%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                              <p>{product.category.category}</p>
                            </td>
                            <td className='p-2'>
                              <button onClick={async(e: any) => {
                                e.preventDefault()
                                setProductSelect({ _id: product._id!, name: product.name })
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}><AiOutlineClose /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>No hay productos</p>
            }
          </div>
        </div>
    </>
  )
}