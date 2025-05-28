"use client"
import { ButtonLink, ButtonSubmit, Popup, Spinner, Spinner2, Table } from '@/components/ui'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const router = useRouter()

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [codeSelect, setCodeSelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingCodes, setLoadingCodes] = useState(true)
  const [codes, setCodes] = useState([])

  const getCodes = async () => {
    setLoadingCodes(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code`)
    setCodes(res.data)
    setLoadingCodes(false)
  }

  useEffect(() => {
    getCodes()
  }, [])

  const deleteCode = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${codeSelect._id}`)
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      getCodes()
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
      }, 200)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Codigos Promocionales</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar el codigo: <span className='font-semibold'>{codeSelect.name}</span></p>
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
        <div className='p-6 bg-bg flex flex-col gap-6 min-h-full overflow-y-auto w-full dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>Codigos promocionales</h1>
            <ButtonLink href='/productos/codigos-promocionales/nuevo-codigo'>Nuevo codigo</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loadingCodes
                ? (
                    <div className="flex w-full">
                      <div className="m-auto mt-16 mb-16">
                        <Spinner />
                      </div>
                    </div>
                  )
                : codes.length
                  ? (
                    <Table th={['Codigo promocional', 'Tipo de descuento', 'Valor del descuento', 'Precio minimo', 'Estado']}>
                      {
                        codes.map((promotionalCode: any, index) => (
                          <tr className={`${index + 1 < codes.length ? 'border-b border-border' : ''} text-sm bg-white transition-colors duration-150 cursor-pointer w-full dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={promotionalCode._id}>
                            <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                              <p>{promotionalCode.promotionalCode}</p>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                              <p>{promotionalCode.discountType}</p>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                              <p>{promotionalCode.value}</p>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/codigos-promocionales/${promotionalCode.promotionalCode}`)}>
                              <p>${NumberFormat(Number(promotionalCode.minimumAmount))}</p>
                            </td>
                            <td className='p-2' onClick={() => router.push(`/productos/${promotionalCode.promotionalCode}`)}>
                              <p>
                                {
                                  promotionalCode.state === true
                                    ? <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                    : <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Desactivado</p>
                                }
                              </p>
                            </td>
                            <td className='p-2'>
                              <button onClick={(e: any) => {
                                e.preventDefault()
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                                setCodeSelect({ _id: promotionalCode._id!, name: promotionalCode.promotionalCode })
                              }} className='flex'><AiOutlineClose className='my-auto' /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>No hay codigos promocionales</p>
            }
          </div>
        </div>
    </>
  )
}