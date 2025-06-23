"use client"
import { Code, Promotion, State } from '@/components/promotional-codes'
import { Button2, Button2Red, ButtonSubmit, Popup, Spinner, Spinner2 } from '@/components/ui'
import { IPromotionalCode } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page ({ params }: { params: { slug: string } }) {

  const [codeInfo, setCodeInfo] = useState<Partial<IPromotionalCode>>()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [minimunPrice, setMinimunPrice] = useState(false)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getPromotionalCode = async () => {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${params.slug}`)
      setCodeInfo(data)
      if (data.minimumAmount !== 0) {
        setMinimunPrice(true)
      }
    }

    getPromotionalCode()
  }, [params.slug])

  const inputChange = (e: any) => {
    setCodeInfo({...codeInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!submitLoading) {
      setSubmitLoading(true)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${params.slug}`, codeInfo)
      router.push('/productos/codigos-promocionales')
      setSubmitLoading(false)
    }
  }

  const deleteCode = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${codeInfo?._id}`)
      router.refresh()
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{codeInfo?.promotionalCode}</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar el codigo: <span className='font-semibold'>{codeInfo?.promotionalCode}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteCode} color='red-500' submitLoading={loading} textButton='Eliminar codigo' config='w-40' />
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
              <ButtonSubmit action={handleSubmit} color='main' submitLoading={submitLoading} textButton='Modificar codigo' config='w-40' />
              <Link className='my-auto text-sm' href='/productos/codigos-promocionales'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-bg flex flex-col gap-6 overflow-y-auto dark:bg-neutral-900' style={{ height: 'calc(100% - 65px)' }}>
          {
            codeInfo
              ? (
                <>
                  <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
                    <Link href='/productos/codigos-promocionales' className='border rounded-lg p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-lg font-medium mt-auto mb-auto'>{codeInfo.promotionalCode}</h1>
                  </div>
                  <form className='flex gap-6 w-full max-w-[1280px] mx-auto flex-col lg:flex-row'>
                    <div className='flex gap-6 flex-col w-full lg:w-2/3'>
                      <Code codeInfo={codeInfo} inputChange={inputChange} />
                      <Promotion codeInfo={codeInfo} inputChange={inputChange} minimunPrice={minimunPrice} setMinimunPrice={setMinimunPrice} />
                    </div>
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                      <State codeInfo={codeInfo} setCodeInfo={setCodeInfo} />
                      <div className='flex flex-col gap-4 p-2'>
                        <h2 className='font-medium text-[15px]'>Eliminar cupon</h2>
                        <Button2Red action={(e: any) => {
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