import { IProduct } from '@/interfaces'
import React from 'react'
import { Card, Input } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
}

export const Price: React.FC<Props> = ({information, setInformation}) => {

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  return (
    <Card title='Precio'>
      <div className='flex gap-2 border-b border-border pb-4 dark:border-neutral-700'>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Precio</p>
          <Input placeholder='Precio actual' value={information.price} name='price' change={inputChange} />
        </div>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Precio anterior</p>
          <Input placeholder='Precio anterior' value={information.beforePrice} name='beforePrice' change={inputChange} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Costo del producto</p>
        <Input placeholder='Costo' name='cost' change={inputChange} value={information.cost} />
      </div>
    </Card>
  )
}
