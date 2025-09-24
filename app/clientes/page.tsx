"use client"
import { ButtonLink, Select, Spinner, Table } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<IClient[]>([])
  const [clientTags, setClientsTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('')

  const router = useRouter()

  const getClients = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getClients()
  }, [])

  const getClientsTags = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setClientsTags(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getClientsTags()
  }, [])

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>Clientes</h1>
            <ButtonLink href='/clientes/nuevo-cliente'>Agregar cliente</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto flex flex-col gap-4'>
            {
              loading
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : clients.length
                  ? (
                    <>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Filtrar por tags</p>
                        <Select change={(e: any) => setSelectedTag(e.target.value)} config='w-fit'>
                          <option value=''>Seleccionar tag</option>
                          {
                            clientTags.map((tag: any) => (
                              <option key={tag._id}>{tag.tag}</option>
                            ))
                          }
                        </Select>
                      </div>
                      <Table th={['Email', 'Nombre', 'Teléfono']}>
                        {
                          selectedTag !== ''
                            ? clients.filter(client => client.tags?.includes(selectedTag)).map((client, index) => (
                              <tr onClick={() => router.push(`/clientes/${client.email}`)} className={`${index + 1 < clients.length ? 'border-b border-border' : ''} text-sm bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={client._id}>
                                <td className='p-3'>
                                  <p>{client.email}</p>
                                </td>
                                <td className='p-3'>
                                  <p>{client.firstName} {client.lastName}</p>
                                </td>
                                <td className='p-3'>
                                  <p>{client.phone}</p>
                                </td>
                              </tr>
                            ))
                            : (
                              clients.map((client, index) => (
                                <tr onClick={() => router.push(`/clientes/${client.email}`)} className={`${index + 1 < clients.length ? 'border-b border-border' : ''} text-sm bg-white cursor-pointer w-full transition-colors duration-150 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={client._id}>
                                  <td className='p-3'>
                                    <p>{client.email}</p>
                                  </td>
                                  <td className='p-3'>
                                    <p>{client.firstName} {client.lastName}</p>
                                  </td>
                                  <td className='p-3'>
                                    <p>{client.phone}</p>
                                  </td>
                                </tr>
                              ))
                            )
                        }
                      </Table>
                    </>
                  )
                  : <p className='text-sm'>Aun no tienes clientes</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}