"use client"
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineFund, AiOutlineNotification, AiOutlineMessage, AiOutlineFunnelPlot } from 'react-icons/ai'
import { MdOutlineCall, MdOutlineLocalOffer, MdOutlinePayment } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
import { BsShop } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'
import { io } from 'socket.io-client'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { LiaClipboardListSolid } from 'react-icons/lia'
import { FaCogs } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { TiFlowMerge } from 'react-icons/ti'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  transports: ['websocket']
})

export const LeftMenu: React.FC<PropsWithChildren> = ({ children }) => {
  
  const [messages, setMessages] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    socket.on('message', async (message) => {
      if (message.message) {
        if (pathname !== '/mensajes') {
          setMessages(true)
        }
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [pathname])

  useEffect(() => {
    if (pathname === '/mensajes') {
      setMessages(false)
    }
  }, [pathname])

  return (
    <>
      {
        pathname !== '/ingresar'
          ? (
              <div className='flex bg-bg w-full' style={{ height: 'calc(100vh - 49px' }}>
                <div className={`w-[250px] z-40 border-r border-border p-4 hidden flex-col justify-between lg:flex dark:border-neutral-800 dark:bg-neutral-900`}>
                  <div className='flex flex-col gap-[2px] overflow-y-auto'>
                    <Link href='/' className={`transition-all duration-150 ${pathname === '/' ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineHome className={`mt-auto mb-auto text-lg ${pathname === '/' ? 'text-white' : 'text-main'}`} /><p className={`${pathname === '/' ? 'text-white' : ''} text-sm`}>Inicio</p></Link>
                    {
                      session?.user.permissions?.includes('Ventas') || session?.user.type === 'Administrador'
                        ? <Link href='/ventas' className={`transition-all duration-150 ${pathname.includes('/ventas') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlinePayment className={`mt-auto mb-auto text-lg ${pathname.includes('/ventas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/ventas') ? 'text-white' : ''} text-sm`}>Ventas</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Productos') || session?.user.type === 'Administrador'
                        ? <Link href='/productos' className={`transition-all duration-150 ${pathname.includes('/productos') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlineLocalOffer className={`mt-auto mb-auto text-lg ${pathname.includes('/productos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/productos') ? 'text-white' : ''} text-sm`}>Productos</p></Link>
                        : ''
                    }
                    {
                      pathname.includes('productos')
                        ? (
                          <>
                            <div className='flex flex-col gap-2'>
                              <Link href='/productos/categorias' className={`${pathname.includes('/productos/categorias') ? 'bg-neutral-200 dark:bg-neutral-700' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} transition-all duration-150 flex gap-2 py-1.5 px-3 rounded-lg text-sm`}>Categorías</Link>
                            </div>
                            <div className='flex flex-col gap-2'>
                              <Link href='/productos/codigos-promocionales' className={`${pathname.includes('/productos/codigos-promocionales') ? 'bg-neutral-200 dark:bg-neutral-700' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} transition-all duration-150 flex gap-2 py-1.5 px-3 rounded-lg text-sm`}>Códigos</Link>
                            </div>
                          </>
                        )
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Servicios') || session?.user.type === 'Administrador'
                        ? <Link href='/servicios' className={`transition-all duration-150 ${pathname.includes('/servicios') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><PiSuitcaseSimple className={`mt-auto mb-auto text-lg ${pathname.includes('/servicios') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/servicios') ? 'text-white' : ''} text-sm`}>Servicios</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Embudos') || session?.user.type === 'Administrador'
                        ? <Link href='/embudos' className={`transition-all duration-150 ${pathname.includes('/embudos') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineFunnelPlot className={`mt-auto mb-auto text-lg ${pathname.includes('/embudos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/embudos') ? 'text-white' : ''} text-sm`}>Embudos</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('CRM') || session?.user.type === 'Administrador'
                        ? <Link href='/crm' className={`transition-all duration-150 ${pathname.includes('/crm') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><LiaClipboardListSolid className={`mt-auto mb-auto text-lg ${pathname.includes('/crm') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/crm') ? 'text-white' : ''} text-sm`}>CRM</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Reuniones') || session?.user.type === 'Administrador'
                        ? <Link href='/reuniones' className={`transition-all duration-150 ${pathname.includes('/reuniones') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlineCall className={`mt-auto mb-auto text-lg ${pathname.includes('/reuniones') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/reuniones') ? 'text-white' : ''} text-sm`}>Reuniones</p></Link>
                        : ''
                    } 
                    {
                      session?.user.permissions?.includes('Estadisticas') || session?.user.type === 'Administrador'
                        ? <Link href='/estadisticas' className={`transition-all duration-150 ${pathname.includes('/estadisticas') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineFund className={`mt-auto mb-auto text-lg ${pathname.includes('/estadisticas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/estadisticas') ? 'text-white' : ''} text-sm`}>Estadisticas</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Clientes') || session?.user.type === 'Administrador'
                        ? <Link href='/clientes' className={`transition-all duration-150 ${pathname.includes('/clientes') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><HiOutlineUsers className={`mt-auto mb-auto text-lg ${pathname.includes('/clientes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/clientes') ? 'text-white' : ''} text-sm`}>Clientes</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Automatizaciones') || session?.user.type === 'Administrador'
                        ? <Link href='/automatizaciones' className={`transition-all duration-150 ${pathname.includes('/automatizaciones') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><TiFlowMerge className={`mt-auto mb-auto text-lg ${pathname.includes('/automatizaciones') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/automatizaciones') ? 'text-white' : ''} text-sm`}>Automatizaciones</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Campañas') || session?.user.type === 'Administrador'
                        ? <Link href='/campanas' className={`transition-all duration-150 ${pathname.includes('/campanas') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineNotification className={`mt-auto mb-auto text-lg ${pathname.includes('/campanas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/campanas') ? 'text-white' : ''} text-sm`}>Campañas</p></Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Mensajes') || session?.user.type === 'Administrador'
                        ? <Link href='/mensajes' onClick={() => setMessages(false)} className={`transition-all duration-150 ${pathname.includes('/mensajes') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineMessage className={`mt-auto mb-auto text-lg ${pathname.includes('/mensajes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/mensajes') ? 'text-white' : ''} text-sm`}>Mensajes</p>{messages ? <div className='bg-main h-3 w-3 my-auto ml-auto rounded-full' /> : ''}</Link>
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Diseño') || session?.user.type === 'Administrador'
                        ? <Link href='/diseno' className={`transition-all duration-150 ${pathname.includes('/diseno') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><BsShop className={`mt-auto mb-auto text-lg ${pathname.includes('/diseno') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/diseno') ? 'text-white' : ''} text-sm`}>Diseño</p></Link>
                        : ''
                    }
                    {
                      pathname.includes('diseno') || pathname.includes('blog')
                        ? (
                          <>
                            <div className='flex flex-col gap-2'>
                              <Link href='/blog' className={`transition-all duration-150 ${pathname.includes('/blog') ? 'bg-neutral-200 dark:bg-neutral-700' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'} flex py-1.5 px-3 gap-2 rounded-xl`}><p className={`${pathname.includes('/blog') ? '' : ''} text-sm`}>Blog</p></Link>
                            </div>
                          </>
                        )
                        : ''
                    }
                    {
                      session?.user.permissions?.includes('Contenido IA') || session?.user.type === 'Administrador'
                        ? <Link href='/contenido-ia' className={`transition-all duration-150 ${pathname.includes('/contenido-ia') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><p className='text-sm'>✨</p><p className={`${pathname.includes('/contenido-ia') ? 'text-white' : ''} text-sm`}> Contenido IA</p></Link>
                        : ''
                    }
                  </div>
                  <div className='border-t border-border pt-4 dark:border-neutral-800'>
                    {
                      session?.user.type === 'Administrador'
                        ? <Link href='/configuracion' className={`transition-all duration-150 ${pathname.includes('/configuracion') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><IoSettingsOutline className={`mt-auto mb-auto text-lg ${pathname.includes('/configuracion') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/configuracion') ? 'text-white' : ''} text-sm`}>Configuración</p></Link>
                        : <Link href='/mis-datos' className={`transition-all duration-150 ${pathname.includes('/mis-datos') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><IoSettingsOutline className={`mt-auto mb-auto text-lg ${pathname.includes('/mis-datos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/mis-datos') ? 'text-white' : ''} text-sm`}>Mis datos</p></Link>
                    }
                  </div>
                </div>
                <main className='w-full lg:w-[calc(100%-250px)]'>
                  { children }
                </main>
              </div>
            )
          : <>{ children }</>
      }
    </>
  )
}
