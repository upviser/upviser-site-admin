"use client"
import { ShippingCost } from '@/components/product'
import { ButtonSubmit, Card, Input, Select, Spinner2 } from '@/components/ui'
import { IProduct, ISell } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

export default function Page () {

  const [sell, setSell] = useState<ISell>({
    address: '',
    cart: [],
    city: '',
    email: '',
    firstName: '',
    pay: '',
    region: '',
    shipping: 0,
    shippingMethod: '',
    shippingState: '',
    state: '',
    total: 0
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [chilexpress, setChilexpress] = useState([])

  const router = useRouter()

  const initialEmail = ''

  const getProducts = async () => {
    const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(products.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const inputChange = (e: any) => {
    setSell({...sell, [e.target.name]: e.target.value})
  }

  const selectProduct = (e: any) => {
    const product = products.find(product => product.name === e.target.value)
    if (product) {
      setSell({...sell, cart: sell.cart.concat({
        category: product.category.category,
        image: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        _id: product._id,
        beforePrice: product.beforePrice ? product.beforePrice : undefined,
        stock: product.stock,
        dimentions: product.dimentions
      })})
    }
  }

  const sellSubmit = async () => {
    if (!submitLoading) {
      setSubmitLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, sell)
      setSubmitLoading(false)
      router.push('/ventas')
    }
  }

  return (
    <>
      <Head>
        <title>Nueva venta</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 250px)' }}>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              {
                sell.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed w-36 h-10 text-white text-sm rounded-xl'>Crear venta</button>
                  : <ButtonSubmit action={sellSubmit} submitLoading={submitLoading} textButton='Crear venta' color='main' config='w-36' />
              }
              <Link className='text-sm my-auto' href='/ventas'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-bg flex flex-col gap-6 w-full overflow-y-scroll dark:bg-neutral-900' style={{ height: 'calc(100% - 73px)' }}>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/ventas' className='border border-border rounded-lg p-2 bg-white transition-colors duration-150 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto font-medium'>Nueva venta de productos</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] m-auto'>
            <div className='flex gap-6 flex-col w-2/3'>
              <Card title='Productos'>
                <div>
                  <Select change={selectProduct}>
                    <option>Seleccionar producto</option>
                    {
                      products.length
                        ? products.map(product => (
                          <option key={product._id}>{product.name}</option>
                        ))
                        : ''
                    }
                  </Select>
                </div>
                <div className='flex flex-col gap-2'>
                  {
                    sell.cart.length
                      ? sell.cart.map((product, index) => (
                        <div className='flex gap-2 justify-between' key={product._id}>
                          <div className='flex gap-2'>
                            <Image className='w-20 h-20 object-contain' src={product.image} alt={`Imagen de producto ${product.name}`} width={100} height={100} />
                            <div className='mt-auto mb-auto'>
                              <p>{product.name}</p>
                              <p>${NumberFormat(product.price)}</p>
                              {
                                products.find(prod => prod.name === product.name)?.variations?.nameVariation !== ''
                                  ? (
                                    <Select change={(e: any) => {
                                      const variation = products.find(prod => prod.name === product.name)?.variations?.variations.find(variation => variation.variation === e.target.value)
                                      product.variation = variation
                                      sell.cart[index] = product
                                      setSell({...sell, cart: sell.cart})
                                    }}>
                                      <option>Seleccionar variación</option>
                                      {
                                        products.find(prod => prod.name === product.name)?.variations?.variations.map(variation => (
                                          <option key={variation.variation}>{variation.variation}{variation.subVariation && variation.subVariation !== '' ? ` - ${variation.subVariation}` : ''}{variation.subVariation2 && variation.subVariation2 !== '' ? ` - ${variation.subVariation2}` : ''}</option>
                                        ))
                                      }
                                    </Select>
                                  )
                                  : ''
                              }
                            </div>
                          </div>
                          <Input type='number' change={(e: any) => {
                            if (Number(product.stock) >= e.target.value && e.target.value >= 0) {
                              const updatedCart = [...sell.cart]
                              updatedCart[index].quantity = e.target.value
                              setSell({...sell, cart: updatedCart})
                            }
                          }} config='w-20' />
                          <p className='mt-auto mb-auto'>${NumberFormat(product.price * Number(product.quantity))}</p>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const updatedCart = sell.cart.filter(prod => prod.name !== product.name)
                            setSell({...sell, cart: updatedCart})
                          }}><IoClose className='mt-auto mb-auto text-lg' /></button>
                        </div>
                      ))
                      : ''
                  }
                </div>
                <div className='flex gap-2 justify-between'>
                  <p>Total</p>
                  <p>${NumberFormat(sell.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0))}</p>
                </div>
              </Card>
              <Card title='Datos'>
                <div className='flex gap-2'>
                  <div className='w-1/2'>
                    <p className='mb-2 text-sm'>Nombre</p>
                    <Input placeholder='Nombre' name='firstName' change={inputChange} value={sell.firstName} />
                  </div>
                  <div className='w-1/2'>
                    <p className='mb-2 text-sm'>Apellido</p>
                    <Input placeholder='Apellido' name='lastName' change={inputChange} value={sell.lastName!} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Correo electronico</p>
                  <Input placeholder='Email' name='email' change={inputChange} value={sell.email} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Telefono</p>
                  <div className='flex gap-2'>
                    <p className='m-auto text-sm rounded dark:border-neutral-600'>+56</p>
                    <Input placeholder='Teléfono' name='phone' change={inputChange} value={sell.phone!} />
                  </div>
                </div>
              </Card>
              <Card title='Dirección'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Calle</p>
                  <Input placeholder='Calle' name='address' change={inputChange} value={sell.address} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Departamento, local, etc. (Opcional)</p>
                  <Input placeholder='Detalles' name='details' change={inputChange} value={sell.details!} />
                </div>
                <ShippingCost setClientData={setSell} clientData={sell} setChilexpress={setChilexpress} />
              </Card>
            </div>
            <div className='flex gap-6 flex-col w-1/3'>
              <Card title='Envío'>
                {
                  sell.city !== ''
                    ? (
                      <>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Metodo de envío</p>
                          <Select change={inputChange} name='shippingMethod'>
                            <option>Seleccionar metodo de envío</option>
                            <option>Chilexpress</option>
                          </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Estado del envío</p>
                          <Select change={inputChange} name='shippingState'>
                            <option>Seleccionar estado del envío</option>
                            <option>No empaquetado</option>
                            <option>Productos empaquetados</option>
                            <option>Envío realizado</option>
                          </Select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa la región y ciudad para ver las opciones de envíos</p>
                }
                {
                  chilexpress.length
                    ? sell.shippingMethod === 'Chilexpress'
                      ? (
                        <div className='flex flex-col gap-2'>
                          {
                            chilexpress.map((service: any) => (
                              <div className='flex gap-2 justify-between' key={service.serviceDescription}>
                                <div className='flex gap-2'>
                                  <input type='radio' name='shipping' onClick={() => setSell({...sell, shipping: service.serviceValue, total: Number(sell.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)) + Number(service.serviceValue)})} />
                                  <p className='text-sm'>{service.serviceDescription}</p>
                                </div>
                                <p className='text-sm'>${NumberFormat(service.serviceValue)}</p>
                              </div>
                            ))
                          }
                        </div>
                      )
                      : ''
                    : ''
                }
              </Card>
              <Card title='Pago'>
                {
                  sell.shippingMethod
                    ? (
                      <>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Metodo de pago</p>
                          <Select change={inputChange} name='pay'>
                            <option>Seleccionar metodo de pago</option>
                            <option>WebPay Plus</option>
                            <option>MercadoPago</option>
                            <option>Transferencia</option>
                          </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>Estado del pago</p>
                          <Select change={inputChange} name='state'>
                            <option>Seleccionar estado del pago</option>
                            <option>Pago no realizado</option>
                            <option>Pago iniciado</option>
                            <option>Pago rechazado</option>
                            <option>Pago realizado</option>
                          </Select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa los datos de envío para ver las opciones de pago</p>
                }
              </Card>
            </div>
          </form>
        </div>
    </>
  )
}