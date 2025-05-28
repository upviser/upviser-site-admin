import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Button2, ButtonAI, Input, Select, Spinner2, Textarea } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
}

export const ProductSeo: React.FC<Props> = ({information, setInformation}) => {

  const [aiLoading, setAiLoading] = useState(false)
  const [aiView, setAiView] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [mouseInModal, setMouseInModal] = useState(false)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')
  const [titleSeo, setTitleSeo] = useState('')
  const [descriptionSeo, setDescriptionSeo] = useState('')
  const [rotate, setRotate] = useState('rotate-90')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateSeo = async (e: any) => {
    e.preventDefault()
    if (!aiLoading) {
      setAiLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-seo`, { description: description, type: type === 'Personalizado' ? newType : type })
      const filterTitleSeo = response.data.title
      const filterDescriptionSeo = response.data.description
      setTitleSeo(filterTitleSeo)
      setDescriptionSeo(filterDescriptionSeo)
      setAiLoading(false)
    }
  }

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
          <h2 className='font-medium text-[15px]'>Configuración SEO</h2>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${rotate} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
        </button>
        <div className={`${rotate === 'rotate-90' ? 'hidden' : 'flex'} flex flex-col gap-4 bg-white p-5 rounded-b-xl dark:bg-neutral-800`}>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Titulo SEO</p>
            <Input placeholder='Titulo SEO' name='titleSeo' change={inputChange} value={information.titleSeo} />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Descripción SEO</p>
            <Textarea placeholder='Descripción SEO' name='descriptionSeo' change={inputChange} value={information.descriptionSeo!} />
          </div>
          <ButtonAI click={(e: any) => {
            e.preventDefault()
            setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
            setTimeout(() => {
              setAiView({ ...aiView, view: 'flex', opacity: 'opacity-1' })
            }, 10)
          }} text={'Generar metadatos con IA'} config='w-fit' />
          <div onClick={() => {
            if (!aiView.mouse) {
              setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
              }, 200)
            }
          }} className={`${aiView.view} ${aiView.opacity} transition-opacity duration-200 bg-black/30 flex fixed top-0 left-0 z-50 w-full h-full`}>
            <div onMouseEnter={() => setAiView({ ...aiView, mouse: true })} onMouseLeave={() => setAiView({ ...aiView, mouse: false })} className={`${aiView.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 bg-white flex flex-col gap-4 m-auto p-6 dark:bg-neutral-800 w-[500px] rounded-xl border border-border dark:border-neutral-700`}>
              <h3 className='font-medium'>Generar metadatos con IA</h3>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Descripción del producto</p>
                <Textarea change={(e: any) => setDescription(e.target.value)} value={description} placeholder='Descripción del producto' config='h-20' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Tono del texto</p>
                <Select change={(e: any) => setType(e.target.value)} value='type'>
                  <option>Experto</option>
                  <option>Persuasivo</option>
                  <option>Personalizado</option>
                </Select>
              </div>
              {
                type === 'Personalizado'
                  ? (
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Tono personalizado</p>
                      <Input placeholder='Tono' change={(e: any) => setNewType(e.target.value)} value={newType} />
                    </div>
                  )
                  : ''
              }
              <ButtonAI click={generateSeo} text={'Generar metadatos'} loading={aiLoading} />
              {
                titleSeo !== ''
                  ? (
                    <div className='flex flex-col gap-2'>
                      <Input placeholder='Titulo generado por la inteligencia artificial' value={titleSeo} change={(e: any) => setTitleSeo(e.target.value)} />
                      <Button2 action={(e: any) => {
                        e.preventDefault()
                        setInformation({...information, titleSeo: titleSeo})
                        setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }}>Usar titulo SEO</Button2>
                    </div>
                  )
                  : ''
              }
              {
                descriptionSeo !== ''
                  ? (
                    <div className='flex flex-col gap-2'>
                      <Textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionSeo} change={(e: any) => setDescriptionSeo(e.target.value)} config='h-24' />
                      <Button2 action={(e: any) => {
                        e.preventDefault()
                        setInformation({...information, descriptionSeo: descriptionSeo})
                        setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }}>Usar descripción SEO</Button2>
                    </div>
                  )
                  : ''
              }
              {
                titleSeo !== '' && descriptionSeo !== ''
                  ? (
                    <Button action={(e: any) => {
                      e.preventDefault()
                      setInformation({...information, titleSeo: titleSeo, descriptionSeo: descriptionSeo})
                      setAiView({ ...aiView, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setAiView({ ...aiView, view: 'hidden', opacity: 'opacity-0' })
                      }, 200)
                    }}>Usar ambos</Button>
                  )
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
