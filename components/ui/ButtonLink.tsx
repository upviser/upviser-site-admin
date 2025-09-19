import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

interface Props {
    href: string
    config?: string
}

export const ButtonLink: React.FC<PropsWithChildren<Props>> = ({ children, href, config }) => {
  return (
    <Link className={`${config} h-10 px-6 rounded-xl bg-main text-sm text-white flex hover:bg-main/80 transition-colors duration-300`} href={href}><p className='m-auto'>{ children }</p></Link>
  )
}
