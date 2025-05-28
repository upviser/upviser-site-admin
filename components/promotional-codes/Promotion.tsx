import React from 'react'
import { Card, Input, Select } from '../ui'

interface Props {
    codeInfo: any
    inputChange: any
    minimunPrice: any
    setMinimunPrice: any
}

export const Promotion: React.FC<Props> = ({ codeInfo, inputChange, minimunPrice, setMinimunPrice }) => {
  return (
    <Card title='Promoción'>
      <div className='flex gap-2 border-b pb-4 dark:border-neutral-700'>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Tipo de descuento</p>
          <Select value={codeInfo.discountType} change={inputChange} name='discountType'>
            <option>Porcentaje</option>
            <option>Valor</option>
          </Select>
        </div>
        <div className='w-1/2 flex flex-col gap-2'>
          <p className='text-sm'>Valor del descuento</p>
          <Input placeholder='Valor' name='value' change={inputChange} value={codeInfo.value} />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <input type='checkbox' onChange={(e: any) => e.target.checked ? setMinimunPrice(true) : setMinimunPrice(false)} />
          <p className='text-sm'>Este cupon requiere de un monto minimo</p>
        </div>
        {
          minimunPrice
            ? (
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Monto minimo</p>
                <Input placeholder='Valor' name='minimumAmount' change={inputChange} value={codeInfo.minimumAmount} />
              </div>
            )
            : ''
        }
      </div>
    </Card>
  )
}
