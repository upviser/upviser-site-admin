import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from 'react-icons/ci'
import { IoTrashOutline } from "react-icons/io5"
import { Button2, ButtonAI, Card, Popup, Spinner, Textarea } from '../ui'
import Image from 'next/image'

interface Props {
  information: IProduct
  setInformation: any
}

export const Media: React.FC<Props> = ({ information, setInformation }) => {

  const [indexSelected, setIndexSelected] = useState(-1)
  const [trash, setTrash] = useState(-1)
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')
  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [description, setDescription] = useState('')
  const [imageGenerate, setImageGenerate] = useState('')
  const [loading, setLoading] = useState(false)

  const onDrop = (acceptedFiles: any) => {
    if (!loadingImage) {
      setLoadingImage(true)
      let images = information.images
      acceptedFiles.map(async (acceptedFile: any) => {
        const formData = new FormData();
        formData.append('image', acceptedFile);
        formData.append('name', acceptedFile.name);
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, {
            headers: {
              accept: 'application/json',
              'Accept-Language': 'en-US,en;q=0.8'
            }
          })
          images.push(data)
          setLoadingImage(false)
        } catch (error) {
          setLoadingImage(false)
          setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
        }
      })
      setInformation({...information, images: images})
    }
  }

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      const data = new FormData()
      data.append('image', file)
      data.append('name', file.name)
      setFormData(data)
    }
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleMouseUp = (index: number) => {
    if (indexSelected !== null && indexSelected !== index) {
      const updatedImages = [...information.images]
      const temp = updatedImages[indexSelected]
      updatedImages[indexSelected] = updatedImages[index]
      updatedImages[index] = temp
      setInformation({
        ...information,
        images: updatedImages,
      })
    }
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...information.images]
    updatedImages.splice(index, 1)
    setInformation({ ...information, images: updatedImages })
  }

  return (
    <>
      <Popup popup={popup} setPopup={setPopup}>
        <p className='font-medium'>Generar imagen con IA</p>
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Subir imagen del producto</p>
          <input type='file' onChange={imageChange} className='text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
        </div>
        {
          imagePreview !== ''
            ? <Image className='w-52 h-auto' src={imagePreview} alt={'Imagen de producto'} width={500} height={500} />
            : ''
        }
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Descripción de la imagen</p>
          <Textarea placeholder={'Descripción de la imagen'} change={(e: any) => setDescription(e.target.value)} value={description} config='h-20' />
        </div>
        <ButtonAI click={async (e: any) => {
          e.preventDefault()
          if (!loading) {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image-product`, formData, {
              headers: {
                accept: 'application/json',
                'Accept-Language': 'en-US,en;q=0.8'
              }
            })
            setImageGenerate(data)
            setLoading(false)
          }
        }} text={'Generar imagen con IA'} loading={loading} config='min-h-9' />
        {
          imageGenerate !== ''
            ? (
              <>
                <Image src={imageGenerate} alt={'Imagen de producto generada por IA'} width={1024} height={1024} />
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  let images = information.images
                  images.push(imageGenerate)
                  setInformation({...information, images: images})
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  }, 200)
                }} config='w-full'>Agregar imagen creada con IA</Button2>
              </>
            )
            : ''
        }
      </Popup>
      <Card title='Elementos muntimedia'>
        <div className='flex gap-2 flex-wrap'>
          <div {...getRootProps()} className={`flex w-28 h-28 border transition-colors duration-200 rounded-lg cursor-pointer dark:bg-neutral-700 dark:border-neutral-600 ${isDragActive ? 'bg-neutral-100' : 'bg-white'} hover:bg-neutral-100 dark:hover:bg-neutral-600`}>
            <div className='w-28 h-28 flex'>
              <input {...getInputProps()} />
              <CiImageOn className='text-3xl m-auto text-neutral-400' />
            </div>
          </div>
          {
            information.images
              ? information.images.map((image, index) => (
                <>
                  <Image onMouseEnter={() => setTrash(index)} onMouseLeave={() => setTrash(-1)} onMouseDown={() => setIndexSelected(index)} onMouseUp={() => handleMouseUp(index)} onClick={() => handleDeleteImage(index)} className='w-28 h-28 shadow-md rounded-md cursor-pointer' draggable={false} key={image} src={image} alt={`Imagen producto ${information.name}`} width={150} height={150} />
                  <IoTrashOutline onMouseEnter={() => setTrash(index)} onMouseLeave={() => setTrash(-1)} onMouseDown={() => setIndexSelected(index)} onMouseUp={() => handleMouseUp(index)} onClick={() => handleDeleteImage(index)} className={`${trash === index ? 'opacity-1' : 'opacity-0'} transition-opacity duration-150 cursor-pointer -ml-20 mt-10 mr-[42px] text-3xl dark:text-black`} />
                </>
              ))
              : ''
          }
        </div>
        <ButtonAI click={(e: any) => {
          e.preventDefault()
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
          }, 10);
        }} text={'Generar imagen con IA'} config='w-fit' />
      </Card>
    </>
  )
}
