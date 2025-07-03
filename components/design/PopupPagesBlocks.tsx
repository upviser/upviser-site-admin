import React from 'react'
import Image from 'next/image'
import { IFunnel, IProduct, IService } from '@/interfaces'
import { useSession } from 'next-auth/react'

interface Props {
    popup: any
    setPopup: any
    pages?: any
    pageProduct?: any
    setPageProduct?: any
    pageCategory?: any
    setPageCategory?: any
    indexPage?: any
    indexFunnel?: any
    indexStep?: any
    indexProduct?: any
    indexCategory?: any
    setPages?: any
    funnels?: IFunnel[]
    setFunnels?: any
    indexService?: any
    indexStepService?: any
    services?: IService[]
    setServices?: any
    products?: IProduct[]
}

export const PopupPagesBlocks: React.FC<Props> = ({ popup, setPopup, pages, pageProduct, setPageProduct, pageCategory, setPageCategory, indexPage, indexFunnel, indexStep, indexProduct, indexCategory, setPages, funnels, setFunnels, indexService, indexStepService, services, setServices, products }) => {
  
  const { data: session } = useSession()
  
  return (
    <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 w-full h-full top-0 left-0 bg-black/30 fixed z-50`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-1' ? 'scale-100' : 'scale-90'} transition-transform duration-200 p-8 bg-white h-[550px] m-auto rounded-xl border w-[810px] flex flex-col gap-4 shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <h2 className='font-medium text-lg'>Bloques de contenidos</h2>
          <div className='flex flex-wrap gap-4 overflow-y-auto'>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Slider.png' />
              <p className="m-auto">Carrusel</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 1', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Bloque%201.png' />
              <p className="m-auto">Bloque 1</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 2', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Bloque%202.png' />
              <p className="m-auto">Bloque 2</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 3', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Bloque%203.png' />
              <p className="m-auto">Bloque 3</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 4', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', subTitle3: 'Lorem ipsum', description3: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button3: 'Lorem ipsum', buttonLink3: '', image: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Bloque%204.png' />
              <p className="m-auto">Bloque 4</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 5', info: { title: 'Lorem ipsum', subTitle: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', subTitle2: 'Lorem ipsum', description2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button2: 'Lorem ipsum', buttonLink2: '', image: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Bloque%205.png' />
              <p className="m-auto">Bloque 5</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Contacto.png' />
              <p className="m-auto">Contacto</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border my-auto dark:border-neutral-600" width={397} height={190} draggable='false' alt="Imagen Slider" src='/Suscripcion.png' />
              <p className="mx-auto">Suscripción</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Lead 1', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Lead%201.png' />
              <p className="m-auto">Lead 1</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Video', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Video.png' />
              <p className="m-auto">Video</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Agendar llamada', meeting: '', info: { title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', description: 'Lorem ipsum', video: 'Logo' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Agendar%20llamada.png' />
              <p className="m-auto">Agendar llamada</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloque 7', meeting: '', info: { description: 'Lorem ipsum' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border m-auto dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Bloque%207.png' />
              <p className="mx-auto">Bloque 7</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Checkout', info: {  } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Checkout', info: {  } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Checkout', info: {  } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Checkout', info: {  } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Checkout', info: {  } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Checkout.png' />
              <p className="m-auto">Checkout</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Llamadas', meetings: [], info: {  } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Llamadas', meetings: [], info: {  } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Llamadas', meetings: [], info: {  } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Llamadas', meetings: [], info: {  } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Llamadas', meetings: [], info: {  } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Calls.png' />
              <p className="m-auto">Llamadas</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Lead 2', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipsum', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Lead%202.png' />
              <p className="m-auto">Lead 2</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Servicios', services: [], info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Servicios.png' />
              <p className="m-auto">Servicios</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Planes', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Planes.png' />
              <p className="m-auto">Planes</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Preguntas frecuentes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: 'Lorem ipsum', response: 'Lorem ipsum' }] } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Preguntas%20frecuentes.png' />
              <p className="m-auto">Preguntas frecuentes</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Bloques', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', blocks: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', buttonText: 'Lorem ipsum', buttonLink: '' }] } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Bloques.png' />
              <p className="m-auto">Bloques</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Reseñas', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', reviews: [{ review: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', stars: '5', name: 'Lorem ipsum' }] } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Resenas.png' />
              <p className="m-auto">Reseñas</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Formulario', form: '', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Formulario.png' />
              <p className="m-auto">Formulario</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Lead 3', form: '', info: { description2: 'Lorem ipsum', title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', subTitle: 'Lorem ipusm', subTitle2: 'Lorem ipsum', subTitle3: 'Lorem ipsum', video: '' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Lead%203.png' />
              <p className="m-auto">Lead 3</p>
            </div>
            <div onClick={() => {
              if (indexPage !== -1) {
                const oldPages = [...pages]
                oldPages[indexPage].design.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPages(oldPages)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexFunnel !== -1 && indexStep !== -1) {
                const oldFunnels = [...funnels!]
                oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setFunnels(oldFunnels)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexService !== -1 && indexStepService !== -1) {
                const oldServices = [...services!]
                oldServices[indexService].steps[indexStepService].design?.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setServices(oldServices)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexCategory !== -1) {
                const oldPageCategory = [...pageCategory!]
                oldPageCategory[indexCategory].design.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageCategory(oldPageCategory)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              } else if (indexProduct !== -1) {
                const oldPageProduct = [...pageProduct!]
                oldPageProduct[indexProduct].design.push({ content: 'Tabla comparativa', service: { service: '' }, info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.' } })
                setPageProduct(oldPageProduct)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                }, 200)
              }
            }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
              <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Tabla%20comparativa.png' />
              <p className="m-auto">Tabla comparativa</p>
            </div>
            {
              products?.length
                ? (
                  <>
                    <div onClick={() => {
                      if (indexPage !== -1) {
                        const oldPages = [...pages]
                        oldPages[indexPage].design.push({ content: 'Carrusel de imagenes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: '' }] } })
                        setPages(oldPages)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexFunnel !== -1 && indexStep !== -1) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Carrusel de imagenes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: '' }] } })
                        setFunnels(oldFunnels)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexService !== -1 && indexStepService !== -1) {
                        const oldServices = [...services!]
                        oldServices[indexService].steps[indexStepService].design?.push({ content: 'Carrusel de imagenes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: '' }] } })
                        setServices(oldServices)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexCategory !== -1) {
                        const oldPageCategory = [...pageCategory!]
                        oldPageCategory[indexCategory].design.push({ content: 'Carrusel de imagenes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: '' }] } })
                        setPageCategory(oldPageCategory)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexProduct !== -1) {
                        const oldPageProduct = [...pageProduct!]
                        oldPageProduct[indexProduct].design.push({ content: 'Carrusel de imagenes', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', faq: [{ question: '' }] } })
                        setPageProduct(oldPageProduct)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
                      <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Carrusel%20imagenes.png' />
                      <p className="m-auto">Carrusel de imagenes</p>
                    </div>
                    <div onClick={() => {
                      if (indexPage !== -1) {
                        const oldPages = [...pages]
                        oldPages[indexPage].design.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
                        setPages(oldPages)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexFunnel !== -1 && indexStep !== -1) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
                        setFunnels(oldFunnels)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexService !== -1 && indexStepService !== -1) {
                        const oldServices = [...services!]
                        oldServices[indexService].steps[indexStepService].design?.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
                        setServices(oldServices)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexCategory !== -1) {
                        const oldPageCategory = [...pageCategory!]
                        oldPageCategory[indexCategory].design.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
                        setPageCategory(oldPageCategory)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexProduct !== -1) {
                        const oldPageProduct = [...pageProduct!]
                        oldPageProduct[indexProduct].design.push({ content: 'Categorias', info: { title: 'Categorias', descriptionView: true } })
                        setPageProduct(oldPageProduct)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
                      <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Categorias.png' />
                      <p className="m-auto">Categorias</p>
                    </div>
                    <div onClick={() => {
                      if (indexPage !== -1) {
                        const oldPages = [...pages]
                        oldPages[indexPage].design.push({ content: 'Productos', info: { products: '' } })
                        setPages(oldPages)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexFunnel !== -1 && indexStep !== -1) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Productos', info: { products: '' } })
                        setFunnels(oldFunnels)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexService !== -1 && indexStepService !== -1) {
                        const oldServices = [...services!]
                        oldServices[indexService].steps[indexStepService].design?.push({ content: 'Productos', info: { products: '' } })
                        setServices(oldServices)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexCategory !== -1) {
                        const oldPageCategory = [...pageCategory!]
                        oldPageCategory[indexCategory].design.push({ content: 'Productos', info: { products: '' } })
                        setPageCategory(oldPageCategory)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexProduct !== -1) {
                        const oldPageProduct = [...pageProduct!]
                        oldPageProduct[indexProduct].design.push({ content: 'Productos', info: { products: '' } })
                        setPageProduct(oldPageProduct)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
                      <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Productos.png' />
                      <p className="m-auto">Productos</p>
                    </div>
                    <div onClick={() => {
                      if (indexPage !== -1) {
                        const oldPages = [...pages]
                        oldPages[indexPage].design.push({ content: 'Categorias 2', info: {} })
                        setPages(oldPages)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexFunnel !== -1 && indexStep !== -1) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Categorias 2', info: {} })
                        setFunnels(oldFunnels)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexService !== -1 && indexStepService !== -1) {
                        const oldServices = [...services!]
                        oldServices[indexService].steps[indexStepService].design?.push({ content: 'Categorias 2', info: {} })
                        setServices(oldServices)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexCategory !== -1) {
                        const oldPageCategory = [...pageCategory!]
                        oldPageCategory[indexCategory].design.push({ content: 'Categorias 2', info: {} })
                        setPageCategory(oldPageCategory)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexProduct !== -1) {
                        const oldPageProduct = [...pageProduct!]
                        oldPageProduct[indexProduct].design.push({ content: 'Categorias 2', info: {} })
                        setPageProduct(oldPageProduct)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
                      <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Categorias%202.png' />
                      <p className="m-auto">Categorias 2</p>
                    </div>
                    <div onClick={() => {
                      if (indexPage !== -1) {
                        const oldPages = [...pages]
                        oldPages[indexPage].design.push({ content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } })
                        setPages(oldPages)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexFunnel !== -1 && indexStep !== -1) {
                        const oldFunnels = [...funnels!]
                        oldFunnels[indexFunnel].steps[indexStep].design?.push({ content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } })
                        setFunnels(oldFunnels)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexService !== -1 && indexStepService !== -1) {
                        const oldServices = [...services!]
                        oldServices[indexService].steps[indexStepService].design?.push({ content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } })
                        setServices(oldServices)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexCategory !== -1) {
                        const oldPageCategory = [...pageCategory!]
                        oldPageCategory[indexCategory].design.push({ content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } })
                        setPageCategory(oldPageCategory)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      } else if (indexProduct !== -1) {
                        const oldPageProduct = [...pageProduct!]
                        oldPageProduct[indexProduct].design.push({ content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } })
                        setPageProduct(oldPageProduct)
                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                        }, 200)
                      }
                    }} className={`w-[355px] border p-2 rounded-xl flex flex-col gap-2 cursor-pointer transition-all duration-150 hover:border-main dark:border-neutral-600 dark:hover:border-main`}>
                      <Image className="border rounded-xl dark:border-neutral-600" width={450} height={216} draggable='false' alt="Imagen Slider" src='/Carrusel%20productos.png' />
                      <p className="m-auto">Carrusel Productos</p>
                    </div>
                  </>
                )
                : ''
            }
          </div>
        </div>
      </div>
  )
}
