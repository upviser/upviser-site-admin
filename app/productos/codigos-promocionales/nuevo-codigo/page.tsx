"use client"
import { Code, Promotion, State } from '@/components/promotional-codes'
import { Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default function Page () {

  const [codeInfo, setCodeInfo] = useState({
    promotionalCode: '',
    discountType: 'Porcentaje',
    value: '',
    minimumAmount: '',
    state: false
  })
  const [minimunPrice, setMinimunPrice] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  let promotionalCode = ''

  const inputChange = (e: any) => {
    setCodeInfo({...codeInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!submitLoading) {
      setSubmitLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code`, codeInfo)
      router.push('/productos/codigos-promocionales')
      setSubmitLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Nuevo codigo promocional</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 250px)' }}>
          <div className='flex m-auto w-full max-w-[1280px]'>
            <div className='flex gap-6 ml-auto w-fit'>
              {
                codeInfo.promotionalCode === promotionalCode
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed w-36 h-10 text-white text-sm rounded-xl'>Crear codigo</button>
                  : <button onClick={handleSubmit} className='bg-main border border-main transition-colors duration-200 text-white text-sm rounded-xl w-36 h-10 hover:bg-transparent hover:text-main'>{submitLoading ? <Spinner2 /> : 'Crear codigo'}</button>
              }
              <Link className='text-sm my-auto' href='/productos/codigos-promocionales'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 w-full flex flex-col gap-6 min-h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='flex gap-3 w-full max-w-[1280px] mx-auto'>
            <Link href='/productos/codigos-promocionales' className='border rounded-lg p-2 transition-colors duration-150 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-lg font-medium my-auto'>Nuevo codigo promocional</h1>
          </div>
          <form className='flex gap-6 w-full max-w-[1280px] mx-auto'>
            <div className='flex gap-6 flex-col w-2/3'>
              <Code codeInfo={codeInfo} inputChange={inputChange} />
              <Promotion codeInfo={codeInfo} inputChange={inputChange} minimunPrice={minimunPrice} setMinimunPrice={setMinimunPrice} />
            </div>
            <div className='w-1/3 flex flex-col gap-6'>
              <State codeInfo={codeInfo} setCodeInfo={setCodeInfo} />
            </div>
          </form>
        </div>
    </>
  )
}