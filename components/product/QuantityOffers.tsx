"use client"
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Button2, Table } from '../ui'

interface Props {
  quantityOffers: any
  setQuantityOffers: any
}

export const QuantityOffers: React.FC<Props> = ({ quantityOffers, setQuantityOffers }) => {

  const [rotate, setRotate] = useState('rotate-90')

  return (
    <div className='border border-black/5 flex flex-col rounded-xl dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <div className='flex flex-col'>
        <button onClick={(e: any) => {
          e.preventDefault()
          if (rotate === 'rotate-90') {
            setRotate('-rotate-90')
          } else {
            setRotate('rotate-90')
          }
        }} className={`${rotate === 'rotate-90' ? 'rounded-b-xl' : 'border-b border-black/5 dark:border-neutral-700'} font-medium w-full flex justify-between bg-white rounded-t-xl p-5 dark:bg-neutral-800`}>
          <h2 className='font-medium text-[15px]'>Descuentos por cantidad</h2>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
        </button>
        <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex flex-col gap-4 bg-white p-5 rounded-b-xl dark:bg-neutral-800`}>
          <Table th={['Cantidad', 'Descuento']}>
            {
              quantityOffers.map((offer: any, index: number) => (
                <tr key={index}>
                  <td className='p-2'><input type='number' placeholder='Cantidad' onChange={(e: any) => {
                    const quantity = quantityOffers
                    quantity[index].quantity = e.target.value
                    setQuantityOffers(quantity)
                  }} value={offer.quantity} className='w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                  <td><input type='number' placeholder='%' onChange={(e: any) => {
                    const quantity = quantityOffers
                    quantity[index].descount = e.target.value
                    setQuantityOffers(quantity)
                  }} value={offer.descount} className='p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                  <td><button onClick={(e: any) => {
                    e.preventDefault()
                    const prevOffers = [...quantityOffers!]
                    prevOffers.splice(index, 1)
                    setQuantityOffers(prevOffers)
                  }}><IoCloseOutline className='text-xl' /></button></td>
                </tr>
              ))
            }
          </Table>
          <Button2 action={(e: any) => {
            e.preventDefault()
            setQuantityOffers(quantityOffers.concat({
              quantity: undefined,
              descount: undefined
            }))
          }}>Agregar fila</Button2>
        </div>
      </div>
    </div>
  )
}
