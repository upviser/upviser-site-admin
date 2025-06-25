"use client"
import { ButtonLink, ButtonSubmit, Popup, Spinner, Spinner2, Table } from '@/components/ui'
import { IEmail } from '@/interfaces'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [campaigns, setCampaigns] = useState<IEmail[]>([])
  const [loading, setLoading] = useState(false)
  const [campaignSelect, setCampaignSelect] = useState({ _id: '', campaign: '' })
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [shopLogin, setShopLogin] = useState<any>()

  const { data: session } = useSession()

  const router = useRouter()

  const getCampaigns = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
    setCampaigns(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const getShopLogin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`)
    setShopLogin(res.data)
  }

  useEffect(() => {
    getShopLogin()
  }, [])

  const deleteCampaign = async (e: any) => {
    e.preventDefault()
    if (!loadingDelete) {
      setLoadingDelete(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${campaignSelect._id}`)
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      getCampaigns()
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
        setLoadingDelete(false)
      }, 200)
    }
  }

  return (
    <>
      <Head>
        <title>Campañas</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar la campaña: <span className='font-semibold'>{campaignSelect.campaign}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteCampaign} color='red-500' submitLoading={loadingDelete} textButton='Eliminar campaña' config='w-44' />
            <button onClick={() => {
              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='text-sm'>Cancelar</button>
          </div>
        </Popup>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>Campañas</h1>
            {
              session?.user.type === 'Administrador'
                ? <ButtonLink href='/email-marketing/campanas/nueva-campana'>Crear campaña</ButtonLink>
                : ''
            }
          </div>
          <p className='p-2 border w-fit bg-white rounded-xl dark:border-neutral-700 dark:bg-neutral-800'>Emails disponibles: {shopLogin?.emails}</p>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loading
                ? (
                  <div className='w-full mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : campaigns.length
                  ? (
                    <Table th={['Receptores', 'Asunto', 'Fecha', 'Estado']}>
                      {
                        campaigns.map((campaign, index) => {
                          const campaignDate = new Date(campaign.date!)
                          const date = new Date()
                          const day = String(campaignDate.getUTCDate()).padStart(2, '0')
                          const month = String(campaignDate.getUTCMonth() + 1).padStart(2, '0')
                          const year = String(campaignDate.getUTCFullYear())
                          return (
                            <tr key={campaign._id} className={`${index + 1 < campaigns.length ? 'border-b border-border' : ''} text-sm bg-white border-neutral-300 transition-colors duration-150 cursor-pointer dark:bg-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700`}>
                              <td className='p-3' onClick={() => router.push(`/email-marketing/campanas/${campaign._id}`)}>{campaign.address}</td>
                              <td className='p-3' onClick={() => router.push(`/email-marketing/campanas/${campaign._id}`)}>{campaign.affair}</td>
                              <td className='p-3' onClick={() => router.push(`/email-marketing/campanas/${campaign._id}`)}>{`${day}/${month}/${year}`}</td>
                              <td className='p-3' onClick={() => router.push(`/email-marketing/campanas/${campaign._id}`)}>{campaignDate < date ? 'Completado' : 'No completado'}</td>
                              {
                                session?.user.type === 'Administrador'
                                  ? (
                                    <td className='p-3' onClick={(e: any) => {
                                      e.preventDefault()
                                      setCampaignSelect({ _id: campaign._id!, campaign: campaign.title })
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
                  : <p className='text-sm'>No hay campañas creadas</p>
            }
          </div>
        </div>
    </>
  )
}