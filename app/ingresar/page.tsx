"use client"
import { Button, Input, Spinner } from '@/components/ui'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page () {

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'Administrador',
    plan: '',
    textAI: 0,
    imageAI: 0,
    videoAI: 0,
    conversationsAI: 0,
    emails: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [accounts, setAccounts] = useState<[]>()

  const searchParams = useSearchParams()

  useEffect(() => {
    const getPlan = () => {
      const planParam = searchParams.get("plan")
      setLoginData({ ...loginData, plan: planParam ? planParam : '', textAI: planParam ? planParam === 'Esencial' ? 10000 : planParam === 'Avanzado' ? 20000 : planParam === 'Profesional' ? 40000 : 0 : 0, imageAI: planParam ? planParam === 'Esencial' ? 50 : planParam === 'Avanzado' ? 100 : planParam === 'Profesional' ? 200 : 0 : 0, videoAI: planParam ? planParam === 'Esencial' ? 20 : planParam === 'Avanzado' ? 40 : planParam === 'Profesional' ? 80 : 0 : 0, conversationsAI: planParam ? planParam === 'Esencial' ? 500 : planParam === 'Avanzado' ? 1000 : planParam === 'Profesional' ? 2000 : 0 : 0, emails: planParam ? planParam === 'Esencial' ? 2500 : planParam === 'Avanzado' ? 5000 : planParam === 'Profesional' ? 10000 : 0 : 0 })
    }

    getPlan()
  }, [])

  const getAccounts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts`)
    setAccounts(res.data)
    setLoadingInitial(false)
  }

  useEffect(() => {
    getAccounts()
  }, [])

  const inputChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      const res = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      })
      if (res?.error) {
        setError(res.error)
        setLoading(false)
      }
      if (res?.ok) return window.location.replace('/')
    }
  }

  const createAccount = async (e: any) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      setError('')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/shop-login`, loginData)
      const res = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      })
      if (res?.error) {
        setError(res.error)
        setLoading(false)
      }
      if (res?.ok) return window.location.replace('/')
    }
  }

  return (
    <div className='bg-bg w-full h-full flex border-t-4 fixed top-0 z-50 px-4 border-main dark:bg-neutral-900'>
      {
        loadingInitial
          ? (
            <div className='w-fit h-fit m-auto'>
              <Spinner />
            </div>
          )
          : accounts?.length
            ? (
              <form onSubmit={handleSubmit} className='m-auto bg-white flex flex-col gap-4 w-[450px] border border-[#f3f3f3] rounded-xl p-6 sm:p-8 dark:bg-neutral-800 shadow-card dark:shadow-card-dark dark:border-neutral-700'>
                {
                  error !== ''
                    ? <p className='w-full p-2 bg-red-600 text-white text-center'>{error}</p>
                    : ''
                }
                <h1 className='text-2xl font-medium'>Ingresar</h1>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Email</p>
                  <Input placeholder='Email' name='email' change={inputChange} value={loginData.email} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Contraseña</p>
                  <Input type='password' placeholder='********' name='password' change={inputChange} value={loginData.password} />
                </div>
                <Button type='submit' config='w-full' loading={loading}>Ingresar</Button>
              </form>
            )
            : (
              <form onSubmit={createAccount} className='m-auto bg-white flex flex-col gap-4 w-[450px] border border-[#f3f3f3] rounded-xl p-6 sm:p-8 shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                {
                  error !== ''
                    ? <p className='w-full p-2 bg-red-600 text-white text-center'>{error}</p>
                    : ''
                }
                <h1 className='text-2xl font-medium'>Crear cuenta principal</h1>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Nombre</p>
                  <Input placeholder='Nombre' name='name' change={inputChange} value={loginData.name} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Email</p>
                  <Input placeholder='Email' name='email' change={inputChange} value={loginData.email} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Contraseña</p>
                  <Input type='password' placeholder='********' name='password' change={inputChange} value={loginData.password} />
                </div>
                <Button type='submit' config='w-full' loading={loading}>Crear cuenta</Button>
              </form>
            )
      }
      
    </div>
  )
}