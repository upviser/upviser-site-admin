import React, { PropsWithChildren } from 'react'
import { Spinner2 } from './Spinner2'

interface Props {
    action?: any
    config?: string
    type?: any
    loading?: boolean
}

export const Button: React.FC<PropsWithChildren<Props>> = ({ children, action, config, type, loading }) => {
  return (
    <button type={type ? type : 'button'} onClick={action} className={`${config} ${loading ? `cursor-not-allowed bg-main/80 hover:bg-main/80` : `hover:bg-main/80 bg-main`} h-10 min-h-10 px-6 w-fit text-sm text-white rounded-xl transition-colors duration-300`}>{ loading !== undefined ? loading ? <Spinner2 /> : children : children }</button>
  )
}