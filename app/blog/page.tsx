"use client"
import { ButtonLink, ButtonSubmit, Popup, Spinner, Table } from '@/components/ui'
import { IPost } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Page () {

  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [postSelect, setPostSelect] = useState({
    _id: '',
    title: ''
  })
  
  const router = useRouter()

  const getPosts = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    if (response.data) {
      setPosts(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postSelect._id}`)
      router.refresh()
      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
      setTimeout(() => {
        setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
      }, 200)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
        <Popup popup={popup} setPopup={setPopup}>
          <p>Estas seguro que deseas eliminar el post: <span className='font-semibold'>{postSelect.title}</span></p>
          <div className='flex gap-6'>
            <ButtonSubmit action={deleteProduct} color='red-500' submitLoading={loading} textButton='Eliminar blog' config='w-36' />
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
            <h1 className='text-lg font-medium my-auto'>Blog</h1>
            <ButtonLink href='/blog/nuevo-post'>Agregar post</ButtonLink>
          </div>
          <div className='w-full max-w-[1280px] mx-auto'>
            {
              loading
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : posts.length
                  ? (
                    <Table th={['Imagen', 'Titulo', 'Estado', 'Fecha']}>
                      {
                        posts.map((post, index) => (
                          <tr className={`${index + 1 < posts.length ? 'border-b border-border' : ''} text-sm bg-white cursor-pointer transition-colors duration-150 w-full dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700`} key={post._id}>
                            <td className='p-3 w-3/12' onClick={() => router.push(`/blog/${post._id}`)}>
                              <Image className='w-20 object-contain' src={post.image!} alt={`Imagen post ${post.title}`} width={100} height={100} />
                            </td>
                            <td className='p-3 w-4/12' onClick={() => router.push(`/blog/${post._id}`)}>
                              <p>{post.title}</p>
                            </td>
                            <td className='p-3 w-2/12' onClick={() => router.push(`/blog/${post._id}`)}>
                              {
                                post.state === true
                                  ? <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                  : <p className='w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Borrador</p>
                              }
                            </td>
                            <td className='p-3 w-2/12' onClick={() => router.push(`/blog/${post._id}`)}>
                              <p>{new Date(post.createdAt!).toLocaleDateString()}</p>
                            </td>
                            <td className='p-3 w-1/12'>
                              <button onClick={async(e: any) => {
                                e.preventDefault()
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                                setPostSelect({ _id: post._id!, title: post.title })
                              }}><AiOutlineClose /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </Table>
                  )
                  : <p>No hay posts</p>
            }
          </div>
        </div>
    </>
  )
}