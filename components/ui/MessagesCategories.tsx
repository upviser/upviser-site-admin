import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const MessagesCategories = () => {

const pathname = usePathname()

  return (
    <div className='flex gap-3'>
      <Link href='/mensajes' className={`${pathname === '/mensajes' ? 'bg-main text-white' : 'bg-white border border-border dark:bg-neutral-700 dark:border-neutral-700 hover:bg-main hover:text-white dark:hover:bg-main/20'} p-2 rounded-lg transition-colors duration-200`}>Chat web</Link>
      <Link href='/mensajes/whatsapp' className={`${pathname === '/mensajes/whatsapp' ? 'bg-main text-white' : 'bg-white border border-border dark:bg-neutral-700 dark:border-neutral-600 hover:bg-main hover:text-white dark:hover:bg-main/20'} p-2 rounded-lg transition-colors duration-200`}>Whatsapp</Link>
      <Link href='/mensajes/messenger' className={`${pathname === '/mensajes/messenger' ? 'bg-main text-white' : 'bg-white border border-border dark:bg-neutral-700 dark:border-neutral-600 hover:bg-main hover:text-white dark:hover:bg-main/20'} p-2 rounded-lg transition-colors duration-200`}>Messenger</Link>
      <Link href='/mensajes/instagram' className={`${pathname === '/mensajes/instagram' ? 'bg-main text-white' : 'bg-white border border-border dark:bg-neutral-700 dark:border-neutral-600 hover:bg-main hover:text-white dark:hover:bg-main/20'} p-2 rounded-lg transition-colors duration-200`}>Instagram</Link>
    </div>
  )
}
