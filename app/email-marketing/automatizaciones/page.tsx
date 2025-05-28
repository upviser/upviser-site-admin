"use client"
import { ButtonLink, ButtonSubmit, Popup, Spinner, Table } from '@/components/ui'
import { IAutomatization } from '@/interfaces'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [loading, setLoading] = useState(false)
  const [automatizations, setAutomatizations] = useState<IAutomatization[]>([])
  const [automatizationSelect, setAutomatizationSelect] = useState({ _id: '', automatization: '' })
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingDelete, setLoadingDelete] = useState(false)

  const { data: session } = useSession()

  const router = useRouter()

  const getAutomatizations = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/automatizations`)
    setAutomatizations(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getAutomatizations()
  }, [])

  const deleteAutomatization= async (e: any) => {
    e.preventDefault()
    if (!loadingDelete) {
      setLoadingDelete(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/automatization/${automatizationSelect._id}`)
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      getAutomatizations()
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
        setLoadingDelete(false)
      }, 200)
    }
  }

  return (
    <>
      <Head>
        <title>Automatizaciones</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar la campaña: <span className='font-semibold'>{automatizationSelect.automatization}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteAutomatization} color='red-500' submitLoading={loadingDelete} textButton='Eliminar automatización' config='w-52' />
            <button onClick={() => {
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='text-sm'>Cancelar</button>
          </div>
        </Popup>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full max-h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto flex-col gap-2 lg:flex-row'>
            <h1 className='text-lg font-medium my-auto'>Automatizaciones</h1>
            {
              session?.user.type === 'Administrador'
                ? <ButtonLink href='/email-marketing/automatizaciones/nueva-automatizacion' >Crear automatización</ButtonLink>
                : ''
            }
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='m-auto w-fit'>
                      <Spinner />
                    </div>
                  </div>
                )
                : automatizations.length
                  ? (
                    <Table th={['Nombre', 'Acción inicio', 'Segmento', 'Pasos']}>
                      {
                        automatizations.map((automatization, index) => {
                          return (
                            <tr className={`${index + 1 < automatizations.length ?  'border-b border-border': ''} text-sm bg-white cursor-pointer transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={automatization.name}>
                              <td className='p-3 dark:border-neutral-700' onClick={() => router.push(`/email-marketing/automatizaciones/${automatization._id}`)}>{automatization.name}</td>
                              <td className='p-3 dark:border-neutral-700' onClick={() => router.push(`/email-marketing/automatizaciones/${automatization._id}`)}>{automatization.startType}</td>
                              <td className='p-3 dark:border-neutral-700' onClick={() => router.push(`/email-marketing/automatizaciones/${automatization._id}`)}>{automatization.startValue}</td>
                              <td className='p-3 dark:border-neutral-700' onClick={() => router.push(`/email-marketing/automatizaciones/${automatization._id}`)}>{automatization.automatization.length}</td>
                              {
                                session?.user.type === 'Administrador'
                                  ? (
                                    <td className='p-3 dark:border-neutral-700' onClick={(e: any) => {
                                      e.preventDefault()
                                      setAutomatizationSelect({ _id: automatization._id!, automatization: automatization.name })
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }}><AiOutlineClose /></td>
                                  )
                                  : ''
                              }
                            </tr>
                          )
                        })
                      }
                    </Table>
                  )
                  : <p className='text-sm'>No hay automatizaciones creadas</p>
            }
          </div>
        </div>
    </>
  )
}