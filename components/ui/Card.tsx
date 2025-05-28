import React, { PropsWithChildren } from 'react'

interface Props {
    title: string
}

export const Card: React.FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <div className='border border-black/5 flex flex-col rounded-xl dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <h2 className='font-medium bg-white rounded-t-xl p-5 border-b text-[15px] border-black/5 dark:border-neutral-700 dark:bg-neutral-800'>{ title }</h2>
      <div className='flex flex-col gap-4 bg-white p-5 rounded-b-xl dark:bg-neutral-800'>
        { children }
      </div>
    </div>
  )
}
