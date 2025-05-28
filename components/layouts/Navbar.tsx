"use client"
import { INotification, IStoreData } from '@/interfaces'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill, BsShop } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { io } from 'socket.io-client'
import { Spinner } from '../ui'
import Image from 'next/image'
import { SlMenu } from 'react-icons/sl'
import { GrClose } from 'react-icons/gr'
import { AiOutlineHome, AiOutlineFunnelPlot, AiOutlineFund, AiOutlineNotification, AiOutlineMessage } from 'react-icons/ai'
import { FaCogs } from 'react-icons/fa'
import { HiOutlineUsers } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { LiaClipboardListSolid } from 'react-icons/lia'
import { MdOutlinePayment, MdOutlineCall } from 'react-icons/md'
import { PiSuitcaseSimple } from 'react-icons/pi'
import { TfiWrite } from 'react-icons/tfi'

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/`, {
  transports: ['websocket']
})

export const Navbar: React.FC<PropsWithChildren> = ({ children }) => {

  const { systemTheme, theme, setTheme } = useTheme()
  const { data: session } = useSession()

  const [mounted, setMounted] = useState(false)
  const [notificationsView, setNotificationsView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [account, setAccount] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [storeData, setStoreData] = useState<IStoreData>()
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(false)
  const [menu, setMenu] = useState('hidden')
  const [messages, setMessages] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  const notificationsRef = useRef(notifications)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (session === null) {
      router.push('/ingresar');
    } else if (session !== undefined) {
      if (pathname === '/configuracion-usuario') return setLoading(false);
      const userPermissions = session.user.permissions || [];

      const permissionsRequired: { [key: string]: string } = {
        '/pagos': 'Pagos',
        '/servicios': 'Servicios',
        '/embudos': 'Embudos',
        '/crm': 'CRM',
        '/llamadas': 'Llamadas',
        '/estadisticas': 'Estadisticas',
        '/clientes': 'Clientes',
        '/campanas': 'Campañas',
        '/automatizaciones': 'Automatizaciones',
        '/mensajes': 'Mensajes',
        '/blog': 'Blog',
        '/diseno': 'Diseño',
        '/configuracion': 'Configuracion'
      };

      const isRestrictedPage = Object.keys(permissionsRequired).some(page => 
        pathname.includes(page) && !userPermissions.includes(permissionsRequired[page])
      );

      if (
        session.user.type !== 'Administrador' &&
        isRestrictedPage
      ) {
        router.push('/');
      } else {
        setLoading(false);
      }
    }
  }, [session, pathname, router]);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const getStoreData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
      if (res.data) {
        setStoreData(res.data)
      }
    }

    getStoreData()
  }, [])

  const getNotifications = async () => {
    setLoadingNotifications(true)
    setNotifications([])
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)
    if (response.data.find((notification: any) => notification.view === false)) {
      setNotification(true)
    } else {
      setNotification(false)
    }
    setNotifications(response.data)
    setLoadingNotifications(false)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    notificationsRef.current = notifications
  }, [notifications])

  useEffect(() => {
    socket.on('message', async (message) => {
      setNotification(true)
      if (message.message) {
        if (pathname !== '/mensajes') {
          setMessages(true)
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {title: 'Nuevo mensaje: Chat web', description: message.message, url: '/mensajes', view: false})
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    if (pathname === '/mensajes') {
      setMessages(false)
    }
  }, [pathname])

  useEffect(() => {
    socket.on('newNotification', async () => {
      setNotification(true)
    })
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500' /></button>
      )
    }
  }

  return (
    <>
      {
        menu === 'flex'
          ? (
            <div className='fixed top-[49px] h-full flex w-full z-50'>
              <div className={`w-[250px] h-full z-50 border-r bg-bg border-border p-4 flex-col justify-between dark:border-neutral-800 dark:bg-neutral-900`}>
                <div className='flex flex-col gap-1'>
                  <Link href='/' className={`transition-all duration-150 ${pathname === '/' ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineHome className={`mt-auto mb-auto text-xl ${pathname === '/' ? 'text-white' : 'text-main'}`} /><p className={`${pathname === '/' ? 'text-white' : ''}`}>Inicio</p></Link>
                  {
                    (session?.user.type === 'Administrador' || session?.user.permissions?.includes('Pagos')) && session?.user.plan !== 'Inicial'
                      ? <Link href='/pagos' className={`transition-all duration-150 ${pathname.includes('/pagos') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlinePayment className={`mt-auto mb-auto text-xl ${pathname.includes('/pagos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/pagos') ? 'text-white' : ''}`}>Pagos</p></Link>
                      : ''
                  }
                  {
                    (session?.user.type === 'Administrador' || session?.user.permissions?.includes('Servicios')) && session?.user.plan !== 'Inicial'
                      ? <Link href='/servicios' className={`transition-all duration-150 ${pathname.includes('/servicios') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><PiSuitcaseSimple className={`mt-auto mb-auto text-xl ${pathname.includes('/servicios') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/servicios') ? 'text-white' : ''}`}>Servicios</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Embudos')
                      ? <Link href='/embudos' className={`transition-all duration-150 ${pathname.includes('/embudos') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineFunnelPlot className={`mt-auto mb-auto text-xl ${pathname.includes('/embudos') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/embudos') ? 'text-white' : ''}`}>Embudos</p></Link>
                      : ''
                  }
                  {
                    (session?.user.type === 'Administrador' || session?.user.permissions?.includes('CRM')) && session?.user.plan !== 'Inicial'
                      ? <Link href='/crm' className={`transition-all duration-150 ${pathname.includes('/crm') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><LiaClipboardListSolid className={`mt-auto mb-auto text-xl ${pathname.includes('/crm') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/crm') ? 'text-white' : ''}`}>CRM</p></Link>
                      : ''
                  }
                  {
                    (session?.user.type === 'Administrador' || session?.user.permissions?.includes('Reuniones')) && session?.user.plan !== 'Inicial'
                      ? <Link href='/reuniones' className={`transition-all duration-150 ${pathname.includes('/reuniones') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><MdOutlineCall className={`mt-auto mb-auto text-xl ${pathname.includes('/reuniones') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/reuniones') ? 'text-white' : ''}`}>Reuniones</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Estadisticas')
                      ? <Link href='/estadisticas' className={`transition-all duration-150 ${pathname.includes('/estadisticas') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineFund className={`mt-auto mb-auto text-xl ${pathname.includes('/estadisticas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/estadisticas') ? 'text-white' : ''}`}>Estadisticas</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Clientes')
                      ? <Link href='/clientes' className={`transition-all duration-150 ${pathname.includes('/clientes') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><HiOutlineUsers className={`mt-auto mb-auto text-xl ${pathname.includes('/clientes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/clientes') ? 'text-white' : ''}`}>Clientes</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Campañas')
                      ? <Link href='/campanas' className={`transition-all duration-150 ${pathname.includes('/campanas') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><AiOutlineNotification className={`mt-auto mb-auto text-xl ${pathname.includes('/campanas') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/campanas') ? 'text-white' : ''}`}>Campañas</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Automatizaciones')
                      ? <Link href='/automatizaciones' className={`transition-all duration-150 ${pathname.includes('/automatizaciones') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex gap-2 py-1.5 px-3 rounded-xl`}><FaCogs className={`mt-auto mb-auto text-xl ${pathname.includes('/automatizaciones') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/automatizaciones') ? 'text-white' : ''}`}>Automatizaciones</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Mensajes')
                      ? <Link href='/mensajes' onClick={() => setMessages(false)} className={`transition-all duration-150 ${pathname.includes('/mensajes') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><AiOutlineMessage className={`mt-auto mb-auto text-xl ${pathname.includes('/mensajes') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/mensajes') ? 'text-white' : ''}`}>Mensajes</p>{messages ? <div className='bg-main h-3 w-3 my-auto ml-auto rounded-full' /> : ''}</Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Blog')
                      ? <Link href='/blog' className={`transition-all duration-150 ${pathname.includes('/blog') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><TfiWrite className={`mt-auto mb-auto text-xl ${pathname.includes('/blog') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/blog') ? 'text-white' : ''}`}>Blog</p></Link>
                      : ''
                  }
                  {
                    session?.user.type === 'Administrador' || session?.user.permissions?.includes('Diseño')
                      ? <Link href='/diseno' className={`transition-all duration-150 ${pathname.includes('/diseno') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><BsShop className={`mt-auto mb-auto text-xl ${pathname.includes('/diseno') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/diseno') ? 'text-white' : ''}`}>Diseño</p></Link>
                      : ''
                  }
                </div>
                {
                  session?.user.type === 'Administrador'
                    ? (
                      <div className='border-t border-border pt-4 dark:border-neutral-800'>
                        <Link href='/configuracion' className={`transition-all duration-150 ${pathname.includes('/configuracion') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><IoSettingsOutline className={`mt-auto mb-auto text-xl ${pathname.includes('/configuracion') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/configuracion') ? 'text-white' : ''}`}>Configuración</p></Link>
                      </div>
                    )
                    : (
                      <div className='border-t border-border pt-4 dark:border-neutral-800'>
                        <Link href='/configuracion-usuario' className={`transition-all duration-150 ${pathname.includes('/configuracion-usuario') ? 'bg-main' : 'hover:bg-neutral-100 dark:hover:bg-main/30'} flex py-1.5 px-3 gap-2 rounded-xl`}><IoSettingsOutline className={`mt-auto mb-auto text-xl ${pathname.includes('/configuracion') ? 'text-white' : 'text-main'}`} /><p className={`${pathname.includes('/configuracion') ? 'text-white' : ''}`}>Configuración</p></Link>
                      </div>
                    )
                }
              </div>
              <button onClick={() => setMenu('hidden')} className='h-full w-full bg-black/20' />
            </div>
          )
          : ''
      }
      <div className={`${loading ? 'flex' : 'hidden'} fixed w-full h-full z-50 bg-white dark:bg-neutral-900`}>
        <div className='w-fit h-fit m-auto'>
          <Spinner />
        </div>
      </div>
      {
        pathname !== '/ingresar'
          ? (
            <>
              <div className='w-full px-2 py-1 bg-white border-b border-border z-40 dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='w-full m-auto flex justify-between'>
                  <div className='flex gap-3'>
                    <div className='flex lg:hidden'>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        if (menu === 'hidden') {
                          setMenu('flex')
                        } else {
                          setMenu('hidden')
                        }
                      }} className='my-auto flex'>{menu === 'hidden' ? <SlMenu className='my-auto text-xl' /> : <GrClose className='text-xl' />}</button>
                    </div>
                    {
                      !mounted
                        ? <Link href='/'><div className='h-10 w-1'><p>UPVISOR</p></div></Link>
                        : theme === 'system'
                          ? systemTheme === 'dark'
                            ? <Link href='/'><Image className='h-10 object-contain w-fit' alt={`Logo Upviser estilo blanco`} src='https://upviser-website.b-cdn.net/Logo%20website%20blanco.png' width={500} height={160} /></Link>
                            : <Link href='/'><Image className='h-10 object-contain w-fit' alt={`Logo Upviser`} src='https://upviser-website.b-cdn.net/Logo%20website.png' width={500} height={160} /></Link>
                          : theme === 'dark'
                            ? <Link href='/'><Image className='h-10 object-contain w-fit' alt={`Logo Upviser estilo blanco`} src='https://upviser-website.b-cdn.net/Logo%20website%20blanco.png' width={500} height={160} /></Link>
                            : <Link href='/'><Image className='h-10 object-contain w-fit' alt={`Logo Upviser`} src='https://upviser-website.b-cdn.net/Logo%20website.png' width={500} height={160} /></Link>
                    }
                  </div>
                  <div className='hidden lg:flex gap-4'>
                    {renderThemeChanger()}
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      if (notificationsView.view === 'hidden') {
                        getNotifications()
                        setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      } else {
                        setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }}><IoIosNotificationsOutline className='m-auto text-2xl' />{notification ? <div className='w-2 h-2 bg-main rounded-full absolute ml-4 -mt-6' /> : ''}</button>
                    <button className='bg-main/20 rounded-full w-8 h-8 my-auto' onClick={() => {
                      if (account.view === 'hidden') {
                        setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAccount({ ...account, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      } else {
                        setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }}>{session?.user?.name![0]}</button>
                  </div>
                </div>
              </div>
              <div onClick={() => {
                if (!account.mouse) {
                  setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }
              }} className={`${account.opacity} ${account.view} transition-opacity duration-200 fixed z-50 w-full h-full mt-[1px]`}>
                <div onMouseEnter={() => setAccount({ ...account, mouse: true })} onMouseLeave={() => setAccount({ ...account, mouse: false })} className={`${account.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 flex flex-col border border-border dark:border-neutral-700 w-64 bg-white rounded-xl h-fit ml-auto dark:bg-neutral-800`} style={{ boxShadow: '0px 3px 10px 3px #11111110' }}>
                  <div className='flex flex-col gap-1 p-4 border-b dark:border-neutral-700'>
                    <p className='font-medium text-sm'>{session?.user?.name}</p>
                    <p className='text-sm'>{session?.user?.email}</p>
                  </div>
                  <div className='flex flex-col p-[9px]'>
                    <button className='text-left text-sm p-1.5 rounded-md transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700' onClick={async (e: any) => {
                      e.preventDefault()
                      router.push('/mis-datos')
                      setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    }}>Mis datos</button>
                    <button className='text-left text-sm p-1.5 rounded-md transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700' onClick={async (e: any) => {
                      e.preventDefault()
                      setAccount({ ...account, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setAccount({ ...account, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                      await signOut()
                    }}>Cerrar sesión</button>
                  </div>
                </div>
              </div>
              <div className={`${notificationsView.view} ${notificationsView.opacity} transition-opacity duration-200 w-full absolute z-50 flex`} onClick={(e: any) => {
                e.preventDefault()
                if (!notificationsView.mouse) {
                  setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }
              }} style={{ height: 'calc(100% - 56px)' }}>
                <div onMouseEnter={() => setNotificationsView({ ...notificationsView, mouse: true })} onMouseLeave={() => setNotificationsView({ ...notificationsView, mouse: false })} className={`${notificationsView.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 border border-border dark:border-neutral-700 mt-[1px] mr-2 h-fit max-h-[500px] ml-auto rounded-xl bg-white z-50 w-[350px] dark:bg-neutral-800`} style={{ overflow: 'overlay', boxShadow: '0px 3px 10px 3px #11111110' }}>
                  <p className='text-lg border-b p-4 dark:border-neutral-600'>Notificaciones</p>
                  {
                    loadingNotifications
                      ? (
                        <div className='w-full h-64 flex'>
                          <div className='w-fit h-fit m-auto'>
                            <Spinner />
                          </div>
                        </div>
                      )
                      : notifications.length
                        ? (
                          <div className='flex flex-col p-2'>
                            {
                              notifications.map(notification => {
                                const createdAt = new Date(notification.createdAt!)
                                return (
                                  <button className='hover:bg-neutral-100 border-b transition-colors duration-150 p-2 rounded-md flex gap-4 justify-between dark:hover:bg-neutral-700 dark:border-neutral-700' key={notification.description} onClick={async () => {
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notification._id}`)
                                    getNotifications()
                                    setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                                    setTimeout(() => {
                                      setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                                    }, 200)
                                    router.push(notification.url)
                                  }}>
                                    <div className='my-auto w-full'>
                                      <p className='text-left text-sm'>{notification.title}</p>
                                      <p className='text-left text-sm'>{notification.description}</p>
                                      <p className='text-[13px] text-neutral-600 text-right dark:text-neutral-400'>{createdAt.getDate()}/{createdAt.getMonth() + 1}/{createdAt.getFullYear()} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                    </div>
                                    {
                                      notification.view
                                        ? ''
                                        : <div className='w-3 h-3 rounded-full bg-main mt-auto mb-auto' />
                                    }
                                  </button>
                                )
                              })
                            }
                            <button onClick={() => {
                              getNotifications()
                              setNotificationsView({ ...notificationsView, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setNotificationsView({ ...notificationsView, view: 'hidden', opacity: 'opacity-0' })
                              }, 200)
                              router.push('/notificaciones')
                            }} className='text-main text-sm text-center hover:bg-neutral-100 p-2 rounded-md dark:hover:bg-neutral-700'>Ver todos</button>
                          </div>
                        )
                        : <p className='text-sm p-4'>No hay notificaciones</p>
                  }
                </div>
              </div>
              { children }
            </>
          )
          : <>{ children }</>
      }
    </>
  )
}
