import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Button2, Input, Select, Textarea } from '../ui'

export const Information = ({ information, setInformation }: { information: IProduct, setInformation: any }) => {

  const [rotate, setRotate] = useState('rotate-90')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  const imageChange = async (e: any, index: number) => {
    if (!loadingImage) {
      setLoadingImage(true)
      const formData = new FormData();
      formData.append('image', e[0]);
      formData.append('name', e[0].name);
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8'
          }
        })
        const beforeInformations = [...information.informations!]
        beforeInformations[index].image = data
        setInformation({ ...information, informations: beforeInformations })
        setLoadingImage(false)
      } catch (error) {
        setLoadingImage(false)
        setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
      }
    }
  }

  return (
    <div className='border border-black/5 flex flex-col rounded-xl dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <button onClick={(e: any) => {
        e.preventDefault()
        if (rotate === 'rotate-90') {
          setRotate('-rotate-90')
        } else {
          setRotate('rotate-90')
        }
      }} className={`${rotate === 'rotate-90' ? 'rounded-b-xl' : 'border-b border-black/5 dark:border-neutral-700'} font-medium w-full flex justify-between bg-white rounded-t-xl p-5 dark:bg-neutral-800`}>
        <h2 className='font-medium text-[15px]'>Bloques informativos</h2>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
      </button>
      <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex flex-col gap-4 bg-white p-5 rounded-b-xl dark:bg-neutral-800`}>
        {
          information.informations?.map((info, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className='text-sm font-medium'>Bloque {index + 1}</h3>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Titulo</p>
                <Input placeholder='Titulo' value={info.title} change={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].title = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Descripción</p>
                <Textarea placeholder='Descripción' value={info.description!} change={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].description = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }} />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>imagen</p>
                <input type='file' name='image' onChange={(e: any) => imageChange(e, index)} className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Aliniación de la información</p>
                <Select value={info.align} change={(e: any) => {
                  const beforeInformations = [...information.informations!]
                  beforeInformations[index].align = e.target.value
                  setInformation({ ...information, informations: beforeInformations })
                }}>
                  <option>Izquierda</option>
                  <option>Derecha</option>
                  <option>Centro</option>
                </Select>
              </div>
            </div>
          ))
        }
        <Button2 action={(e: any) => {
          e.preventDefault()
          const beforeInformations = [...information.informations!]
          beforeInformations.push({ title: '', description: '', image: '', align: 'Izquierda' })
          setInformation({ ...information, informations: beforeInformations })
        }}>Agregar bloque informativo</Button2>
      </div>
    </div>
  )
}
