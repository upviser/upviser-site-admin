import React, { PropsWithChildren } from 'react'

interface Props {
    action: any
    config?: string
}

export const ButtonSecondary: React.FC<PropsWithChildren<Props>> = ({ children, action, config }) => {
  return (
    <button onClick={action} className={`${config} bg-transparent text-sm border border-main h-10 px-6 w-fit text-main rounded-xl transition-colors duration-300 hover:bg-main/5`}>{ children }</button>
  )
}
