import { IProduct } from '@/interfaces'
import { NumberFormat } from '@/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export const ProductCard = ({ product, style }: { product: IProduct, style?: any }) => {

    const [image, setImage] = useState(product.images[0])
    const [hover, setHover] = useState(false)

    useEffect(() => {
      if (product.images.length >= 2) {
        if (hover) {
          setImage(product.images[1])
        } else {
          setImage(product.images[0])
        }
      }
      
    }, [hover, product])

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex flex-col gap-1 m-auto w-40 lg:w-60">
      <Link className="w-fit" href={`/tienda/${product.category.slug}/${product.slug}`}><Image onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="w-40 lg:w-60" style={{ borderRadius: style.form === 'Redondeadas' ? `${style.borderButton}px` : '' }} src={image} alt={`Imagen producto ${product.name}`} width={500} height={500} /></Link>
      <Link href={`/tienda/${product.category.slug}/${product.slug}`}><p className="font-medium text-sm lg:text-[16px]">{product.name}</p></Link>
      <div className="flex gap-2">
        <p className="text-sm lg:text-[16px]">${NumberFormat(product.price)}</p>
        {
          product.beforePrice
            ? <p className="text-xs lg:text-sm line-through">${NumberFormat(product.beforePrice)}</p>
            : ''
        }
      </div>
    </div>
  )
}
