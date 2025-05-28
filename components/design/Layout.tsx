import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import { IFooter, IPage, IStoreData } from '@/interfaces'
import Link from 'next/link'
import { Button, Button2, Select } from '../ui'
import { ButtonDesign } from './ButtonDesign'

interface Props {
    edit: any
    setEdit: any
    setHeader: any
    header: any
    setPart: any
    pages: IPage[]
    storeData: IStoreData | undefined
    responsive: string
    style?: any
    footer: IFooter
    setFooter: any
}

export const Layout: React.FC<PropsWithChildren<Props>> = ({ children, edit, setEdit, setHeader, header, setPart, pages, storeData, responsive, style, footer, setFooter }) => {
  return (
    <>
      <div className='flex pl-2 pr-2 pt-1.5 pb-1.5 sticky text-center' style={{ backgroundColor: header.bgColorTop && header.bgColorTop !== '' ? header.bgColorTop : '#111111', color: header.textColorTop }}>
        {
          edit !== 'Header'
            ? <p onClick={() => setEdit('Header')} className='cursor-pointer m-auto tracking-wide font-medium text-[11px]'>{header?.topStrip}</p>
            : (
              <div className='flex gap-2 m-auto'>
                <input onChange={(e: any) => setHeader({ ...header, topStrip: e.target.value })} type='text' placeholder='Texto superior' value={header.topStrip} className='bg-transparent border border-neutral-500 p-1.5 rounded m-auto w-[800px] text-center' />
                <p className='my-auto'>Color fondo</p>
                <input type='color' className='my-auto' onChange={(e: any) => setHeader({ ...header, bgColorTop: e.target.value })} value={header.bgColorTop} />
                <p className='my-auto'>Color texto</p>
                <input type='color' className='my-auto' onChange={(e: any) => setHeader({ ...header, textColorTop: e.target.value })} value={header.textColorTop} />
              </div>
            )
        }
      </div>
      <div style={{ top: '-0.5px', backgroundColor: header.bgColor && header.bgColor !== '' ? header.bgColor : '#ffffff', color: header.textColor }} className="w-full sticky flex z-30 overflow-x-auto">
        <div className="w-full" style={{ borderBottom: `1px solid ${style.borderColor}` }}>
          <div className='flex gap-4 px-2 justify-between m-auto max-w-[1280px] w-full'>
            {
              responsive === '400px'
                ? (
                  (
                    <svg className="w-5" role="presentation" viewBox="0 0 20 14">
                      <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor"></path>
                    </svg>
                  )
                )
                : ''
            }
            <div className='flex gap-2'>
              {
                storeData?.logo && storeData?.logo !== '' && header.logo === 'Logo'
                  ? <Link href='/'><Image className='w-auto h-[52px] py-1' src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
                  : storeData?.logoWhite && storeData?.logoWhite !== '' && header.logo === 'Logo blanco'
                    ? <Link href='/'><Image className='w-auto h-[52px] py-1' src={`${storeData.logoWhite}`} alt='Logo blanco' width={155} height={53.72} /></Link>
                    : storeData?.logo && storeData?.logo !== ''
                      ? <Link href='/'><Image className='w-auto h-[52px] py-1' src={`${storeData.logo}`} alt='Logo' width={155} height={53.72} /></Link>
                      : <Link href='/'><div className='h-[52px] flex'><p className='m-auto text-2xl font-medium text-black'>SITIO WEB</p></div></Link>
              }
              {
                edit === 'Header'
                  ? (
                    <Select change={(e: any) => setHeader({ ...header, logo: e.target.value })} config={`h-fit my-auto bg-transparent`} value={header.logo}>
                      <option>Logo</option>
                      <option>Logo blanco</option>
                    </Select>
                  )
                  : ''
              }
            </div>
            {
              edit !== 'Header'
                ? <Button2 action={() => setEdit('Header')} config='m-auto'>Editar header</Button2>
                : (
                  <div className='flex gap-4 m-auto'>
                    <div className='flex gap-2'>
                      <p className='my-auto'>Color Header</p>
                      <input type='color' className='my-auto' onChange={(e: any) => setHeader({ ...header, bgColor: e.target.value })} value={header.bgColor} />
                    </div>
                    <div className='flex gap-2'>
                      <p className='my-auto'>Color texto</p>
                      <input type='color' className='my-auto' onChange={(e: any) => setHeader({ ...header, textColor: e.target.value })} value={header.textColor} />
                    </div>
                    <Button2 action={() => setEdit('')}>Guardar</Button2>
                  </div>
                )
            }
            {
              responsive === '400px'
                ? ''
                : (
                  <ul className="flex gap-4 my-auto">
                    {
                      pages.map(page => {
                        if (page.header) {
                          if (page.button) {
                            return (
                              <li key={page.slug} className='my-auto'><ButtonDesign style={style} text={page.page} /></li>
                            )
                          } else {
                            return (
                              <li key={page.slug} className="m-auto h-14 flex"><button onClick={() => setPart(page.page)} className={`h-fit m-auto transition-colors duration-150`}>{page.page}</button></li>
                            )
                          }
                          }
                          
                      })
                    }
                  </ul>
                )
            }
          </div>
        </div>
      </div>
      { children }
      <div className='flex pl-4 pr-4 pt-14 pb-24 z-40' style={{ backgroundColor: footer?.bgColor && footer.bgColor !== '' ? footer.bgColor : '#111111', color: footer?.textColor && footer.textColor !== '' ? footer.textColor : '#ffffff' }}>
        <div className='w-[1280px] m-auto'>
          <div className='flex gap-4 justify-between flex-wrap pb-6 border-b'>
            <div>
              <button className='text-3xl font-medium'>SITIO WEB</button>
              <p className='mb-4 text-sm'>contacto@sitioweb.cl</p>
              <div className='flex gap-4'>
                <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></button>
                <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></button>
                <button><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg></button>
              </div>
            </div>
            <div>
              <h3 className='mb-2'>SITIO WEB</h3>
              <button className='block text-sm mb-1'>Lorem ipsum</button>
            </div>
            <div>
              <h3 className='mb-2'>POLITICAS</h3>
              <button className='block text-sm mb-1'>Terminos y condiciones</button>
              <button className='block text-sm mb-1'>Politicas de privacidad</button>
            </div>
          </div>
          <div className='mt-4 flex justify-between'>
            <span className='text-sm'>© 2023 SITIO WEB. Todos los derechos reservados</span>
            {
              edit === 'Footer'
                ? (
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      <p className='my-auto'>Color fondo</p>
                      <input type='color' onChange={(e: any) => setFooter({ ...footer, bgColor: e.target.value })} value={footer?.bgColor} />
                    </div>
                    <div className='flex gap-2'>
                      <p className='my-auto'>Color texto</p>
                      <input type='color' onChange={(e: any) => setFooter({ ...footer, textColor: e.target.value })} value={footer?.textColor} />
                    </div>
                    <Button2 action={() => setEdit('')} config='m-auto'>Guardar footer</Button2>
                  </div>
                )
                : <Button2 action={() => setEdit('Footer')} config='m-auto'>Editar footer</Button2>
            }
          </div>
        </div>
      </div>
    </>
  )
}
