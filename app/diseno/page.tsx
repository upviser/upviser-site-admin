"use client"
import { Design, ICall, ICategory, ICategoryPage, IFooter, IForm, IFunnel, IHeader, IPage, IPopupWeb, IProduct, IProductPage, IService, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Image from 'next/image'
import { Bloque1, Bloque2, Bloque3, Bloque4, Bloque5, Call, Contact, Layout, Lead1, PopupNewCall, PopupNewForm, PopupNewPage, PopupPagesBlocks, Slider, Subscription, Video, PopupDeleteFunnel, PopupDeletePage, Bloque7, Checkout, Calls, Lead2, Services, Plans, Faq, Blocks, Reviews, Form, Lead3, Table, SliderImages, Categories, Products, PageProduct, Categories2, SliderProducts, PopupDeleteService } from '@/components/design'
import { Button, Button2, Button2Red, ButtonSecondary2, ButtonSubmit, Input, Select, Spinner, Textarea } from '@/components/ui'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { PopupNewFunnel } from '@/components/funnels'
import { IoLaptopOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { PopupNewService } from '@/components/service'
import { SlMenu } from 'react-icons/sl'
import { GrClose } from 'react-icons/gr'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import styles from  "./Slider.module.css"
import { Pagination } from "swiper/modules"
import { NumberFormat } from '@/utils'

export default function Page () {

  const [part, setPart] = useState('')
  const [step, setStep] = useState('')
  const [pages, setPages] = useState<IPage[]>([
    {
      page: 'Inicio',
      slug: '',
      header: true,
      design: [
        { content: 'Carrusel', info: { banner: [{ title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', button: 'Lorem ipsum', buttonLink: '', image: '' }] } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    },
    {
      page: 'Contacto',
      slug: 'contacto',
      header: true,
      design: [
        { content: 'Contacto', info: { title: 'Contacto', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora ipsam nesciunt impedit explicabo, alias similique illum neque voluptas nemo eos distinctio vero. Veritatis iste et porro inventore tempore commodi?', titleForm: 'Llena el siguiente formulario' } },
        { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
      ]
    }
  ])
  const [header, setHeader] = useState<IHeader>({ topStrip: 'Lorem ipsum dolor sit amet consectetur' })
  const [footer, setFooter] = useState<IFooter>({ bgColor: '#ffffff', textColor: '#111111', funnelText: '' })
  const [popupWeb, setPopupWeb] = useState<IPopupWeb>({ active: false, wait: 5, title: '', description: '' })
  const [color, setColor] = useState('#000000')
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)
  const [deletePopupLoading, setDeletePopupLoading] = useState(false)
  const [navCategoriesOpacity, setNavCategoriesOpacity] = useState('-mt-[330px]')
  const [mouseEnter, setMouseEnter] = useState(true)
  const [mouse, setMouse] = useState(-1)
  const [order, setOrder] = useState('Más recientes')
  const [edit, setEdit] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupCategory, setPopupCategory] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupPage, setPopupPage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newPage, setNewPage] = useState({ page: '', slug: '', header: false, design: [] })
  const [indexPage, setIndexPage] = useState(-1)
  const [indexFunnel, setIndexFunnel] = useState(-1)
  const [indexStep, setIndexStep] = useState(-1)
  const [selectFunnel, setSelectFunnel] = useState<IFunnel>()
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [newFunnel, setNewFunnel] = useState<IFunnel>({ funnel: '', steps: [{ step: '', slug: '' }] })
  const [title, setTitle] = useState('')
  const [popupNewFunnel, setPopupNewFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [forms, setForms] = useState<IForm[]>()
  const [popupForm, setPopupForm] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleForm, setTitleForm] = useState('')
  const [newForm, setNewForm] = useState<IForm>({ nameForm: '', informations: [{ icon: '', text: '' }], labels: [{ data: '', name: '', text: '', type: '', datas: [] }], button: '', action: 'Ir a una pagina', tags: [] })
  const [calls, setCalls] = useState<ICall[]>()
  const [newCall, setNewCall] = useState<ICall>({ nameMeeting: '', duration: '15 minutos', labels: [{ type: '', data: '', text: '' }], buttonText: '', tags: [], action: 'Mostrar mensaje' })
  const [popupCall, setPopupCall] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [titleMeeting, setTitleMeeting] = useState('')
  const [popupDeletePage, setPopupDeletePage] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDeleteFunnel, setPopupDeleteFunnel] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [popupDeleteService, setPopupDeleteService] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [selectPage, setSelectPage] = useState<IPage>()
  const [responsive, setResponsive] = useState('calc(100%-350px)')
  const [id, setId] = useState<string>()
  const [error, setError] = useState('')
  const [newData, setNewData] = useState('')
  const [loadingNewData, setLoadingNewData] = useState(false)
  const [clientData, setClientData] = useState([])
  const [services, setServices] = useState<IService[]>([])
  const [popupService, setPopupService] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [newFunctionality, setNewFunctionality] = useState('')
  const [newService, setNewService] = useState<IService>({ name: '', steps: [{ step: '' }], typeService: '', typePrice: '', typePay: 'El precio incluye el IVA', plans: { functionalities: [''], plans: [{ name: '', price: '', functionalities: [{ name: '', value: '' }] }] }})
  const [loadingService, setLoadingService] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [selectService, setSelectService] = useState<IService>()
  const [indexService, setIndexService] = useState(-1)
  const [indexStepService, setIndexStepService] = useState(-1)
  const [type, setType] = useState('')
  const [menu, setMenu] = useState('hidden')
  const [style, setStyle] = useState({ design: 'Borde', form: 'Redondeadas', primary: '', secondary: '', button: '#111111', borderButton: 0, borderBlock: 0, borderColor: '#000000' })
  const [popupWhatsapp, setPopupWhatsapp] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [whatsapp, setWhatsapp] = useState(false)
  const [editSubPage, setEditSubPage] = useState(-1)
  const [loadingSubPage, setLoadingSubPage] = useState(false)
  const [chat, setChat] = useState({ bgColor: '' })
  const [instagram, setInstagram] = useState(false)
  const [chatView, setChatView] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [productsOrder, setProductsOrder] = useState<IProduct[]>()
  const [productPage, setProductPage] = useState<IProductPage[]>([{ reviews: true, title: '', text: '', design: [
    { content: 'Carrusel productos', info: { title: 'Lorem ipsum', products: 'Todos' } },
    { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
  ] }])
  const [categoryPage, setCategoryPage] = useState<ICategoryPage[]>([{ 
    design: [
      { content: 'Bloque 6', info: { title: 'Lorem ipsum', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', image: '' } },
      { content: 'Categorias 2', info: {} },
      { content: 'Productos', info: {} },
      { content: 'Suscripción', info: { title: 'Suscribete a nuestra lista' } }
    ] 
  }])
  const [indexProduct, setIndexProduct] = useState(-1)
  const [indexCategory, setIndexCategory] = useState(-1)
  const [cartPage, setCartPage] = useState({ bgColor: '#ffffff', textColor: '#111111', detailsColor: '#ffffff' })
  const [checkoutPage, setCheckoutPage] = useState({ bgColor: '#ffffff', textColor: '#111111', detailsColor: '#ffffff' })

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    setStoreData(response.data)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getDesign = async () => {
    const { data }: { data: Design } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/design`)
    setId(data._id)
    if (data.pages) {
      setPages(data.pages)
      setHeader(data.header)
      setFooter(data.footer)
      setWhatsapp(data.whatsapp)
      setChat(data.chat)
      setInstagram(data.instagram)
      setChatView(data.chatView)
      setCartPage(data.cartPage)
      setCheckoutPage(data.checkoutPage)
      if (data.popup) {
        setPopupWeb(data.popup)
      }
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  const getFunnels = async () => {
    setLoading(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const getCategories = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(res.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProductsOrder(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const getForms = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forms`)
    setForms(res.data)
  }

  useEffect(() => {
    getForms()
  }, [])

  const getCalls = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
    setCalls(res.data)
  }

  useEffect(() => {
    getCalls()
  }, [])

  const getClientData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-data`)
    setClientData(res.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getTags = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const getStyle = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/style`)
    setStyle(res.data)
  }

  useEffect(() => {
    getStyle()
  }, [])

  const getPage = () => {
    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    const params = new URLSearchParams(url.search)
    const page = params.get('page')
    if (page) {
      setPart(page)
    }
  }

  useEffect(() => {
    getPage()
  }, [])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newPages = [...pages]
    const [removedItem] = newPages.splice(fromIndex, 1)
    newPages.splice(toIndex, 0, removedItem)
    return newPages;
  }

  const handleMoveDown = async (index: number) => {
    if (index < pages.length - 1) {
      const updatedPages = moveItem(index, index + 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages })
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index > 0) {
      const updatedPages = moveItem(index, index - 1)
      setPages(updatedPages)
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: updatedPages })
    }
  }

  const moveBlock = (pageIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedPages = [...pages]
    const blocks = updatedPages[pageIndex].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setPages(updatedPages)
  }

  const moveBlockCategories = (blockIndex: number, direction: 'up' | 'down') => {
    const updatedPages = [...categoryPage]
    const blocks = updatedPages[0].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setCategoryPage(updatedPages)
  }

  const moveBlockProduct = (blockIndex: number, direction: 'up' | 'down') => {
    const updatePages = [...productPage]
    const blocks = updatePages[0].design
    const temp = blocks[blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks.length - 1) {
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
    }
    setProductPage(updatePages)
  }

  const moveBlockFunnel = (funnelIndex: number, stepIndex: number, blockIndex: number, direction: 'up' | 'down') => {
    const updatedFunnels = [...funnels]
    const blocks = updatedFunnels[funnelIndex].steps[stepIndex].design
    const temp = blocks![blockIndex]
    if (direction === 'up' && blockIndex > 0) {
      blocks![blockIndex] = blocks![blockIndex - 1]
      blocks![blockIndex - 1] = temp
    } else if (direction === 'down' && blockIndex < blocks!.length - 1) {
      blocks![blockIndex] = blocks![blockIndex + 1]
      blocks![blockIndex + 1] = temp
    }
    setFunnels(updatedFunnels)
  }

  return (
    <>
      <PopupNewFunnel popup={popupNewFunnel} setPopup={setPopupNewFunnel} getFunnels={getFunnels} newFunnel={newFunnel!} setNewFunnel={setNewFunnel} selectFunnel={selectFunnel!} title={title} error={error} setError={setError} services={services} funnels={funnels} />
      <PopupNewPage popupPage={popupPage} setPopupPage={setPopupPage} setLoading={setLoading} getDesign={getDesign} loading={loading} setNewPage={setNewPage} newPage={newPage} pages={pages} header={header} error={error} setError={setError} />
      <PopupPagesBlocks popup={popup} setPopup={setPopup} pages={pages} indexPage={indexPage} indexFunnel={indexFunnel} indexStep={indexStep} indexService={indexService} indexStepService={indexStepService} setPages={setPages} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} pageCategory={categoryPage} pageProduct={productPage} indexCategory={indexCategory} indexProduct={indexProduct} products={productsOrder} />
      <PopupNewForm popupForm={popupForm} setPopupForm={setPopupForm} titleForm={titleForm} newForm={newForm} setNewForm={setNewForm} getForms={getForms} tags={tags} funnels={funnels} getTags={getTags} error={error} setError={setError} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} style={style} />
      <PopupNewCall popupCall={popupCall} setPopupCall={setPopupCall} titleMeeting={titleMeeting} newCall={newCall} setNewCall={setNewCall} getCalls={getCalls} tags={tags} getTags={getTags} error={error} setError={setError} funnels={funnels} newData={newData} setNewData={setNewData} loadingNewData={loadingNewData} setLoadingNewData={setLoadingNewData} clientData={clientData} getClientData={getClientData} calls={calls} storeData={storeData} />
      <PopupDeleteFunnel popupDeleteFunnel={popupDeleteFunnel} setPopupDeleteFunnel={setPopupDeleteFunnel} selectFunnel={selectFunnel!} setFunnels={setFunnels} getFunnels={getFunnels} />
      <PopupDeletePage popupDeletePage={popupDeletePage} setPopupDeletePage={setPopupDeletePage} getPages={getDesign} page={selectPage} pages={pages} header={header} color={color} popupWeb={popupWeb} />
      <PopupNewService popupService={popupService} setPopupService={setPopupService} newService={newService} setNewService={setNewService} loadingService={loadingService} setLoadingService={setLoadingService} getServices={getServices} error={error} title={title} newFunctionality={newFunctionality} setNewFunctionality={setNewFunctionality} tags={tags} getTags={getTags} services={services} setError={setError} />
      <PopupDeleteService getServices={getServices} setServices={setServices} popupDeleteService={popupDeleteService} setPopupDeleteService={setPopupDeleteService} selectService={selectService} />
      <div className='flex h-full bg-white dark:bg-neutral-900'>
        <div className='p-4 fixed flex lg:hidden'>
          <button onClick={(e: any) => {
            e.preventDefault()
            if (menu === 'hidden') {
              setMenu('flex')
            } else {
              setMenu('hidden')
            }
          }} className='h-fit'>{menu === 'hidden' ? <SlMenu className='text-lg' /> : <GrClose className='text-lg' />}</button>
        </div>
        <div className={`${menu} z-40 bg-white flex flex-col gap-4 fixed p-4 overflow-y-auto lg:hidden dark:bg-neutral-900`} style={{ height: 'calc(100% - 49px)' }}>
          <button onClick={(e: any) => {
            e.preventDefault()
            if (menu === 'hidden') {
              setMenu('flex')
            } else {
              setMenu('hidden')
            }
          }} className='h-fit'>{menu === 'hidden' ? <SlMenu className='text-lg' /> : <GrClose className='text-lg' />}</button>
          <div className='w-[350px] flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
            {
              part === ''
                ? (
                  <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 justify-between'>
                      <h2 className='text-lg font-medium'>Páginas</h2>
                      <Link href={process.env.NEXT_PUBLIC_WEB_URL!} target='_blank' className='my-auto flex gap-1 transition-colors duration-150 hover:bg-neutral-100 p-1 rounded-md dark:hover:bg-neutral-800'><FaRegEye className='text-xl my-auto' />Ver sitio web</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                      {
                        pages.map((page, index) => (
                          <div key={page.slug} className='flex flex-col gap-2'>
                            <div className='flex gap-4'>
                              <button onClick={() => {
                                setType('Page')
                                setMenu('hidden')
                                setPart(page.page)
                              }} className='text-left w-full'>{page.page}</button>
                              <div className='flex gap-2'>
                                <div className='flex gap-1'>
                                  <input type='checkbox' checked={page.header} onChange={async (e: any) => {
                                    const newPages = [...pages]
                                    newPages[index].header = e.target.checked
                                    setPages(newPages)
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                  }} />
                                  <p className='my-auto'>Menu</p>
                                </div>
                                {
                                  page.header === true
                                    ? (
                                      <div className='flex gap-1'>
                                        <input type='checkbox' checked={page.button === true ? true : false} onChange={async (e: any) => {
                                          const newPages = [...pages]
                                          newPages[index].button = e.target.checked
                                          setPages(newPages)
                                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                        }} />
                                        <p className='my-auto'>Boton</p>
                                      </div>
                                    )
                                    : ''
                                }
                                <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                                <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                                {
                                  page.slug !== 'tienda'
                                    ? (
                                      <button onClick={(e: any) => {
                                        e.preventDefault()
                                        setSelectPage(page)
                                        setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                                        setTimeout(() => {
                                          setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-1' })
                                        }, 10)
                                      }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                                    )
                                    : ''
                                }
                              </div>
                            </div>
                            {
                              page.subPage?.map((subPage, i) => (
                                <div key={subPage.slug} className='flex gap-2 ml-10 justify-between'>
                                  <p>{subPage.page}</p>
                                  <button onClick={async (e: any) => {
                                    e.preventDefault()
                                    const oldPages = [...pages]
                                    oldPages[index].subPage?.splice(i, 1)
                                    setPages(oldPages)
                                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                                  }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                                </div>
                              ))
                            }
                          </div>
                        ))
                      }
                      <div className='flex gap-4'>
                        <button onClick={() => setPart('Pagina de producto')} className='text-left w-full'>Pagina de producto</button>
                      </div>
                      <div className='flex gap-4'>
                        <button onClick={() => setPart('Pagina de categorias')} className='text-left w-full'>Pagina de categorias</button>
                      </div>
                      <div className='flex gap-4'>
                        <button onClick={() => {
                          setMenu('hidden')
                          setPart('Popup')}
                        } className='text-left w-full'>Popup</button>
                      </div>
                      <div className='flex gap-4'>
                        <button onClick={() => {
                          setMenu('hidden')
                          setPart('Chat')
                        }} className='text-left w-full'>Chat</button>
                      </div>
                    </div>
                    <h2 className='text-lg font-medium'>Embudos</h2>
                    <div className='flex flex-col gap-2'>
                      {
                        funnels.length
                          ? (
                            funnels.map((funnel, index) => (
                              <div key={funnel._id} className='flex gap-4 justify-between'>
                                <button onClick={(e: any) => {
                                  setType('Funnel')
                                  setPart(funnel.funnel)
                                  setSelectFunnel(funnel)
                                }} className='text-left w-full'>{funnel.funnel}</button>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  setSelectFunnel(funnel)
                                  setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                              </div>
                            ))
                          )
                          : <p>No hay embudos creados</p>
                      }
                    </div>
                    <h2 className='text-lg font-medium'>Servicios</h2>
                    <div className='flex flex-col gap-2'>
                      {
                        services.length
                          ? services.map((service, index) => {
                            if (service.steps.some(step => step.slug && step.slug !== '')) {
                              return (
                                <div key={service._id} className='flex gap-4 justify-between'>
                                  <button onClick={(e: any) => {
                                    setType('Service')
                                    setPart(service.name)
                                    setSelectService(service)
                                  }} className='text-left w-full'>{service.name}</button>
                                  <button onClick={(e: any) => {
                                    e.preventDefault()
                                    setSelectService(service)
                                    setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
                                    setTimeout(() => {
                                      setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-1' })
                                    }, 10)
                                  }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                                </div>
                              )
                            }
                          })
                          : <p>No hay servicios creados</p>
                      }
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Button2 action={() => {
                        setError('')
                        setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }} config='w-full'>Agregar pagina</Button2>
                      {
                        whatsapp
                          ? (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: false })
                              setWhatsapp(false)
                            }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Whatsapp</button>
                          )
                          : (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: true })
                              setWhatsapp(true)
                            }} className={`w-full bg-green-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-green-500/80`}>Activar boton Whatsapp</button>
                          )
                      }
                      {
                        instagram
                          ? (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: false })
                              setInstagram(false)
                            }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Instagram</button>
                          )
                          : (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: true })
                              setInstagram(true)
                            }} className={`w-full bg-purple-600 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-purple-600/80`}>Activar boton Instagram</button>
                          )
                      }
                      {
                        chatView
                          ? (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: false })
                              setChatView(false)
                            }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Chat</button>
                          )
                          : (
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: true })
                              setChatView(true)
                            }} className={`w-full min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300`} style={{ backgroundColor: style.primary }}>Activar boton Chat</button>
                          )
                      }
                      <ButtonSecondary2 action={(e: any) => {
                        e.preventDefault()
                        setError('')
                        setNewFunnel({ funnel: '', description: '', steps: [{ step: '', slug: '' }] })
                        setTitle('Nuevo embudo')
                        setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }} config='w-full'>Agregar embudo</ButtonSecondary2>
                      <button onClick={(e: any) => setPart('Estilo')} className='mt-2 text-sm'>Editar estilo del sitio web</button>
                    </div>
                  </div>
                )
                : ''
            }
            {
              pages.map((page, i) => {
                if (part === page.page && type === 'Page') {
                  return (
                    <div key={page.slug} className='flex flex-col gap-4 mb-[104px]'>
                      <div className='border-b pb-4 dark:border-neutral-700'>
                        <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                      </div>
                      <h2 className='text-lg font-medium'>{page.page}</h2>
                      <h3 className='font-medium'>Seo</h3>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta titulo</p>
                        <Input placeholder='Meta titulo' value={page.metaTitle} change={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].metaTitle = e.target.value
                          setPages(oldPages)
                        }} />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Meta descripción</p>
                        <Textarea placeholder='Meta descripción' value={page.metaDescription!} change={(e: any) => {
                          const oldPages = [...pages]
                          oldPages[i].metaDescription = e.target.value
                          setPages(oldPages)
                        }} />
                      </div>
                      <input type='file' onChange={async (e: any) => {
                        if (!loadingImage) {
                          setLoadingImage(true)
                          setErrorImage('')
                          const formData = new FormData();
                          formData.append('image', e.target.files[0]);
                          formData.append('name', e.target.files[0].name);
                          try {
                            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                              headers: {
                                accept: 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8'
                              }
                            })
                            const oldPages = [...pages]
                            oldPages[i].image = data
                            setPages(oldPages)
                            setLoadingImage(false)
                          } catch (error) {
                            setLoadingImage(false)
                            setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                          }
                        }
                      }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                      {
                        loadingImage
                          ? (
                            <div className='flex w-full'>
                              <div className='w-fit m-auto'>
                                <Spinner />
                              </div>
                            </div>
                          )
                          : page.image && page.image !== ''
                            ? <Image src={page.image} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                            : ''
                      }
                    </div>
                  )
                }
              })
            }
            {
              part === 'Estilo'
                ? (
                  <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Estilo del sitio web</h2>
                    <div className='flex flex-col gap-2'>
                      <p>Tipo de diseño</p>
                      <Select change={(e: any) => setStyle({ ...style, design: e.target.value })} value={style?.design}>
                        <option>Borde</option>
                        <option>Sombreado</option>
                        <option>Ninguno</option>
                      </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Tipo de formas</p>
                      <Select change={(e: any) => setStyle({ ...style, form: e.target.value })} value={style?.form}>
                        <option>Redondeadas</option>
                        <option>Cuadradas</option>
                      </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color principal</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, primary: e.target.value })} value={style?.primary} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color segundario</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, secondary: e.target.value })} value={style?.secondary} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Color texto boton</p>
                      <input type='color' onChange={(e: any) => setStyle({ ...style, button: e.target.value })} value={style?.button} />
                    </div>
                  </div>
                )
                : ''
            }
            {
              part === 'Pagina de producto'
                ? (
                  <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Pagina de producto</h2>
                    <div className='flex gap-2'>
                      <input type='checkbox' checked={productPage[0].reviews} onChange={(e: any) => {
                        const beforeProductPage = [...productPage]
                        beforeProductPage[0].reviews = e.target.checked
                        setProductPage(beforeProductPage)
                      }} />
                      <p>Activar reseñas</p>
                    </div>
                    <p className='font-medium'>Agregar zona informativa</p>
                    <div className='flex flex-col gap-2'>
                      <p>titulo</p>
                      <Input placeholder='Titulo' value={productPage[0].title} change={(e: any) => {
                        const beforeProductPage = [...productPage]
                        beforeProductPage[0].title = e.target.value
                        setProductPage(beforeProductPage)
                      }} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Descripción</p>
                      <Textarea placeholder='Descripción' value={productPage[0].text} change={(e: any) => {
                        const beforeProductPage = [...productPage]
                        beforeProductPage[0].text = e.target.value
                        setProductPage(beforeProductPage)
                      }} />
                    </div>
                  </div>
                )
                : ''
            }
            {
              part === 'Pagina de categorias'
                ? (
                  <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Pagina de categorias</h2>
                  </div>
                )
                : ''
            }
            {
              part === 'Popup'
                ? (
                  <div className='flex flex-col gap-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Popup</h2>
                    <div className='flex gap-2'>
                      <input type='checkbox' checked={popupWeb.active} onChange={(e: any) => setPopupWeb({ ...popupWeb, active: e.target.checked })} />
                      <p>Activar Popup</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Aparecer</p>
                      <div className='flex gap-2'>
                        <Input type='number' placeholder='Segundos' value={popupWeb.wait} change={(e: any) => setPopupWeb({ ...popupWeb, wait: e.target.value })} />
                        <p className='my-auto'>segundos</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Titulo</p>
                      <Input placeholder='Titulo' value={popupWeb.title} change={(e: any) => setPopupWeb({ ...popupWeb, title: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Parrafo</p>
                      <Textarea placeholder='Descripción' value={popupWeb.description!} change={(e: any) => setPopupWeb({ ...popupWeb, description: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Texto boton</p>
                      <Input placeholder='Boton' value={popupWeb.buttonText} change={(e: any) => setPopupWeb({ ...popupWeb, buttonText: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p>Link boton</p>
                      <Select change={(e: any) => setPopupWeb({ ...popupWeb, buttonLink: e.target.value })} value={popupWeb.buttonLink}>
                        <option value=''>Seleccionar pagina</option>
                        {
                          pages.map(page => <option key={page._id} value={page.slug}>{page.page}</option>)
                        }
                        {
                          funnels.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>))
                        }
                        {
                          services.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{service.name} - {step.step}</option>))
                        }
                      </Select>
                    </div>
                    <p className='font-medium text-lg'>Mostrar formulario o llamada</p>
                    <div className='flex flex-col gap-2'>
                      <Select value={popupWeb.content} change={(e: any) => setPopupWeb({ ...popupWeb, content: e.target.value })}>
                        <option>Seleccionar formulario o llamada</option>
                        {
                          forms?.map(form => <option key={form._id} value={form._id}>{form.nameForm}</option>)
                        }
                        {
                          calls?.map(call => <option key={call._id} value={call._id}>{call.nameMeeting}</option>)
                        }
                      </Select>
                      <Button2 action={(e: any) => {
                        e.preventDefault()
                        setError('')
                        setTitleForm('Nuevo formulario')
                        setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '', type: '', datas: [] }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                        setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }}>Crear formulario</Button2>
                      <Button2 action={(e: any) => {
                        e.preventDefault()
                        setError('')
                        setNewCall({ type: [''], nameMeeting: '', duration: '15 minutos', intervals: '', description: '', title: '', labels: [{ type: '', data: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '' })
                        setTitleMeeting('Crear llamada')
                        setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                        setTimeout(() => {
                          setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                        }, 10)
                      }}>Crear llamada</Button2>
                    </div>
                  </div>
                )
                : ''
            }
            {
              part === 'Chat'
                ? (
                  <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>Chat</h2>
                    <div className='flex flex-col gap-2'>
                      <p>Color de fondo</p>
                      <input type='color' onChange={(e: any) => setChat({ ...chat, bgColor: e.target.value })} value={chat?.bgColor} />
                    </div>
                  </div>
                )
                : ''
            }
            {
              funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
                ? (
                  <div className='flex flex-col gap-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>{part}</h2>
                    {
                      funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)
                        ? (
                          <>
                            <p className='font-medium'>Paso: {step}</p>
                            <p className='font-medium'>Seo</p>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm'>Meta titulo</p>
                              <Input change={(e: any) => {
                                const oldFunnels = [...funnels]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                                setFunnels(oldFunnels)
                              }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaTitle} />
                            </div>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm'>Meta descripción</p>
                              <Textarea change={(e: any) => {
                                const oldFunnels = [...funnels]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                                setFunnels(oldFunnels)
                              }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                            </div>
                            <input type='file' onChange={async (e: any) => {
                              if (!loadingImage) {
                                setLoadingImage(true)
                                setErrorImage('')
                                const formData = new FormData();
                                formData.append('image', e.target.files[0]);
                                formData.append('name', e.target.files[0].name);
                                try {
                                  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                    headers: {
                                      accept: 'application/json',
                                      'Accept-Language': 'en-US,en;q=0.8'
                                    }
                                  })
                                  const oldFunnels = [...funnels!]
                                  oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.image = data
                                  setFunnels(oldFunnels)
                                  setLoadingImage(false)
                                } catch (error) {
                                  setLoadingImage(false)
                                  setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                                }
                              }
                            }} value={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                            {
                              loadingImage
                                ? (
                                  <div className='flex w-full'>
                                    <div className='w-fit m-auto'>
                                      <Spinner />
                                    </div>
                                  </div>
                                )
                                : funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image && funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                  ? <Image src={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                  : ''
                            }
                          </>
                        )
                        : (
                          <>
                            <p className='font-medium'>Pasos</p>
                            <div className='flex flex-col gap-2'>
                              {
                                funnels.find(funnel => funnel.funnel === part)?.steps.map(step => {
                                  if (step.slug && step.slug !== '') {
                                    return <button onClick={(e: any) => {
                                      setMenu('hidden')
                                      setStep(step.step)
                                    }} key={step._id} className='text-left'>{step.step}</button>
                                  }
                                })
                              }
                            </div>
                          </>
                        ) 
                    }
                    <Button2 action={(e: any) => {
                      setError('')
                      setNewFunnel(funnels.find(funnel => funnel.funnel === part)!)
                      setTitle(funnels.find(funnel => funnel.funnel === part)!.funnel)
                      setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Editar embudo</Button2>
                  </div>
                )
                : ''
            }
            {
              services.find(service => service.name === part) && type === 'Service'
                ? (
                  <div className='flex flex-col gap-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => services.find(service => service.name === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>{part}</h2>
                    <p className='font-medium'>Pasos</p>
                    {
                      services.find(service => service.name === part)!.steps!.find(st => st.step === step)
                        ? (
                          <>
                            <p className='font-medium'>Paso: {step}</p>
                            <p className='font-medium'>Seo</p>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm'>Meta titulo</p>
                              <Input change={(e: any) => {
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                                setServices(oldServices)
                              }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaTitle} />
                            </div>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm'>Meta descripción</p>
                              <Textarea change={(e: any) => {
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                                setServices(oldServices)
                              }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                            </div>
                            <input type='file' onChange={async (e: any) => {
                              if (!loadingImage) {
                                setLoadingImage(true)
                                setErrorImage('')
                                const formData = new FormData();
                                formData.append('image', e.target.files[0]);
                                formData.append('name', e.target.files[0].name);
                                try {
                                  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                    headers: {
                                      accept: 'application/json',
                                      'Accept-Language': 'en-US,en;q=0.8'
                                    }
                                  })
                                  const oldServices = [...services]
                                  oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.image = data
                                  setServices(oldServices)
                                  setLoadingImage(false)
                                } catch (error) {
                                  setLoadingImage(false)
                                  setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                                }
                              }
                            }} value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                            {
                              loadingImage
                                ? (
                                  <div className='flex w-full'>
                                    <div className='w-fit m-auto'>
                                      <Spinner />
                                    </div>
                                  </div>
                                )
                                : services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image && services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                  ? <Image src={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                  : ''
                            }
                          </>
                        )
                        : selectService?.steps.map(step => {
                          if (step.slug && step.slug !== '') {
                            return <button onClick={(e: any) => {
                              setMenu('hidden')
                              setStep(step.step)
                            }} key={step._id} className='text-left'>{step.step}</button>
                          }
                        })
                    }
                    <Button2 action={(e: any) => {
                      setError('')
                      setNewService(services.find(service => service.name === part)!)
                      setTitle(services.find(service => service.name === part)!.name)
                      setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Editar servicio</Button2>
                  </div>
                )
                : ''
            }
            {
              pages.map((page, i) => {
                if ((part === page.page && type === 'Page')) {
                  return (
                    <div key={page._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                      <ButtonSubmit action={async () => {
                        if (!loading) {
                          setLoading(true)
                          if (id) {
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/page/${id}`, page)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer, productPage: productPage, categoryPage: categoryPage })
                          }
                          setLoading(false)
                        }
                      }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                      <button className='text-sm'>Cancelar</button>
                    </div>
                  )
                }
              })
            }
            {
              part === 'Pagina de producto' || part === 'Pagina de categorias'
                ? (
                  <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer, productPage: productPage, categoryPage: categoryPage })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
                : ''
            }
            {
              part === 'Popup'
                ? (
                  <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, popup: popupWeb })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
                : ''
            }
            {
              type === 'Funnel' && funnels.find(funnel => funnel.funnel === part) && funnels.find(funnel => funnel.funnel === part)?.steps.map(st => {
                if (step === st.step) {
                  return (
                    <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                      <ButtonSubmit action={async () => {
                        if (!loading) {
                          setLoading(true)
                          if (funnels.find(funnel => funnel.funnel === part)?._id) {
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/funnel-step/${funnels.find(funnel => funnel.funnel === part)?._id}`, st)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                          }
                          setLoading(false)
                        }
                      }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                      <button className='text-sm'>Cancelar</button>
                    </div>
                  )
                }
              })
            }
            {
              type === 'Service' && services.find(service => service.name === part) && services.find(service => service.name === part)?.steps.map(st => {
                if (step === st.step) {
                  return (
                    <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                      <ButtonSubmit action={async () => {
                        if (!loading) {
                          setLoading(true)
                          if (services.find(service => service.name === part)?._id) {
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service-step/${services.find(service => service.name === part)?._id}`, st)
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                          }
                          setLoading(false)
                        }
                      }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                      <button className='text-sm'>Cancelar</button>
                    </div>
                  )
                }
              })
            }
            {
              part === 'Estilo'
                ? (
                  <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/style`, style)
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
                : ''
            }
            {
              part === 'Chat'
                ? (
                  <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chat: chat })
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
                : ''
            }
          </div>
        </div>
        <div className='w-[350px] border-r hidden lg:flex flex-col justify-between bg-white dark:border-neutral-800 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-4 p-4'>
                  <div className='flex gap-2 justify-between'>
                    <h2 className='text-lg font-medium'>Páginas</h2>
                    <Link href={process.env.NEXT_PUBLIC_WEB_URL!} target='_blank' className='my-auto flex gap-1 transition-colors duration-150 hover:bg-neutral-100 p-1 rounded-md dark:hover:bg-neutral-800'><FaRegEye className='text-xl my-auto' />Ver sitio web</Link>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {
                      pages.map((page, index) => {
                        if (page.page !== 'Tienda' || (page.page === 'Tienda' && productsOrder?.length)) {
                          return (
                            <div key={page.slug} className='flex flex-col gap-2'>
                              <div className='flex gap-4' draggable onDragStart={() => setNewPage({ ...newPage, page: page.page, slug: page.slug })} onDragOver={(e) => e.preventDefault()} onDrop={async () => {
                                const oldPages = [...pages]
                                if (oldPages[index].subPage?.length) {
                                  oldPages[index].subPage?.push({ page: newPage.page, slug: newPage.slug })
                                } else {
                                  oldPages[index].subPage = [{ page: newPage.page, slug: newPage.slug }]
                                }
                                setPages(oldPages)
                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                              }}>
                                <button onClick={() => {
                                  setType('Page')
                                  setPart(page.page)
                                }} className='text-left w-full text-[15px]'>{page.page}</button>
                                <div className='flex gap-2'>
                                  <div className='flex gap-1'>
                                    <input type='checkbox' checked={page.header} onChange={async (e: any) => {
                                      const newPages = [...pages]
                                      newPages[index].header = e.target.checked
                                      setPages(newPages)
                                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                    }} />
                                    <p className='my-auto text-sm'>Menu</p>
                                  </div>
                                  {
                                    page.header === true
                                      ? (
                                        <div className='flex gap-1'>
                                          <input type='checkbox' checked={page.button === true ? true : false} onChange={async (e: any) => {
                                            const newPages = [...pages]
                                            newPages[index].button = e.target.checked
                                            setPages(newPages)
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: newPages })
                                          }} />
                                          <p className='my-auto text-sm'>Boton</p>
                                        </div>
                                      )
                                      : ''
                                  }
                                  <button onClick={() => handleMoveUp(index)}><SlArrowUp className='text-lg' /></button>
                                  <button onClick={() => handleMoveDown(index)}><SlArrowDown className='text-lg' /></button>
                                  {
                                    page.slug !== 'tienda'
                                      ? (
                                        <button onClick={(e: any) => {
                                          e.preventDefault()
                                          setSelectPage(page)
                                          setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-0' })
                                          setTimeout(() => {
                                            setPopupDeletePage({ ...popupDeletePage, view: 'flex', opacity: 'opacity-1' })
                                          }, 10)
                                        }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                                      )
                                      : ''
                                  }
                                </div>
                              </div>
                              {
                                page.subPage?.map((subPage, i) => (
                                  <div key={subPage.slug} className='flex gap-2 ml-10 justify-between'>
                                    {
                                      editSubPage === i
                                        ? (
                                          <div className='flex gap-2'>
                                            <Input value={subPage.page} change={(e: any) => {
                                              const newPages = [...pages]
                                              newPages[index].subPage![i].page = e.target.value
                                              setPages(newPages)
                                            }} />
                                            <Button2 action={async (e: any) => {
                                              e.preventDefault()
                                              if (!loadingSubPage) {
                                                setLoadingSubPage(true)
                                                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: pages })
                                                setEditSubPage(-1)
                                                setLoadingSubPage(false)
                                              }
                                            }} loading={loadingSubPage}>Guardar</Button2>
                                          </div>
                                        )
                                        : <p onClick={() => setEditSubPage(i)} className='text-[15px]'>{subPage.page}</p>
                                    }
                                    <button onClick={async (e: any) => {
                                      e.preventDefault()
                                      const oldPages = [...pages]
                                      oldPages[index].subPage?.splice(i, 1)
                                      setPages(oldPages)
                                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { pages: oldPages })
                                    }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                                  </div>
                                ))
                              }
                            </div>
                          )
                        }
                      })
                    }
                    {
                      productsOrder?.length
                        ? (
                          <>
                            <div className='flex gap-4'>
                              <button onClick={() => setPart('Pagina de producto')} className='text-left w-full text-[15px]'>Pagina de producto</button>
                            </div>
                            <div className='flex gap-4'>
                              <button onClick={() => setPart('Pagina de categorias')} className='text-left w-full text-[15px]'>Pagina de categorias</button>
                            </div>
                            <div className='flex gap-4'>
                              <button onClick={() => setPart('Pagina de carrito')} className='text-left w-full text-[15px]'>Pagina de Carrito</button>
                            </div>
                            <div className='flex gap-4'>
                              <button onClick={() => setPart('Pagina de checkout')} className='text-left w-full text-[15px]'>Pagina de checkout</button>
                            </div>
                          </>
                        )
                        : ''
                    }
                    <div className='flex gap-4'>
                      <button onClick={() => setPart('Popup')} className='text-left w-full text-[15px]'>Popup</button>
                    </div>
                    <div className='flex gap-4'>
                      <button onClick={() => setPart('Chat')} className='text-left w-full text-[15px]'>Chat</button>
                    </div>
                  </div>
                  <h2 className='text-lg font-medium'>Embudos</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      funnels.length
                        ? (
                          funnels.map((funnel, index) => (
                            <div key={funnel._id} className='flex gap-4 justify-between' draggable onDragStart={() => setNewPage({ ...newPage, page: funnel.funnel, slug: funnel.steps[0].slug })} onDragOver={(e) => e.preventDefault()}>
                              <button onClick={(e: any) => {
                                setType('Funnel')
                                setPart(funnel.funnel)
                                setSelectFunnel(funnel)
                              }} className='text-left w-full text-[15px]'>{funnel.funnel}</button>
                              <button onClick={(e: any) => {
                                e.preventDefault()
                                setSelectFunnel(funnel)
                                setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-0' })
                                setTimeout(() => {
                                  setPopupDeleteFunnel({ ...popupDeleteFunnel, view: 'flex', opacity: 'opacity-1' })
                                }, 10)
                              }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                            </div>
                          ))
                        )
                        : <p className='text-[15px]'>No hay embudos creados</p>
                    }
                  </div>
                  <h2 className='text-lg font-medium'>Servicios</h2>
                  <div className='flex flex-col gap-2'>
                    {
                      services.length
                        ? services.map((service, index) => {
                          if (service.steps.some(step => step.slug && step.slug !== '')) {
                            return (
                              <div key={service._id} className='flex gap-4 justify-between'>
                                <button onClick={(e: any) => {
                                  setType('Service')
                                  setPart(service.name)
                                  setSelectService(service)
                                }} className='text-left w-full text-[15px]'>{service.name}</button>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  setSelectService(service)
                                  setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopupDeleteService({ ...popupDeleteService, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }}><svg className="m-auto w-[17px]" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>
                              </div>
                            )
                          } else {
                            return ''
                          }
                        })
                        : <p className='text-[15px]'>No hay servicios creados</p>
                    }
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Button2 action={() => {
                      setError('')
                      setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupPage({ ...popupPage, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }} config='w-full'>Agregar pagina</Button2>
                    {
                      whatsapp
                        ? (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: false })
                            setWhatsapp(false)
                          }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Whatsapp</button>
                        )
                        : (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { whatsapp: true })
                            setWhatsapp(true)
                          }} className={`w-full bg-green-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-green-500/80`}>Activar boton Whatsapp</button>
                        )
                    }
                    {
                      instagram
                        ? (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: false })
                            setInstagram(false)
                          }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Instagram</button>
                        )
                        : (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { instagram: true })
                            setInstagram(true)
                          }} className={`w-full bg-purple-600 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-purple-600/80`}>Activar boton Instagram</button>
                        )
                    }
                    {
                      chatView
                        ? (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: false })
                            setChatView(false)
                          }} className={`w-full bg-red-500 min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300 hover:bg-red-500/80`}>Desactivar boton Chat</button>
                        )
                        : (
                          <button onClick={async(e: any) => {
                            e.preventDefault()
                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chatView: true })
                            setChatView(true)
                          }} className={`w-full min-h-9 h-9 px-4 text-white text-sm rounded-xl transition-colors duration-300`} style={{ backgroundColor: style.primary }}>Activar boton Chat</button>
                        )
                    }
                    <ButtonSecondary2 action={(e: any) => {
                      e.preventDefault()
                      setError('')
                      setNewFunnel({ funnel: '', description: '', steps: [{ step: '', slug: '' }] })
                      setTitle('Nuevo embudo')
                      setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }} config='w-full'>Agregar embudo</ButtonSecondary2>
                    <button onClick={(e: any) => setPart('Estilo')} className='mt-2 text-sm'>Editar estilo del sitio web</button>
                  </div>
                </div>
              )
              : ''
          }
          {
            pages.map((page, i) => {
              if (part === page.page && type === 'Page') {
                return (
                  <div key={page.slug} className='flex flex-col gap-4 p-4 mb-[104px]'>
                    <div className='border-b pb-4 dark:border-neutral-700'>
                      <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                    </div>
                    <h2 className='text-lg font-medium'>{page.page}</h2>
                    <h3 className='font-medium text-[15px]'>Seo</h3>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta titulo</p>
                      <Input placeholder='Meta titulo' value={page.metaTitle} change={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaTitle = e.target.value
                        setPages(oldPages)
                      }} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Meta descripción</p>
                      <Textarea placeholder='Meta descripción' value={page.metaDescription!} change={(e: any) => {
                        const oldPages = [...pages]
                        oldPages[i].metaDescription = e.target.value
                        setPages(oldPages)
                      }} />
                    </div>
                    <input type='file' onChange={async (e: any) => {
                      if (!loadingImage) {
                        setLoadingImage(true)
                        setErrorImage('')
                        const formData = new FormData();
                        formData.append('image', e.target.files[0]);
                        formData.append('name', e.target.files[0].name);
                        try {
                          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                            headers: {
                              accept: 'application/json',
                              'Accept-Language': 'en-US,en;q=0.8'
                            }
                          })
                          const oldPages = [...pages]
                          oldPages[i].image = data
                          setPages(oldPages)
                          setLoadingImage(false)
                        } catch (error) {
                          setLoadingImage(false)
                          setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                        }
                      }
                    }} value={page.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                    {
                      loadingImage
                        ? (
                          <div className='flex w-full'>
                            <div className='w-fit m-auto'>
                              <Spinner />
                            </div>
                          </div>
                        )
                        : page.image && page.image !== ''
                          ? <Image src={page.image} alt={`Imagen SEO de la pagina ${page.page}`} width={500} height={500} />
                          : ''
                    }
                  </div>
                )
              }
            })
          }
          {
            part === 'Estilo'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Estilo del sitio web</h2>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Tipo de diseño</p>
                    <Select change={(e: any) => setStyle({ ...style, design: e.target.value })} value={style?.design}>
                      <option>Borde</option>
                      <option>Sombreado</option>
                      <option>Ninguno</option>
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Tipo de formas</p>
                    <Select change={(e: any) => setStyle({ ...style, form: e.target.value })} value={style?.form}>
                      <option>Redondeadas</option>
                      <option>Cuadradas</option>
                    </Select>
                  </div>
                  {
                    style.form === 'Redondeadas'
                      ? (
                        <>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Esquinas botones</p>
                            <Input type='number' change={(e: any) => setStyle({ ...style, borderButton: e.target.value })} value={style.borderButton} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Esquinas bloques</p>
                            <Input type='number' change={(e: any) => setStyle({ ...style, borderBlock: e.target.value })} value={style.borderBlock} />
                          </div>
                        </>
                      )
                      : ''
                  }
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Color principal</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, primary: e.target.value })} value={style?.primary} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Color segundario</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, secondary: e.target.value })} value={style?.secondary} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Color texto boton</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, button: e.target.value })} value={style?.button} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Color borde</p>
                    <input type='color' onChange={(e: any) => setStyle({ ...style, borderColor: e.target.value })} value={style?.borderColor} />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Pagina de producto'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Pagina de producto</h2>
                  <div className='flex gap-2'>
                    <input type='checkbox' checked={productPage[0].reviews} onChange={(e: any) => {
                      const beforeProductPage = [...productPage]
                      beforeProductPage[0].reviews = e.target.checked
                      setProductPage(beforeProductPage)
                    }} />
                    <p className='text-sm'>Activar reseñas</p>
                  </div>
                  <p className='font-medium text-[15px]'>Agregar zona informativa</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>titulo</p>
                    <Input placeholder='Titulo' value={productPage[0].title} change={(e: any) => {
                      const beforeProductPage = [...productPage]
                      beforeProductPage[0].title = e.target.value
                      setProductPage(beforeProductPage)
                    }} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Descripción</p>
                    <Textarea placeholder='Descripción' value={productPage[0].text} change={(e: any) => {
                      const beforeProductPage = [...productPage]
                      beforeProductPage[0].text = e.target.value
                      setProductPage(beforeProductPage)
                    }} />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Pagina de categorias'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Pagina de categorias</h2>
                </div>
              )
              : ''
          }
          {
            part === 'Pagina de carrito'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Pagina de carrito</h2>
                  <div className='flex flex-col gap-2'>
                    <p>Color fondo</p>
                    <input type='color' value={cartPage.bgColor} onChange={(e: any) => setCartPage({ ...cartPage, bgColor: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color texto</p>
                    <input type='color' value={cartPage.textColor} onChange={(e: any) => setCartPage({ ...cartPage, textColor: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color detalles</p>
                    <input type='color' value={cartPage.detailsColor} onChange={(e: any) => setCartPage({ ...cartPage, detailsColor: e.target.value })} />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Pagina de checkout'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Pagina de checkout</h2>
                  <div className='flex flex-col gap-2'>
                    <p>Color fondo</p>
                    <input type='color' value={checkoutPage.bgColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, bgColor: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color texto</p>
                    <input type='color' value={checkoutPage.textColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, textColor: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>Color detalles</p>
                    <input type='color' value={checkoutPage.detailsColor} onChange={(e: any) => setCheckoutPage({ ...checkoutPage, detailsColor: e.target.value })} />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Popup'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Popup</h2>
                  <div className='flex gap-2'>
                    <input type='checkbox' checked={popupWeb.active} onChange={(e: any) => setPopupWeb({ ...popupWeb, active: e.target.checked })} />
                    <p className='text-sm'>Activar Popup</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Aparecer</p>
                    <div className='flex gap-2'>
                      <Input type='number' placeholder='Segundos' value={popupWeb.wait} change={(e: any) => setPopupWeb({ ...popupWeb, wait: e.target.value })} />
                      <p className='my-auto text-sm'>segundos</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Titulo</p>
                    <Input placeholder='Titulo' value={popupWeb.title} change={(e: any) => setPopupWeb({ ...popupWeb, title: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Parrafo</p>
                    <Textarea placeholder='Descripción' value={popupWeb.description!} change={(e: any) => setPopupWeb({ ...popupWeb, description: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Texto boton</p>
                    <Input placeholder='Boton' value={popupWeb.buttonText} change={(e: any) => setPopupWeb({ ...popupWeb, buttonText: e.target.value })} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Link boton</p>
                    <Select change={(e: any) => setPopupWeb({ ...popupWeb, buttonLink: e.target.value })} value={popupWeb.buttonLink}>
                      <option value=''>Seleccionar pagina</option>
                      {
                        pages.map(page => <option key={page._id} value={page.slug}>{page.page}</option>)
                      }
                      {
                        funnels.map(funnel => funnel.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{funnel.funnel} - {step.step}</option>))
                      }
                      {
                        services.map(service => service.steps.filter(step => step.slug && step.slug !== '').map(step => <option key={step._id} value={step.slug}>{service.name} - {step.step}</option>))
                      }
                    </Select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Mostrar formulario o llamada</p>
                    <Select value={popupWeb.content} change={(e: any) => setPopupWeb({ ...popupWeb, content: e.target.value })}>
                      <option>Seleccionar formulario o llamada</option>
                      {
                        forms?.map(form => <option key={form._id} value={form._id}>{form.nameForm}</option>)
                      }
                      {
                        calls?.map(call => <option key={call._id} value={call._id}>{call.nameMeeting}</option>)
                      }
                    </Select>
                    <Button2 action={(e: any) => {
                      e.preventDefault()
                      setError('')
                      setTitleForm('Nuevo formulario')
                      setNewForm({ nameForm: '', informations: [{ icon: '', text: '', subText: '' }], labels: [{ text: '', name: '', data: '', type: '', datas: [] }], button: '', action: 'Ir a una pagina', tags: [], title: '' })
                      setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupForm({ ...popupForm, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Crear formulario</Button2>
                    <Button2 action={(e: any) => {
                      e.preventDefault()
                      setError('')
                      setNewCall({ type: [''], nameMeeting: '', duration: '15 minutos', intervals: '', description: '', title: '', labels: [{ type: '', data: '', text: '' }], buttonText: '', action: 'Mostrar mensaje', message: '' })
                      setTitleMeeting('Crear llamada')
                      setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-0' })
                      setTimeout(() => {
                        setPopupCall({ ...popupCall, view: 'flex', opacity: 'opacity-1' })
                      }, 10)
                    }}>Crear llamada</Button2>
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Chat'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-lg my-auto' /><p className='my-auto text-sm'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>Chat</h2>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Color de fondo</p>
                    <input type='color' onChange={(e: any) => setChat({ ...chat, bgColor: e.target.value })} value={chat?.bgColor} />
                  </div>
                </div>
              )
              : ''
          }
          {
            funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>{part}</h2>
                  {
                    funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)
                      ? (
                        <>
                          <p className='font-medium'>Paso: {step}</p>
                          <p className='font-medium'>Seo</p>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta titulo</p>
                            <Input change={(e: any) => {
                              const oldFunnels = [...funnels]
                              oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                              setFunnels(oldFunnels)
                            }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaTitle} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta descripción</p>
                            <Textarea change={(e: any) => {
                              const oldFunnels = [...funnels]
                              oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                              setFunnels(oldFunnels)
                            }} placeholder='Meta titulo' value={funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                          </div>
                          <input type='file' onChange={async (e: any) => {
                            if (!loadingImage) {
                              setLoadingImage(true)
                              setErrorImage('')
                              const formData = new FormData();
                              formData.append('image', e.target.files[0]);
                              formData.append('name', e.target.files[0].name);
                              try {
                                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                  headers: {
                                    accept: 'application/json',
                                    'Accept-Language': 'en-US,en;q=0.8'
                                  }
                                })
                                const oldFunnels = [...funnels!]
                                oldFunnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.image = data
                                setFunnels(oldFunnels)
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image && funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                ? <Image src={funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${funnels.find((funnel, index) => funnel.funnel === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                : ''
                          }
                        </>
                      )
                      : (
                        <>
                          <p className='font-medium'>Pasos</p>
                          <div className='flex flex-col gap-2'>
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.map(step => {
                                if (step.slug && step.slug !== '') {
                                  return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                                }
                              })
                            }
                          </div>
                        </>
                      ) 
                  }
                  <Button2 action={(e: any) => {
                    setError('')
                    setNewFunnel(funnels.find(funnel => funnel.funnel === part)!)
                    setTitle(funnels.find(funnel => funnel.funnel === part)!.funnel)
                    setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupNewFunnel({ ...popupNewFunnel, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Editar embudo</Button2>
                </div>
              )
              : ''
          }
          {
            services.find(service => service.name === part) && type === 'Service'
              ? (
                <div className='flex flex-col gap-4 p-4 mb-[104px]'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <button onClick={() => services.find(service => service.name === part)!.steps.find(st => st.step === step) ? setStep('') : setPart('')} className='flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  </div>
                  <h2 className='text-lg font-medium'>{part}</h2>
                  <p className='font-medium'>Pasos</p>
                  {
                    services.find(service => service.name === part)!.steps!.find(st => st.step === step)
                      ? (
                        <>
                          <p className='font-medium'>Paso: {step}</p>
                          <p className='font-medium'>Seo</p>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta titulo</p>
                            <Input change={(e: any) => {
                              const oldServices = [...services]
                              oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaTitle = e.target.value
                              setServices(oldServices)
                            }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaTitle} />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Meta descripción</p>
                            <Textarea change={(e: any) => {
                              const oldServices = [...services]
                              oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.metaDescription = e.target.value
                              setServices(oldServices)
                            }} placeholder='Meta titulo' value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.metaDescription!} />
                          </div>
                          <input type='file' onChange={async (e: any) => {
                            if (!loadingImage) {
                              setLoadingImage(true)
                              setErrorImage('')
                              const formData = new FormData();
                              formData.append('image', e.target.files[0]);
                              formData.append('name', e.target.files[0].name);
                              try {
                                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
                                  headers: {
                                    accept: 'application/json',
                                    'Accept-Language': 'en-US,en;q=0.8'
                                  }
                                })
                                const oldServices = [...services]
                                oldServices.find(service => service.name === part)!.steps.find(st => st.step === step)!.image = data
                                setServices(oldServices)
                                setLoadingImage(false)
                              } catch (error) {
                                setLoadingImage(false)
                                setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
                              }
                            }
                          }} value={services.find(service => service.name === part)!.steps.find(st => st.step === step)?.image} className='m-auto w-[320px] text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/60 file:text-white hover:file:bg-main/40' />
                          {
                            loadingImage
                              ? (
                                <div className='flex w-full'>
                                  <div className='w-fit m-auto'>
                                    <Spinner />
                                  </div>
                                </div>
                              )
                              : services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image && services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.image !== ''
                                ? <Image src={services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)!.image!} alt={`Imagen SEO de la pagina ${services.find((service, index) => service.name === part)!.steps.find((st, i) => st.step === step)?.step}`} width={500} height={500} />
                                : ''
                          }
                        </>
                      )
                      : selectService?.steps.map(step => {
                        if (step.slug && step.slug !== '') {
                          return <button onClick={(e: any) => setStep(step.step)} key={step._id} className='text-left'>{step.step}</button>
                        }
                      })
                  }
                  <Button2 action={(e: any) => {
                    setError('')
                    setNewService(services.find(service => service.name === part)!)
                    setTitle(services.find(service => service.name === part)!.name)
                    setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-0' })
                    setTimeout(() => {
                      setPopupService({ ...popupService, view: 'flex', opacity: 'opacity-1' })
                    }, 10)
                  }}>Editar servicio</Button2>
                </div>
              )
              : ''
          }
          {
            pages.map((page, i) => {
              if (part === page.page && type === 'Page') {
                return (
                  <div key={page._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        console.log(page)
                        if (id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/page/${id}`, page)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
              }
            })
          }
          {
            part === 'Pagina de producto' || part === 'Pagina de categorias' || part === 'Pagina de carrito' || part === 'Pagina de checkout'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      if (id) {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, header: header, footer: footer, productPage: productPage, categoryPage: categoryPage, cartPage: cartPage, checkoutPage: checkoutPage })
                      }
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
          {
            part === 'Popup'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      if (id) {
                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { color: color, popup: popupWeb })
                      }
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
          {
            type === 'Funnel' && funnels.find(funnel => funnel.funnel === part) && funnels.find(funnel => funnel.funnel === part)?.steps.map(st => {
              if (step === st.step) {
                return (
                  <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (funnels.find(funnel => funnel.funnel === part)?._id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/funnel-step/${funnels.find(funnel => funnel.funnel === part)?._id}`, st)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
              }
            })
          }
          {
            type === 'Service' && services.find(service => service.name === part) && services.find(service => service.name === part)?.steps.map(st => {
              if (step === st.step) {
                return (
                  <div key={st._id} className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                    <ButtonSubmit action={async () => {
                      if (!loading) {
                        setLoading(true)
                        if (services.find(service => service.name === part)?._id) {
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service-step/${services.find(service => service.name === part)?._id}`, st)
                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { footer: footer })
                        }
                        setLoading(false)
                      }
                    }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                    <button className='text-sm'>Cancelar</button>
                  </div>
                )
              }
            })
          }
          {
            part === 'Estilo'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/style`, style)
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
          {
            part === 'Chat'
              ? (
                <div className='p-4 flex flex-col gap-2 fixed bg-white w-[349px] bottom-0 border-t dark:border-neutral-700 dark:bg-neutral-800'>
                  <ButtonSubmit action={async () => {
                    if (!loading) {
                      setLoading(true)
                      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/design/${id}`, { chat: chat })
                      setLoading(false)
                    }
                  }} color='main' submitLoading={loading} textButton='Guardar' config='w-full' />
                  <button className='text-sm'>Cancelar</button>
                </div>
              )
              : ''
          }
        </div>
        {
          part === ''
            ? (
              <div className='h-full flex w-full lg:w-[calc(100%-350px)] dark:bg-neutral-900'>
                <p className='m-auto'>Selecciona una pagina para editar</p>
              </div>
            )
            : ''
        }
        {
          pages.map((page, i) => {
            if (part === page.page && type === 'Page') {
              return (
                <div key={page._id} className={`m-auto h-full bg-white text-black ${responsive === '400px' ? 'w-[400px]' : 'w-full lg:w-[calc(100%-350px)]'} lg:w-[${responsive}]`}>
                  <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                    <div className='flex gap-4 w-fit m-auto'>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        setResponsive('calc(100%-350px)')
                      }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                      <button  onClick={(e: any) => {
                        e.preventDefault()
                        setResponsive('400px')
                      }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                    </div>
                  </div>
                  <div className='overflow-y-auto bg-white' style={{ height: 'calc(100% - 75px)' }}>
                    <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} style={style} footer={footer} setFooter={setFooter}>
                      <div className='flex flex-col gap-4'>
                        {
                          page.design.length
                            ? page.design.map((design, index) => (
                              <div key={index}>
                                {
                                  design.content === 'Carrusel'
                                    ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                    : design.content === 'Bloque 1'
                                      ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                      : design.content === 'Bloque 2'
                                        ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} funnels={funnels} />
                                        : design.content === 'Bloque 3'
                                          ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                          : design.content === 'Bloque 4'
                                            ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                            : design.content === 'Bloque 5'
                                              ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} pageNeed={pages} funnels={funnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                              : design.content === 'Contacto'
                                                ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} responsive={responsive} style={style} />
                                                : design.content === 'Suscripción'
                                                  ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} responsive={responsive} style={style} />
                                                  : design.content === 'Lead 1'
                                                    ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                    : design.content === 'Video'
                                                      ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} style={style} storeData={storeData} />
                                                      : design.content === 'Agendar llamada'
                                                        ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                        : design.content === 'Bloque 7'
                                                          ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} />
                                                          : design.content === 'Checkout'
                                                            ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData} style={style} />
                                                            : design.content === 'Llamadas'
                                                              ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} calls={calls} style={style} />
                                                              : design.content === 'Lead 2'
                                                                ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                                : design.content === 'Servicios'
                                                                  ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                  : design.content === 'Planes'
                                                                    ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} style={style} clientData={clientData} getClientData={getClientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                    : design.content === 'Preguntas frecuentes'
                                                                      ? <Faq edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} style={style} />
                                                                      : design.content === 'Bloques'
                                                                        ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} style={style} forms={forms} funnels={funnels} calls={calls} />
                                                                        : design.content === 'Reseñas'
                                                                          ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} style={style} />
                                                                          : design.content === 'Formulario'
                                                                            ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                            : design.content === 'Lead 3'
                                                                              ? <Lead3 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewForm={setNewForm} responsive={responsive} storeData={storeData} style={style} pageNeed={pages} getForms={getForms} newForm={newForm} />
                                                                              : design.content === 'Carrusel de imagenes'
                                                                                ? <SliderImages edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                                                                : design.content === 'Categorias'
                                                                                  ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                                                                  : design.content === 'Productos'
                                                                                    ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} style={style} />
                                                                                    : design.content === 'Categorias 2'
                                                                                      ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                                                                      : design.content === 'Carrusel productos'
                                                                                        ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} style={style} />
                                                                                        : design.content === 'Tabla comparativa'
                                                                                          ? <Table edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                          : ''
                                }
                                <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                  <p className='my-auto font-medium'>{design.content}</p>
                                  {
                                    edit === design.content
                                      ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                                      : <Button2 action={() => {
                                        setResponsive('calc(100%-350px)')
                                        setEdit(design.content)
                                      }}>Editar</Button2>
                                  }
                                  <Button2Red action={() => {
                                    const oldPages = [...pages]
                                    oldPages[i].design.splice(index, 1)
                                    setPages(oldPages)
                                  }}>Eliminar bloque</Button2Red>
                                  <button onClick={() => moveBlock(i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                  <button onClick={() => moveBlock(i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                </div>
                              </div>
                            ))
                            : (
                              <div className='py-10 flex'>
                                <Button action={() => {
                                  setIndexPage(i)
                                  setIndexFunnel(-1)
                                  setIndexStep(-1)
                                  setIndexService(-1)
                                  setIndexStepService(-1)
                                  setIndexProduct(-1)
                                  setIndexCategory(-1)
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }} config='m-auto'>Agregar bloque de contenido</Button>
                              </div>
                            )
                        }
                        {
                          page.design.length
                            ? (
                              <div className='py-10 flex'>
                                <Button action={() => {
                                  setIndexPage(i)
                                  setIndexFunnel(-1)
                                  setIndexStep(-1)
                                  setIndexService(-1)
                                  setIndexStepService(-1)
                                  setIndexProduct(-1)
                                  setIndexCategory(-1)
                                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                  setTimeout(() => {
                                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                  }, 10)
                                }} config='m-auto'>Agregar bloque de contenido</Button>
                              </div>
                            )
                            : ''
                        }
                      </div>
                    </Layout>
                  </div>
                </div>
              )
            }
          })
        }
        {
          part === 'Pagina de producto'
            ? productPage.map((page, i) => (
              <div key={i} className='overflow-auto bg-white text-black' style={{ width: 'calc(100% - 350px)' }}>
                <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} footer={footer} setFooter={setFooter} style={style}>
                  <PageProduct productsOrder={productsOrder} productPage={productPage} style={style} />
                  {
                    page.design.length
                      ? page.design.map((design, index) => (
                        <div key={index}>
                          {
                            design.content === 'Carrusel'
                              ? <Slider design={design} edit={edit} pages={productPage} setPages={setProductPage} index={index} inx={i} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} ind={0} style={style} />
                              : design.content === 'Categorias'
                                ? <Categories edit={edit} categories={categories} pages={productPage} setPages={setProductPage} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                : design.content === 'Bloque 1'
                                  ? <Bloque1 edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                  : design.content === 'Bloque 2'
                                    ? <Bloque2 edit={edit} design={design} pages={productPage} setPages={setProductPage} index={index} inx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                    : design.content === 'Bloque 3'
                                      ? <Bloque3 edit={edit} design={design} index={index} pages={productPage} setPages={setProductPage} inx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                      : design.content === 'Bloque 4'
                                        ? <Bloque4 edit={edit} design={design} pages={productPage} setPages={setProductPage} index={index} inx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms}  style={style}/>
                                        : design.content === 'Bloque 5'
                                          ? <Bloque5 edit={edit} design={design} pages={productPage} setPages={setProductPage} index={index} inx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                          : design.content === 'Productos'
                                            ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setProductPage} design={design} categories={categories} pages={productPage} index={index} inx={i} ind={0} style={style} />
                                            : design.content === 'Contacto'
                                              ? <Contact edit={edit} design={design} pages={productPage} setPages={setProductPage} index={index} inx={i} ind={0} responsive={responsive} style={style} />
                                              : design.content === 'Suscripción'
                                                ? <Subscription edit={edit} pages={productPage} setPages={setProductPage} index={index} design={design} inx={i} ind={0} responsive={responsive} style={style} />
                                                : design.content === 'Bloque 6'
                                                  ? (
                                                    <div className="w-full flex text-center" style={{ backgroundImage: `url(${design.info.image})` }}>
                                                      <div className="w-full max-w-[1280px] m-auto py-28 flex flex-col gap-2">
                                                        <h1 className={`text-[25px] font-medium lg:text-[32px]`}>Nombre de la categoria</h1>
                                                        <p className={`text-sm lg:text-[16px]`}>Descripción de la categoria</p>
                                                      </div>
                                                    </div>
                                                  )
                                                  : design.content === 'Categorias 2'
                                                    ? <Categories2 edit={edit} categories={categories} pages={productPage} setPages={setProductPage} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} style={style} />
                                                    : design.content === 'Carrusel productos'
                                                      ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setProductPage} design={design} categories={categories} pages={productPage} index={index} inx={i} ind={0} style={style} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} responsive={responsive} style={style} storeData={storeData} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData} style={style} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} calls={calls} style={style} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2 edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} clientData={clientData} getClientData={getClientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                        : design.content === 'Preguntas frecuentes'
                                                                          ? <Faq edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} />
                                                                          : design.content === 'Bloques'
                                                                            ? <Blocks edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} forms={forms} funnels={funnels} calls={calls} />
                                                                            : design.content === 'Reseñas'
                                                                              ? <Reviews edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} />
                                                                              : design.content === 'Formulario'
                                                                                ? <Form edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                                : design.content === 'Lead 3'
                                                                                  ? <Lead3 edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewForm={setNewForm} responsive={responsive} storeData={storeData} style={style} pageNeed={pages} getForms={getForms} newForm={newForm} />
                                                                                  : design.content === 'Carrusel de imagenes'
                                                                                    ? <SliderImages edit={edit} design={design} index={index} pages={productPage} setPages={setProductPage} inx={i} ind={0} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                                                                    : design.content === 'Tabla comparativa'
                                                                                      ? <Table edit={edit} pages={productPage} setPages={setProductPage} design={design} index={index} inx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                      : ''
                            }
                            <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                              <p className='my-auto font-medium'>{design.content}</p>
                              {
                                design.content === 'Productos' || design.content === 'Bloque 6'
                                  ? ''
                                  : edit === design.content
                                    ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                                    : <Button2 action={() => {
                                      setResponsive('calc(100%-350px)')
                                      setEdit(design.content)
                                    }}>Editar</Button2>
                              }
                              {
                                design.content === 'Productos' || design.content === 'Bloque 6'
                                  ? ''
                                  : (
                                    <Button2Red action={() => {
                                      const oldProductPage = [...productPage]
                                      oldProductPage[i].design.splice(index, 1)
                                      setProductPage(oldProductPage)
                                    }}>Eliminar bloque</Button2Red>
                                  )
                              }
                              <button onClick={() => moveBlockProduct(index, 'up')}><SlArrowUp className='text-lg' /></button>
                              <button onClick={() => moveBlockProduct(index, 'down')}><SlArrowDown className='text-lg' /></button>
                            </div>
                          </div>
                        ))
                        : (
                          <div className='py-10 flex'>
                            <Button action={() => {
                              setIndexPage(-1)
                              setIndexFunnel(-1)
                              setIndexStep(-1)
                              setIndexService(-1)
                              setIndexStepService(-1)
                              setIndexProduct(0)
                              setIndexCategory(-1)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} config='m-auto'>Agregar bloque de contenido</Button>
                          </div>
                        )
                    }
                    {
                      page.design.length
                        ? (
                          <div className='py-10 flex'>
                            <Button action={() => {
                              setIndexPage(-1)
                              setIndexFunnel(-1)
                              setIndexStep(-1)
                              setIndexService(-1)
                              setIndexStepService(-1)
                              setIndexProduct(0)
                              setIndexCategory(-1)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} config='m-auto'>Agregar bloque de contenido</Button>
                          </div>
                        )
                        : ''
                    }
                </Layout>
              </div>
            ))
            : ''
        }
        {
          part === 'Pagina de categorias'
            ? categoryPage.map((page, i) => (
                <div key={i} className='overflow-y-auto bg-white text-black' style={{ width: 'calc(100% - 350px' }}>
                  <Layout edit={edit} setEdit={setEdit} setHeader={setHeader} header={header} setPart={setPart} pages={pages} storeData={storeData} responsive={responsive} footer={footer} setFooter={setFooter} style={style}>
                  <div className='flex flex-col gap-4'>
                    {
                      page.design.length
                        ? page.design.map((design, index) => (
                          <div key={index}>
                            {
                                design.content === 'Carrusel'
                                  ? <Slider design={design} edit={edit} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                  : design.content === 'Categorias'
                                    ? <Categories edit={edit} categories={categories} pages={categoryPage} setPages={setCategoryPage} setMouse={setMouse} design={design} index={index} mouse={mouse} inxx={i} ind={0} style={style} />
                                    : design.content === 'Bloque 1'
                                      ? <Bloque1 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                      : design.content === 'Bloque 2'
                                        ? <Bloque2 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                        : design.content === 'Bloque 3'
                                          ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setCategoryPage} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                          : design.content === 'Bloque 4'
                                            ? <Bloque4 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                            : design.content === 'Bloque 5'
                                              ? <Bloque5 edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inxx={i} pageNeed={pages} ind={0} responsive={responsive} calls={calls} forms={forms} style={style} />
                                              : design.content === 'Productos'
                                                ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setCategoryPage} design={design} categories={categories} pages={categoryPage} index={index} inxx={i} ind={0} style={style} />
                                                : design.content === 'Contacto'
                                                  ? <Contact edit={edit} design={design} pages={categoryPage} setPages={setCategoryPage} index={index} inx={i} ind={0} responsive={responsive} style={style} />
                                                  : design.content === 'Suscripción'
                                                    ? <Subscription edit={edit} pages={categoryPage} setPages={setCategoryPage} index={index} design={design} inx={i} ind={0} responsive={responsive} style={style} />
                                                    : design.content === 'Bloque 6'
                                                      ? (
                                                        <div className="w-full flex text-center" style={{ backgroundImage: `url(${design.info.image})` }}>
                                                          <div className="w-full max-w-[1280px] m-auto py-28 flex flex-col gap-2">
                                                            <h1 className={`text-[25px] font-medium lg:text-[32px]`}>Nombre de la categoria</h1>
                                                            <p className={`text-sm lg:text-[16px]`}>Descripción de la categoria</p>
                                                          </div>
                                                        </div>
                                                      )
                                                      : design.content === 'Categorias 2'
                                                        ? <Categories2 edit={edit} categories={categories} pages={categoryPage} setPages={setCategoryPage} setMouse={setMouse} design={design} index={index} mouse={mouse} inxx={i} ind={0} style={style} />
                                                        : design.content === 'Carrusel productos'
                                                          ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setCategoryPage} design={design} categories={categories} pages={categoryPage} index={index} inxx={i} ind={0} style={style} />
                                                          : design.content === 'Lead 1'
                                                            ? <Lead1 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                            : design.content === 'Video'
                                                              ? <Video edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} style={style} storeData={storeData} />
                                                              : design.content === 'Agendar llamada'
                                                                ? <Call edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                                : design.content === 'Bloque 7'
                                                                  ? <Bloque7 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} />
                                                                  : design.content === 'Checkout'
                                                                    ? <Checkout edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} storeData={storeData} style={style} />
                                                                    : design.content === 'Llamadas'
                                                                      ? <Calls edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} calls={calls} style={style} />
                                                                      : design.content === 'Lead 2'
                                                                        ? <Lead2 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                                        : design.content === 'Servicios'
                                                                          ? <Services edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                          : design.content === 'Planes'
                                                                            ? <Plans edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} clientData={clientData} getClientData={getClientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                            : design.content === 'Preguntas frecuentes'
                                                                              ? <Faq edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} style={style} />
                                                                              : design.content === 'Bloques'
                                                                                ? <Blocks edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} forms={forms} funnels={funnels} calls={calls} />
                                                                                : design.content === 'Reseñas'
                                                                                  ? <Reviews edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} style={style} />
                                                                                  : design.content === 'Formulario'
                                                                                    ? <Form edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} responsive={responsive} pageNeed={pages} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                                    : design.content === 'Lead 3'
                                                                                      ? <Lead3 edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} setNewForm={setNewForm} responsive={responsive} storeData={storeData} style={style} pageNeed={pages} getForms={getForms} newForm={newForm} />
                                                                                      : design.content === 'Carrusel de imagenes'
                                                                                        ? <SliderImages edit={edit} design={design} index={index} pages={categoryPage} setPages={setCategoryPage} inxx={i} ind={0} pageNeed={pages} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                                                                        : design.content === 'Tabla comparativa'
                                                                                          ? <Table edit={edit} pages={categoryPage} setPages={setCategoryPage} design={design} index={index} inxx={i} ind={0} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                          : ''
                                }
                                <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                  <p className='my-auto font-medium'>{design.content}</p>
                                  {
                                    design.content === 'Productos' || design.content === 'Bloque 6'
                                      ? ''
                                      : edit === design.content
                                        ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                                        : <Button2 action={() => {
                                          setResponsive('calc(100%-350px)')
                                          setEdit(design.content)
                                        }}>Editar</Button2>
                                  }
                                  {
                                    design.content === 'Productos' || design.content === 'Bloque 6'
                                      ? ''
                                      : (
                                        <Button2Red action={() => {
                                          const oldCategoryPage = [...categoryPage]
                                          oldCategoryPage[i].design.splice(index, 1)
                                          setCategoryPage(oldCategoryPage)
                                        }}>Eliminar bloque</Button2Red>
                                      )
                                  }
                                  <button onClick={() => moveBlockCategories(index, 'up')}><SlArrowUp className='text-lg' /></button>
                                  <button onClick={() => moveBlockCategories(index, 'down')}><SlArrowDown className='text-lg' /></button>
                                </div>
                          </div>
                        ))
                        : (
                          <div className='py-10 flex'>
                            <Button action={() => {
                              setIndexPage(-1)
                              setIndexFunnel(-1)
                              setIndexStep(-1)
                              setIndexService(-1)
                              setIndexStepService(-1)
                              setIndexProduct(-1)
                              setIndexCategory(0)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} config='m-auto'>Agregar bloque de contenido</Button>
                          </div>
                        )
                    }
                    {
                      page.design.length
                        ? (
                          <div className='py-10 flex'>
                            <Button action={() => {
                              setIndexPage(-1)
                              setIndexFunnel(-1)
                              setIndexStep(-1)
                              setIndexService(-1)
                              setIndexStepService(-1)
                              setIndexProduct(-1)
                              setIndexCategory(0)
                              setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                              setTimeout(() => {
                                setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                              }, 10)
                            }} config='m-auto'>Agregar bloque de contenido</Button>
                          </div>
                        )
                        : ''
                    }
                  </div>
                  </Layout>
                </div>
              )
            )
            : ''
        }
        {
          part === 'Popup'
            ? (
              <div className='w-full h-full text-black bg-black/30 flex lg:w-[calc(100%-350px)] px-4'>
                <div className={`${calls?.find(call => call._id === popupWeb.content) ? 'max-w-[800px]' : 'max-w-[600px]'} w-full p-6 rounded-lg bg-white m-auto flex flex-col gap-4`}>
                  {
                    popupWeb.title && popupWeb.title !== ''
                      ? <h2 className='text-2xl font-medium'>{popupWeb.title}</h2>
                      : ''
                  }
                  {
                    popupWeb.description && popupWeb.description !== ''
                      ? <p>{popupWeb.description}</p>
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && forms?.find(form => form._id === popupWeb.content)
                      ? (
                        <form className="flex w-full">
                          <div className="flex flex-col gap-4 border shadow-lg rounded-lg h-fit m-auto w-full p-6 max-w-[500px]">
                            <p className="text-main text-xl font-medium text-center">{forms?.find(form => form._id === popupWeb.content)?.title}</p>
                            {
                              forms?.find(form => form._id === popupWeb.content)?.informations.map(information => (
                                <div key={information.text} className="flex gap-2">
                                  <div
                                    className="my-auto"
                                    dangerouslySetInnerHTML={{ __html: information.icon }}
                                  />
                                  <div className="flex flex-col my-auto">
                                    <p>{information.text}</p>
                                    {
                                      information.subText && information.subText !== ''
                                        ? <p className="text-gray-400">{information.subText}</p>
                                        : ''
                                    }
                                  </div>
                                </div>
                              ))
                            }
                            {
                              forms?.find(form => form._id === popupWeb.content)?.labels.map(label => (
                                <div key={label.data} className="flex flex-col gap-2">
                                  <p>{label.text !== '' ? label.text : label.name}</p>
                                  <Input placeholder={label.name} change={undefined} value={undefined} />
                                </div>
                              ))
                            }
                            <Button type='submit' config='w-full'>{forms?.find(form => form._id === popupWeb.content)?.button}</Button>
                          </div>
                        </form>
                      )
                      : ''
                  }
                  {
                    popupWeb.content && popupWeb.content !== '' && calls?.find(call => call._id === popupWeb.content)
                      ? (
                        <div className="border rounded-lg shadow-md m-auto w-full max-w-[1280px]">
                          {
                            calls?.find(call => call._id === popupWeb.content)
                              ? <h2 className={`text-center ${responsive === '400px' ? 'text-[20px]' : 'text-[24px]'} border-b p-6 text-main font-semibold`}>{calls.find(call => call._id === popupWeb.content)?.title}</h2>
                              : ''
                          }
                          <div className={`flex ${responsive === '400px' ? 'flex-col' : 'flex-row'}`}>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full border-b' : 'w-5/12 border-r'} flex flex-col gap-8`}>
                              <div className="flex flex-col gap-3">
                                <p className="text-sm font-medium">CARMEN ORELLANA</p>
                                {
                                  calls?.find(call => call._id === popupWeb.content)
                                    ? (
                                      <>
                                        <p className="text-xl font-semibold">{calls.find(call => call._id === popupWeb.content)?.nameMeeting}</p>
                                        <div className="flex gap-2">
                                          <svg className="w-5 text-gray-500" data-id="details-item-icon" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 3.269V5l1.759 2.052" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                          <p className="text-gray-500">{calls.find(call => call._id === popupWeb.content)?.duration}</p>
                                        </div>
                                      </>
                                    )
                                    : <p>No has seleccionado una llamada</p>
                                }
                              </div>
                              {
                                calls?.find(call => call._id === popupWeb.content)
                                  ? (
                                    <div className="flex flex-col gap-3">
                                      <p className="font-medium">Descripción:</p>
                                      <div onClick={() => console.log(calls.find(call => call._id === popupWeb.content)?.description)} className="flex flex-col gap-2">
                                        {
                                          calls.find(call => call._id === popupWeb.content)?.description?.split('\n').map(text => <p key={text}>{text}</p>)
                                        }
                                      </div>
                                    </div>
                                  )
                                  : ''
                              }
                            </div>
                            <div className={`p-6 ${responsive === '400px' ? 'w-full' : 'w-7/12'}`}>
                              <div className="w-full flex flex-col gap-6 h-full">
                                <div className='flex flex-col gap-6'>
                                  <div className="flex gap-6 items-center m-auto">
                                    <button className="text-gray-600 hover:text-gray-800">&lt;</button>
                                    <h1 className="text-lg font-semibold">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h1>
                                    <button className="text-gray-600 hover:text-gray-800">&gt;</button>
                                  </div>
                                  <div className="grid grid-cols-7 gap-2">
                                    <div className="text-center font-semibold text-gray-600">Dom</div>
                                    <div className="text-center font-semibold text-gray-600">Lun</div>
                                    <div className="text-center font-semibold text-gray-600">Mar</div>
                                    <div className="text-center font-semibold text-gray-600">Mié</div>
                                    <div className="text-center font-semibold text-gray-600">Jue</div>
                                    <div className="text-center font-semibold text-gray-600">Vie</div>
                                    <div className="text-center font-semibold text-gray-600">Sáb</div>
                                    {renderCalendar()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      : ''
                  }
                  {
                    popupWeb.buttonLink && popupWeb.buttonLink !== '' && popupWeb.buttonText && popupWeb.buttonText !== ''
                      ? <Button>{popupWeb.buttonText}</Button>
                      : ''
                  }
                </div>
              </div>
            )
            : ''
        }
        {
          funnels.find(funnel => funnel.funnel === part) && type === 'Funnel'
            ? funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)
              ? (
                funnels.find((funnel) => funnel.funnel === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return (
                      <div key={st._id} className={`h-full m-auto bg-white text-black ${responsive === '400px' ? 'w-[400px]' : 'w-full lg:w-[calc(100%-350px)]'} lg:w-[${responsive}]`}>
                        <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                          <div className='flex gap-4 w-fit m-auto'>
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('calc(100%-350px)')
                            }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                            <button  onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('400px')
                            }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                          </div>
                        </div>
                        <div className='overflow-y-auto' style={{ height: 'calc(100% - 75px)' }}>
                          <div className='flex flex-col gap-4'>
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
                                ? funnels.find(funnel => funnel.funnel === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                                  <div key={index}>
                                    {
                                      design.content === 'Carrusel'
                                        ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                        : design.content === 'Bloque 1'
                                          ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                          : design.content === 'Bloque 2'
                                            ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                            : design.content === 'Bloque 3'
                                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} storeData={storeData} />
                                              : design.content === 'Bloque 4'
                                                ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                                : design.content === 'Bloque 5'
                                                  ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} style={style} />
                                                  : design.content === 'Contacto'
                                                    ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} />
                                                    : design.content === 'Suscripción'
                                                      ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} style={style} storeData={storeData} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} style={style} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} storeData={storeData} style={style} getForms={getForms} newForm={newForm} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} responsive={responsive} pageNeed={pages} style={style} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} getClientData={getClientData} clientData={clientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} />
                                                                        : design.content === 'Bloques'
                                                                          ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} forms={forms} />
                                                                          : design.content === 'Reseñas'
                                                                            ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                            : design.content === 'Formulario'
                                                                              ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                              : design.content === 'Lead 3'
                                                                                ? <Lead3 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} storeData={storeData} getForms={getForms} newForm={newForm} />
                                                                                : design.content === 'Tabla comparativa'
                                                                                  ? <Table edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                  : design.content === 'Preguntas frecuentes'
                                                                                    ? <Faq edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                                    : design.content === 'Categorias'
                                                                                      ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                                      : design.content === 'Productos'
                                                                                        ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                                        : design.content === 'Categorias 2'
                                                                                          ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                                          : design.content === 'Carrusel productos'
                                                                                            ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} inde={funnels.findIndex(funnel => funnel.funnel === part)} funnels={funnels} setFunnels={setFunnels} />
                                                                                            : ''
                                    }
                                    <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                      <p className='my-auto font-medium'>{design.content}</p>
                                      {
                                        edit === design.content
                                          ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                                          : <Button2 action={() => {
                                            setResponsive('calc(100%-350px)')
                                            setEdit(design.content)
                                          }}>Editar</Button2>
                                      }
                                      <Button2Red action={() => {
                                        const oldFunnels = [...funnels]
                                        oldFunnels[funnels.findIndex(funnel => funnel.funnel === part)].steps[i].design?.splice(index, 1)
                                        setFunnels(oldFunnels)
                                      }}>Eliminar bloque</Button2Red>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                    </div>
                                  </div>
                                ))
                                : (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexService(-1)
                                      setIndexStepService(-1)
                                      setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                                      setIndexStep(i)
                                      setIndexProduct(-1)
                                      setIndexCategory(-1)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                            }
                            {
                              funnels.find(funnel => funnel.funnel === part)?.steps.find(st => st.step === step)?.design?.length
                                ? (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexService(-1)
                                      setIndexStepService(-1)
                                      setIndexFunnel(funnels.findIndex((funnel) => funnel.funnel === part))
                                      setIndexStep(i)
                                      setIndexProduct(-1)
                                      setIndexCategory(-1)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                                : ''
                            }
                          </div>
                          <div className='w-full p-6 flex flex-col gap-2' style={{ backgroundColor: footer.bgColor, color: footer.textColor }}>
                            {
                              storeData?.logoWhite && storeData?.logoWhite !== ''
                                ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                                : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
                            }
                            {
                              edit === 'Footer'
                                ? (
                                  <>
                                    <Input change={(e: any) => setFooter({ ...footer, funnelText: e.target.value })} config='w-fit m-auto text-black' value={footer.funnelText} placeholder='Texto' />
                                    <Button2 action={() => setEdit('')} config='m-auto'>Guardar</Button2>
                                  </>
                                )
                                : (
                                  <>
                                    {
                                      footer.funnelText && footer.funnelText !== ''
                                        ? <p className='text-center m-auto text-sm' style={{ color: `${footer.textColor}80` }}>{footer.funnelText}</p>
                                        : ''
                                    }
                                    <Button2 action={() => setEdit('Footer')} config='m-auto'>Editar</Button2>
                                  </>
                                )
                            }
                            <p className='m-auto text-center' style={{ color: footer.textColor }}>{storeData?.name} © 2024. Todos los derechos reservados.</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
        {
          services.find(service => service.name === part) && type === 'Service'
            ? services.find(service => service.name === part)?.steps.find(st => st.step === step)
              ? (
                services.find(service => service.name === part)?.steps.map((st, i) => {
                  if (st.step === step) {
                    return (
                      <div key={st._id} className={`h-full m-auto bg-white text-black ${responsive === '400px' ? 'w-[400px]' : 'w-full lg:w-[calc(100%-350px)]'} lg:w-[${responsive}]`}>
                        <div className='flex p-4 bg-white border-b border-border dark:bg-neutral-900 dark:border-neutral-700'>
                          <div className='flex gap-4 w-fit m-auto'>
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('calc(100%-350px)')
                            }} className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoLaptopOutline className='text-2xl dark:text-white' /></button>
                            <button  onClick={(e: any) => {
                              e.preventDefault()
                              setResponsive('400px')
                            }}className='border border-border rounded-lg p-2 dark:border-neutral-700'><IoPhonePortraitOutline className='text-2xl dark:text-white' /></button>
                          </div>
                        </div>
                        <div className='overflow-y-auto' style={{ height: 'calc(100% - 75px)' }}>
                          <div className='flex flex-col gap-4'>
                            {
                              services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
                                ? services.find(service => service.name === part)!.steps.find(st => st.step === step)!.design!.map((design, index) => (
                                  <div key={index}>
                                    {
                                      design.content === 'Carrusel'
                                        ? <Slider design={design} edit={edit} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                        : design.content === 'Bloque 1'
                                          ? <Bloque1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                          : design.content === 'Bloque 2'
                                            ? <Bloque2 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                            : design.content === 'Bloque 3'
                                              ? <Bloque3 edit={edit} design={design} index={index} pages={pages} setPages={setPages} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} storeData={storeData} />
                                              : design.content === 'Bloque 4'
                                                ? <Bloque4 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                                : design.content === 'Bloque 5'
                                                  ? <Bloque5 edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} responsive={responsive} calls={calls} forms={forms} services={services} setServices={setServices} />
                                                  : design.content === 'Contacto'
                                                    ? <Contact edit={edit} design={design} pages={pages} setPages={setPages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} />
                                                    : design.content === 'Suscripción'
                                                      ? <Subscription edit={edit} pages={pages} setPages={setPages} index={index} design={design} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} />
                                                      : design.content === 'Lead 1'
                                                        ? <Lead1 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} getForms={getForms} newForm={newForm} />
                                                        : design.content === 'Video'
                                                          ? <Video edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} responsive={responsive} services={services} setServices={setServices} style={style} storeData={storeData} />
                                                          : design.content === 'Agendar llamada'
                                                            ? <Call edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} calls={calls!} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} setPopupCall={setPopupCall} popupCall={popupCall} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} style={style} />
                                                            : design.content === 'Bloque 7'
                                                              ? <Bloque7 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
                                                              : design.content === 'Checkout'
                                                                ? <Checkout edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} setServices={setServices} setError={setError} setTitle={setTitle} popupService={popupService} setPopupService={setPopupService} setNewService={setNewService} funnels={funnels} setFunnels={setFunnels} storeData={storeData} style={style} />
                                                                : design.content === 'Llamadas'
                                                                  ? <Calls edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} />
                                                                  : design.content === 'Lead 2'
                                                                    ? <Lead2 edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} selectFunnel={selectFunnel} setSelectFunnel={setSelectFunnel} selectStep={step} setNewForm={setNewForm} responsive={responsive} error={error} setError={setError} services={services} setServices={setServices} storeData={storeData} getForms={getForms} newForm={newForm} />
                                                                    : design.content === 'Servicios'
                                                                      ? <Services edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} calls={calls} funnels={funnels} setFunnels={setFunnels} services={services} setServices={setServices} responsive={responsive} pageNeed={pages} />
                                                                      : design.content === 'Planes'
                                                                        ? <Plans edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} setServices={setServices} getClientData={getClientData} clientData={clientData} setNewCall={setNewCall} setTitleMeeting={setTitleMeeting} popupCall={popupCall} setPopupCall={setPopupCall} calls={calls} style={style} />
                                                                        : design.content === 'Bloques'
                                                                          ? <Blocks edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} forms={forms} />
                                                                          : design.content === 'Reseñas'
                                                                            ? <Reviews edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} style={style} />
                                                                            : design.content === 'Formulario'
                                                                              ? <Form edit={edit} pages={pages} setPages={setPages} design={design} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} responsive={responsive} pageNeed={pages} funnels={funnels} setFunnels={setFunnels} forms={forms} popupForm={popupForm} setNewForm={setNewForm} setPopupForm={setPopupForm} setTitleForm={setTitleForm} style={style} getForms={getForms} newForm={newForm} />
                                                                              : design.content === 'Categorias'
                                                                                ? <Categories edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} />
                                                                                : design.content === 'Productos'
                                                                                  ? <Products edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} />
                                                                                  : design.content === 'Categorias 2'
                                                                                    ? <Categories2 edit={edit} categories={categories} pages={pages} setPages={setPages} setMouse={setMouse} design={design} index={index} mouse={mouse} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} />
                                                                                    : design.content === 'Carrusel productos'
                                                                                      ? <SliderProducts edit={edit} order={order} setOrder={setOrder} productsOrder={productsOrder} setPages={setPages} design={design} categories={categories} pages={pages} index={index} ind={i} indx={services.findIndex(service => service.name === part)} services={services} funnels={funnels} setFunnels={setFunnels} />
                                                                                      : ''
                                    }
                                    <div className='m-auto mt-2 mb-6 flex gap-4 w-fit'>
                                      <p className='my-auto font-medium'>{design.content}</p>
                                      {
                                        edit === design.content
                                          ? <Button2 action={() => setEdit('')}>Guardar</Button2>
                                          : <Button2 action={() => {
                                            setResponsive('calc(100%-350px)')
                                            setEdit(design.content)
                                          }}>Editar</Button2>
                                      }
                                      <Button2Red action={() => {
                                        const oldServices = [...services]
                                        oldServices[services.findIndex(service => service.name === part)].steps[i].design?.splice(index, 1)
                                        setServices(oldServices)
                                      }}>Eliminar bloque</Button2Red>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'up')}><SlArrowUp className='text-lg' /></button>
                                      <button onClick={() => moveBlockFunnel(funnels.findIndex(funnel => funnel.funnel === part), i, index, 'down')}><SlArrowDown className='text-lg' /></button>
                                    </div>
                                  </div>
                                ))
                                : (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexFunnel(-1)
                                      setIndexStep(-1)
                                      setIndexService(services.findIndex(service => service.name === part))
                                      setIndexStepService(i)
                                      setIndexProduct(-1)
                                      setIndexCategory(-1)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                            }
                            {
                              services.find(service => service.name === part)?.steps.find(st => st.step === step)?.design?.length
                                ? (
                                  <div className='py-10 flex'>
                                    <Button action={() => {
                                      setIndexPage(-1)
                                      setIndexFunnel(-1)
                                      setIndexStep(-1)
                                      setIndexService(services.findIndex(service => service.name === part))
                                      setIndexStepService(i)
                                      setIndexProduct(-1)
                                      setIndexCategory(-1)
                                      setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                                      setTimeout(() => {
                                        setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                                      }, 10)
                                    }} config='m-auto'>Agregar bloque de contenido</Button>
                                  </div>
                                )
                                : ''
                            }
                          </div>
                          <div className='w-full p-6 bg-neutral-800 flex flex-col'>
                            {
                              storeData?.logoWhite && storeData?.logoWhite !== ''
                                ? <Link href='/' className='w-fit m-auto'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo' width={155} height={53.72} /></Link>
                                : <Link href='/' className='w-fit m-auto'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-white'>TIENDA</p></div></Link>
                            }
                            <p className='m-auto text-center text-white'>Todos los derechos reservados ©2024</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              )
              : <p className='m-auto'>Seleccionar paso</p>
            : ''
        }
        {
          part === 'Pagina de carrito'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='flex gap-4 p-4' style={{ backgroundColor: cartPage.bgColor, color: cartPage.textColor }}>
                  <div className='w-1/2 flex flex-col gap-4'>
                    <h1 className='text-3xl font-medium'>Carrito</h1>
                    <div className='flex gap-4 justify-between'>
                      <div className='flex gap-2'>
                        <Image className='w-28' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={productsOrder![0].images[0]} alt='Imagen producto' width={200} height={200} />
                        <p className='m-auto font-medium'>{productsOrder![0].name}</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-6 flex flex-col gap-4' style={{ border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', backgroundColor: cartPage.detailsColor }}>
                      <h2 className='text-2xl font-medium'>Calcula los costos de envío</h2>
                      <Select change={undefined} config='bg-transparent'>
                        <option>Seleccionar Región</option>
                      </Select>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-between'>
                          <p>Subtotal</p>
                          <p>$10.000</p>
                        </div>
                        <div className='flex gap-2 justify-between border-b pb-2'>
                          <p>Envío</p>
                          <p>$3.000</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p>Total</p>
                          <p>$13.000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Pagina de checkout'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='flex gap-4 p-4' style={{ backgroundColor: checkoutPage.bgColor, color: checkoutPage.textColor }}>
                  <div className='w-1/2 flex flex-col gap-4'>
                    <h1 className='text-3xl font-medium'>Finalizar compra</h1>
                    <h2 className='text-2xl font-medium'>Información de contacto</h2>
                    <div className='flex flex-col gap-1'>
                      <p>Email</p>
                      <Input config='bg-transparent' placeholder='Email' change={undefined} />
                    </div>
                    <h2 className='text-2xl font-medium'>Información de envío</h2>
                    <div className='flex gap-2'>
                      <div className='flex flex-col gap-1 w-1/2'>
                        <p>Nombre</p>
                        <Input config='bg-transparent' placeholder='Nombre' change={undefined} />
                      </div>
                      <div className='flex flex-col gap-1 w-1/2'>
                        <p>Apellido</p>
                        <Input config='bg-transparent' placeholder='Apellido' change={undefined} />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p>Dirección</p>
                      <Input config='bg-transparent' placeholder='Dirección' change={undefined} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p>Detalles (opcional)</p>
                      <Input config='bg-transparent' placeholder='Detalles' change={undefined} />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-6 flex flex-col gap-4' style={{ border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', backgroundColor: checkoutPage.detailsColor }}>
                      <h2 className='text-2xl font-medium'>Carrito</h2>
                      <div className='flex gap-2 justify-between'>
                        <div className='flex gap-2'>
                          <Image className='w-20' style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={productsOrder![0].images[0]} alt='Imagen producto' width={200} height={200} />
                          <p className='m-auto font-medium'>{productsOrder![0].name}</p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-between'>
                          <p>Subtotal</p>
                          <p>$10.000</p>
                        </div>
                        <div className='flex gap-2 justify-between border-b pb-2'>
                          <p>Envío</p>
                          <p>$3.000</p>
                        </div>
                        <div className='flex gap-2 justify-between'>
                          <p>Total</p>
                          <p>$13.000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Estilo'
            ? (
              <div className='w-full bg-white text-black lg:w-[calc(100%-350px)] overflow-y-auto'>
                <div className={`w-full p-4 flex gap-4 justify-between`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 0px 10px 0px ${style.borderColor}15` : '', borderBottom: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                  <p className='text-3xl font-semibold my-auto'>LOGO</p>
                  <div className='flex gap-4 my-auto'>
                    <p className='my-auto'>Inicio</p>
                    <p className='my-auto'>Contacto</p>
                    <p className={`my-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Hablemos</p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-4 px-4 py-12'>
                  <p className='text-center m-auto text-4xl font-semibold'>Lorem ipsum</p>
                  <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptatem dolorum deleniti doloremque nulla? Dolore, error assumenda. Repellendus similique natus ut accusamus ipsa voluptatem nostrum, eos, quidem sed, non reiciendis.</p>
                  <div className='flex gap-4 justify-around flex-wrap'>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                    <div className={`p-6 w-96 flex flex-col gap-3`} style={{ boxShadow: style?.design === 'Sombreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', borderRadius: style.form === 'Redondeadas' ? `${style.borderBlock}px` : '', border: style?.design === 'Borde' ? `1px solid ${style.borderColor}` : '' }}>
                      <p className='text-center m-auto font-medium text-2xl'>Lorem ipsum</p>
                      <p className='text-center m-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <button className={` m-auto px-4 py-2 text-white w-full`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Lorem ipsum</button>
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 py-12 flex flex-col gap-4'>
                  <p className='text-2xl font-medium text-center m-auto'>Lorem ipsum dolor sit amet</p>
                  <div className='flex gap-2'>
                    <input className={`w-full border px-2 bg-white`} style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} placeholder='Email' />
                    <button className={` m-auto px-4 py-2 text-white`} style={{ backgroundColor: style?.primary, color: style?.button, borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }}>Envíar</button>
                  </div>
                </div>
              </div>
            )
            : ''
        }
        {
          part === 'Chat'
            ? (
              <div className={`m-auto flex h-[480px] justify-between flex-col gap-3 transition-all duration-500 bg-white w-96 sm:h-[600px] sm:gap-4`} style={{ borderRadius: `${style.borderBlock}px`, border: style.design === 'Borde' ? `1px solid ${style.borderColor}` : '', boxShadow: style.design === 'Sobreado' ? `0px 3px 20px 3px ${style.borderColor}10` : '', backgroundColor: chat?.bgColor ? chat?.bgColor : '' }}>
                <div className='h-28 w-full flex p-4' style={{ backgroundColor: style.primary, borderTopLeftRadius: `${style.borderBlock}px`, borderTopRightRadius: `${style.borderBlock}px` }}>
                  <span className='text-white mt-auto mb-auto text-xl'>Chat</span>
                </div>
                <div className='flex flex-col h-full gap-2 pl-3 sm:pl-4' style={{ overflow: 'overlay' }}>
                  <div className='flex flex-col gap-2 mr-4'>
                    <div className='bg-gray-200 p-1.5 rounded-md w-fit text-black ml-auto'><p>Lorem ipsum</p></div>
                  </div>
                  <div className='flex flex-col gap-2 mr-6'>
                    <div className='text-white p-1.5 rounded-md w-fit' style={{ backgroundColor: style.primary }}><p>Lorem ipsum</p></div>
                  </div>
                </div>
                <form className='flex gap-2 pr-3 pl-3 pb-3 sm:pr-4 sm:pl-4 sm:pb-4'>
                  <Input type={'text'} placeholder={'Mensaje'} change={undefined} config='bg-white' />
                  <button type='submit' className='text-white w-28 rounded-xl dark:bg-neutral-700 transition-colors duration-200 hover:bg-transparent' style={{ backgroundColor: style.primary }}>Enviar</button>
                </form>
              </div>
            )
            : ''
        }
      </div>
    </>
  )
}

function renderCalendar(): JSX.Element[] {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();

  const days: JSX.Element[] = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push(
      <button 
        key={i}  
        className={`w-12 h-12 m-auto flex rounded-full $bg-gray-100 hover:bg-main hover:text-white transition-color duration-150`}
      >
        <p className='m-auto'>{i}</p>
      </button>
    );
  }

  return days;
}