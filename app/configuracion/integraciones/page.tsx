"use client"
import { Nav } from '@/components/configuration'
import { Button, ButtonSubmit, Input, Textarea } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function Page () {

  const [integrations, setIntegrations] = useState({
    idPhone: '',
    whatsappToken: '',
    idPage: '',
    idInstagram: '',
    messengerToken: '',
    apiToken: '',
    apiPixelId: '',
    googleAnalytics: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sessionInfo, setSessionInfo] = useState<{
    phone_number_id?: string;
    waba_id?: string;
  }>({});
  const [fbReady, setFbReady] = useState(false)

  const router = useRouter()

  const getIntegrations = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/integrations`)
    if (response.data) {
      setIntegrations(response.data)
    }
  }

  useEffect(() => {
    getIntegrations()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.FB) {
        console.log('🟢 FB listo');
        setFbReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Captura mensajes de sesión
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (!['https://www.facebook.com', 'https://web.facebook.com'].includes(e.origin)) return;
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
          const { phone_number_id, waba_id } = data.data;
          setSessionInfo({ phone_number_id, waba_id });
        }
      } catch {}
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  const handleConnect = async () => {
    if (!fbReady) {
      console.warn('SDK no está listo');
      return;
    }

    try {
      const response = await new Promise<any>((resolve, reject) => {
        window.FB.login(
          (res: any) => {
            res.authResponse ? resolve(res) : reject(new Error('Cancelado o no autorizado'));
          },
          {
            config_id: process.env.NEXT_PUBLIC_WHATSAPP_CONFIG_ID!,
            response_type: 'code',
            override_default_response_type: true,
            scope: 'business_management,whatsapp_business_management,whatsapp_business_messaging',
            extras: { feature: 'whatsapp_embedded_signup', version: 2, sessionInfoVersion: 3, setup: {} },
          }
        );
      });
      const code = response.authResponse.code;
      const { phone_number_id, waba_id } = sessionInfo;
      if (phone_number_id && waba_id) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/whatsapp-token`, { code, phone_number_id, waba_id });
        res.data.success === 'OK' ? console.log('Token creado') : console.error('Error al crear token');
      } else {
        console.error('No recibí sessionInfo antes del login');
      }
    } catch (e) {
      console.error('Error en conexión FB:', e);
    }
  };

  const handleConnectFacebook = async () => {
    if (!fbReady) {
      console.warn('SDK no está listo');
      return;
    }

    try {
      const response = await new Promise<any>((resolve, reject) => {
        window.FB.login(
          (res: any) => {
            res.authResponse ? resolve(res) : reject(new Error('Cancelado o no autorizado'));
          },
          {
            scope: 'business_management,pages_show_list,pages_manage_metadata,pages_messaging,instagram_basic,instagram_manage_messages',
            response_type: 'token',
          }
        );
      });

      const userToken = response.authResponse.accessToken

      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messenger-token`, { userToken })
      if (resp.data.success) {
        getIntegrations()
      } else {
        console.error('Error al guardar datos:', resp.data);
      }
    } catch (e) {
      console.error('Error en conexión FB:', e);
    }
  };

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true)
      setError('')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/integrations`, integrations)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 w-full lg:w-[calc(100%-250px)] dark:bg-neutral-800 dark:border-neutral-700'>
        <div className='flex m-auto w-full max-w-[1280px]'>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit h-fit my-auto'>{ error }</p>
              : ''
          }
          <div className='flex gap-6 ml-auto w-fit'>
            <ButtonSubmit action={handleSubmit} color='main' submitLoading={loading} textButton='Guardar datos' config='w-40' />
            <button onClick={() => router.refresh()} className='my-auto text-sm'>Descartar</button>
          </div>
        </div>
      </div>
      <div className='p-4 lg:p-6 w-full flex flex-col gap-6 overflow-y-auto bg-bg dark:bg-neutral-900 mb-16' style={{ height: 'calc(100% - 73px)' }}>
        <div className='flex w-full max-w-[1280px] mx-auto gap-6 flex-col lg:flex-row'>
          <Nav />
          <div className='w-full lg:w-3/4 flex flex-col gap-4'>
            <h2 className='font-medium mt-3 pb-3 border-b dark:border-neutral-700'>Integraciones</h2>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Conectar Whatsapp</h3>
              {
                (integrations.idPhone && integrations.idPhone !== '') && (integrations.whatsappToken && integrations.whatsappToken !== '')
                  ? fbReady ? <Button>Desconectar Whatsapp</Button> : ''
                  : fbReady ? <Button action={handleConnect}>Conectar Whatsapp</Button> : ''
              }
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Conectar Facebook/Instagram</h3>
              {
                integrations.idPage && integrations.idPage !== '' && integrations.idInstagram && integrations.idInstagram !== ''
                  ? (
                    <>
                      <p className='text-sm'>Id página de Facebook: {integrations.idPage}</p>
                      <p className='text-sm'>Id Instagram: {integrations.idPage}</p>
                    </>
                  )
                  : ''
              }
              {
                (integrations.messengerToken && integrations.messengerToken !== '') && (integrations.idPage && integrations.idPage !== '')
                  ? fbReady ? <Button action={async () => {
                    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/disconnect-facebook`)
                    getIntegrations()
                  }}>Desconectar Facebook/Instagram</Button> : ''
                  : fbReady ? <Button action={handleConnectFacebook}>Conectar Facebook/Instagram</Button> : ''
              }
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Conectar Instagram</h3>
              <Button><Link target='_blank' href={`https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${process.env.NEXT_PUBLIC_IG_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FB_REDIRECT_URI}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`}>Conectar Instagram</Link></Button>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Api Meta Token</h3>
              <Input change={(e: any) => setIntegrations({ ...integrations, apiToken: e.target.value })} value={integrations.apiToken} placeholder='Api Meta Token' config='h-40' />
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Api Pixel Id</h3>
              <Input change={(e: any) => setIntegrations({ ...integrations, apiPixelId: e.target.value })} value={integrations.apiPixelId} placeholder='Api Pixel Id' config='h-40' />
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-sm'>Google Analytics</h3>
              <Input change={(e: any) => setIntegrations({ ...integrations, googleAnalytics: e.target.value })} value={integrations.googleAnalytics} placeholder='Google Analytics' config='h-40' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}