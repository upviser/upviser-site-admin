import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { ButtonSubmit, Input } from '../ui'
import { IPage } from '@/interfaces'

interface Props {
    popupPage: any
    setPopupPage: any
    setLoading: any
    getDesign: any
    loading: boolean
    setNewPage: any
    newPage: IPage
    pages: any
    header: any
    error: string
    setError: any
}

export const PopupNewPage: React.FC<Props> = ({ popupPage, setPopupPage, setLoading, getDesign, loading, setNewPage, newPage, pages, header, error, setError }) => {

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popupPage.view === 'flex') {
        setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopupPage({ ...popupPage, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupPage, setPopupPage]);

  return (
    <div className={`${popupPage.view} ${popupPage.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 bg-black/30 fixed z-50`}>
        <div ref={popupRef} onMouseEnter={() => setPopupPage({ ...popupPage, mouse: true })} onMouseLeave={() => setPopupPage({ ...popupPage, mouse: false })} className={`${popupPage.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 p-5 bg-white m-auto rounded-xl border border-black/5 w-[500px] flex flex-col gap-4 shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{ error }</p>
              : ''
          }
          <h2 className='font-medium text-lg'>Nueva pagina</h2>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Nombre de la pagina</p>
            <Input placeholder='Nombre' value={newPage.page} change={(e: any) => setNewPage({ ...newPage, page: e.target.value })} />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Slug</p>
            <Input placeholder='Slug' value={newPage.slug} change={(e: any) => setNewPage({ ...newPage, slug: e.target.value })} />
          </div>
          <ButtonSubmit action={async (e: any) => {
            e.preventDefault()
            if (!loading) {
              setLoading(true)
              if (newPage.page !== '' && newPage.slug !== '') {
                const updatePages = [...pages]
                updatePages.push(newPage)
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/design`, { pages: updatePages, header: header })
                setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                getDesign()
                setTimeout(() => {
                  setPopupPage({ ...popupPage, view: 'hidden', opacity: 'opacity-0' })
                  setNewPage({ page: '', slug: '' })
                }, 200)
                setLoading(false)
              } else {
                setError('Debes ingresar todos los datos')
                setLoading(false)
              }
              
            }
          }} color='main' submitLoading={loading} textButton='Agregar pagina' />
        </div>
      </div>
  )
}
