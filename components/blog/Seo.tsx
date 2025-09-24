import React from 'react'
import { Card, Input, Textarea } from '../ui'

interface Props {
    setContentData: any
    contentData: any
}

export const Seo: React.FC<Props> = ({ setContentData, contentData }) => {
  return (
    <Card title='SEO'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Meta título</p>
        <Input placeholder='Meta título' change={(e: any) => setContentData({ ...contentData, titleSeo: e.target.value })} value={contentData.titleSeo} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Meta descripción</p>
        <Textarea placeholder='Meta descripción' change={(e: any) => setContentData({ ...contentData, descriptionSeo: e.target.value })} value={contentData.descriptionSeo} />
      </div>
    </Card>
  )
}
