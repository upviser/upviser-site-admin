import React, { PropsWithChildren } from 'react'

interface Props {
    th: string[]
}

export const Table: React.FC<PropsWithChildren<Props>> = ({ children, th }) => {
  return (
    <div className='overflow-x-auto overflow-y-hidden border border-black/5 rounded-xl dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
        <table className='min-w-full'>
            <thead className='border-b border-black/5 w-full dark:border-neutral-700'>
                {
                    th.map(title => (
                        <th key={title} className='text-left p-3 font-medium text-[15px]'>{ title }</th>
                    ))
                }
            </thead>
            <tbody className='w-full dark:bg-neutral-800 dark:border-neutral-600'>
                { children }
            </tbody>
        </table>
    </div>
  )
}
