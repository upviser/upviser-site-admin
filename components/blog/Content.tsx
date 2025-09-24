import React from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { Card, Input, Textarea } from '../ui'

const ReactQuillComponent = dynamic(() => import("react-quill"), { ssr: false })

interface Props {
    setContentData: any
    contentData: any
    setContent: any
    content: any
}

export const Content: React.FC<Props> = ({ setContentData, contentData, setContent, content }) => {
  return (
    <Card title='Información'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Título</p>
        <Input placeholder='Título del post' change={(e: any) => setContentData({ ...contentData, title: e.target.value })} value={contentData.title} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Descripción</p>
        <Textarea placeholder='Descripción del post' change={(e: any) => setContentData({ ...contentData, description: e.target.value })} value={contentData.description} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Contenido</p>
        <div>
          <ReactQuillComponent modules={{
            toolbar: [
              [{ header: [ false, 1, 2, 3, 4] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'image', 'video'],
              ['clean']
            ],
            clipboard: {
              matchVisual: false,
            }
          }} theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
    </Card>
  )
}
