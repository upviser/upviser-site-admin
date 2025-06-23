import React, { useState } from 'react'
import { ButtonSubmit } from '../ui'
import axios from 'axios'
import { IPage } from '@/interfaces'

interface Props {
    popupDeletePage: any
    setPopupDeletePage: any
    getPages: any
    page?: IPage
    pages?: IPage[]
    header: any
    color: string
    popupWeb: any
}

export const PopupDeletePage: React.FC<Props> = ({ popupDeletePage, setPopupDeletePage, getPages, page, pages, header, color, popupWeb }) => {

  const [loading, setLoading] = useState(false)

  return (
    <div onClick={() => {
        if (!popupDeletePage.mouse) {
          setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDeletePage({ ...popupDeletePage, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popupDeletePage.view} ${popupDeletePage.opacity} transition-opacity duration-200 fixed w-full h-full px-4 bg-black/30 flex top-0 left-0 z-50`}>
        <div onMouseEnter={() => setPopupDeletePage({ ...popupDeletePage, mouse: true })} onMouseLeave={() => setPopupDeletePage({ ...popupDeletePage, mouse: false })} className={`${popupDeletePage.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[500px] max-h-[600px] overflow-y-auto p-5 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p>¿Estas seguro que deseas eliminar la pagina: <span className='font-medium'>{page?.page}</span>?</p>
          <div className='flex gap-6'>
            <ButtonSubmit submitLoading={loading} textButton='Eliminar' action={async (e: any) => {
              e.preventDefault()
              if (!loading) {
                setLoading(true)
                const newPages = pages?.filter(pag => pag._id !== page?._id)
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/design`, { header: header, pages: newPages, color: color, popup: popupWeb })
                getPages()
                setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                    setPopupDeletePage({ ...popupDeletePage, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
                setLoading(false)
              }
            }} color='red-500' config='w-28' />
            <button onClick={(e: any) => {
              e.preventDefault()
              setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupDeletePage({ ...popupDeletePage, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }} className='my-auto'>Cancelar</button>
          </div>
        </div>
      </div>
  )
}
