import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button, Button2, ButtonSubmit, Input, Spinner2, Textarea } from '../ui'
import axios from 'axios'
import { IFunnel, IService } from '@/interfaces'

interface Props {
  popupDeleteService: any
  setPopupDeleteService: any
  selectService?: IService
  setServices: any
  getServices: any
}

export const PopupDeleteService: React.FC<Props> = ({ popupDeleteService, setPopupDeleteService, selectService, setServices, getServices }) => {

  const [loading, setLoading] = useState(false)

  return (
      <div onClick={() => {
        if (!popupDeleteService.mouse) {
          setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDeleteService({ ...popupDeleteService, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDeleteService.view} ${popupDeleteService.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopupDeleteService({ ...popupDeleteService, mouse: true })} onMouseLeave={() => setPopupDeleteService({ ...popupDeleteService, mouse: false })} className={`${popupDeleteService.opacity === 'opacity-1' ? 'scale-1': 'scale-90'} transition-transform duration-200 w-full max-w-[500px] max-h-[600px] overflow-y-auto p-5 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p>¿Estas seguro que deseas eliminar el servicio: <span className='font-medium'>{selectService?.name}</span>?</p>
          <div className='flex gap-6'>
            <ButtonSubmit submitLoading={loading} textButton='Eliminar' action={async (e: any) => {
              e.preventDefault()
              if (!loading) {
                setLoading(true)
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/service/${selectService?._id}`)
                getServices()
                setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupDeleteService({ ...popupDeleteService, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
                setLoading(false)
              }
            }} color='red-500' config='w-28' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDeleteService({ ...popupDeleteService, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='my-auto'>Cancelar</button>
          </div>
        </div>
      </div>
  )
}
