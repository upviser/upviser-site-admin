"use client"
import { Button, ButtonAI, Input, Select, Textarea } from "@/components/ui"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function Page() {

  const [type, setType] = useState('')
  const [text, setText] = useState({ type: 'Normal', personalizeType: '', promt: '' })
  const [loadingText, setLoadingText] = useState(false)
  const [textIA, setTextIA] = useState('')
  const [imageRef, setImageRef] = useState('')
  const [image, setImage] = useState({ promt: '', size: '1:1' })
  const [loadingImage, setLoadingImage] = useState(false)
  const [imageIA, setImageIA] = useState('')
  const [video, setVideo] = useState({ promt: '', image: '', duration: '5', quality: '720p', size: '1:1' })
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [videoIA, setVideoIA] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [shopLogin, setShopLogin] = useState<any>()
  const [error, setError] = useState('')

  const getShopLogin = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`)
    setShopLogin(res.data)
  }

  useEffect(() => {
    getShopLogin()
  }, [])

  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // No se seleccionó nada

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        formData,
        {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
          },
        }
      );

      setImageRef(data); // data expected to be a string con URL
    } catch (error) {
      console.error('Error al subir imagen:', file.name, error);
      alert('Error al subir la imagen. Intenta nuevamente.');
    }
  };

  const imageVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // No se seleccionó nada

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        formData,
        {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
          },
        }
      );

      setVideo({ ...video, image: data }); // data expected to be a string con URL
    } catch (error) {
      console.error('Error al subir imagen:', file.name, error);
      alert('Error al subir la imagen. Intenta nuevamente.');
    }
  };

  const handleSubmitText = async () => {
    if (!loadingText) {
      setLoadingText(true)
      setError('')
      if (text.promt === '') {
        setError('Debes describir el texto que quieres generar')
        setLoadingText(false)
        return
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/text-ia`, text)
      setTextIA(res.data)
      setLoadingText(false)
    }
  }

  const handleSubmitImage = async () => {
    if (!loadingImage) {
      setLoadingImage(true)
      setError('')
      if (shopLogin.imagesAI === 0) {
        setError('No tienes imagenes disponibles')
        setLoadingImage(false)
        return
      }
      if (image.promt === '') {
        setError('Debes describir la imagen que quieres generar')
        setLoadingImage(false)
        return
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image-ia`, { promt: image.promt, image: imageRef, size: image.size })
      setImageIA(res.data)
      setLoadingImage(false)
      const res2 = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, { imagesAI: shopLogin.imagesAI - 1 })
      setShopLogin(res2.data)
    }
  }

  const handleSubmitVideo = async () => {
    if (!loadingVideo) {
      setLoadingVideo(true)
      setError('')
      if (shopLogin.videosAI === 0) {
        setError('No tienes videos disponibles')
        setLoadingVideo(false)
        return
      }
      if (video.promt === '') {
        setError('Debes describir el video que quieres generar')
        setLoadingVideo(false)
        return
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/video-ia`, video)
      setVideoIA(res.data)
      setLoadingVideo(false)
      const res2 = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login-admin`, { videosAI: shopLogin.videosAI - 1 })
      setShopLogin(res2.data)
    }
  }

  return (
    <>
      <div className='w-full h-full bg-bg flex flex-col gap-6 dark:bg-neutral-900'>
        <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full max-h-full overflow-y-auto'>
          <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium my-auto'>Generación de contenido con IA</h1>
          </div>
          <div className="flex p-2 border rounded-xl w-fit bg-white divide-x dark:border-neutral-700 dark:bg-neutral-800 dark:divide-neutral-700">
            <p className="px-2">Imagenes: {shopLogin?.imagesAI}</p>
            <p className="px-2">Videos: {shopLogin?.videosAI}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => {
              setType('Generación de textos')
              setError('')
            }} className={`${type === 'Generación de textos' ? 'bg-main text-white border-main' : 'bg-white dark:bg-neutral-700 dark:border-neutral-600'} px-4 py-2 rounded-xl border`}>Generación de textos</button>
            <button onClick={() => {
              setType('Generación de imagenes')
              setError('')
            }} className={`${type === 'Generación de imagenes' ? 'bg-main text-white border-main' : 'bg-white dark:bg-neutral-700 dark:border-neutral-600'} px-4 py-2 rounded-xl border`}>Generación de imagenes</button>
            <button onClick={() => {
              setType('Generación de videos')
              setError('')
            }} className={`${type === 'Generación de videos' ? 'bg-main text-white border-main' : 'bg-white dark:bg-neutral-700 dark:border-neutral-600'} px-4 py-2 rounded-xl border`}>Generación de videos</button>
          </div>
          {
            type !== ''
              ? type === 'Generación de textos'
                ? (
                  <>
                    <h2 className="font-medium">Generación de textos con inteligencia artificial</h2>
                    <div className="flex gap-6 flex-col sm:flex-row">
                      <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        <div className="flex flex-col gap-2">
                          <p className='text-sm'>Selecciona estilo</p>
                          <Select change={(e: any) => setText({ ...text, type: e.target.value })} value={text.type} >
                            <option>Normal</option>
                            <option>Persuasivo</option>
                            <option>Formal</option>
                            <option>Experto</option>
                            <option>Personalizado</option>
                          </Select>
                        </div>
                        {
                          text.type === 'Personalizado'
                            ? (
                              <div className="flex flex-col gap-2">
                                <p className='text-sm'>Estilo del texto</p>
                                <Input change={(e: any) => setText({ ...text, personalizeType: e.target.value })} value={text.personalizeType} placeholder="Estilo del texto" />
                              </div>
                            )
                            : ''
                        }
                        <div className="flex flex-col gap-2">
                          <p className='text-sm'>Describe el texto que quieres generar</p>
                          <Textarea change={(e: any) => setText({ ...text, promt: e.target.value })} value={text.promt} placeholder="Descripción" config='h-20' />
                        </div>
                        {
                          error !== ''
                            ? <p className="w-fit p-2 bg-red-500 text-white">{error}</p>
                            : ''
                        }
                        <ButtonAI click={handleSubmitText} text={'Generar texto con IA'} loading={loadingText} />
                      </div>
                      <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        {
                          textIA !== ''
                            ? <Textarea placeholder={"Texto generado por IA"} change={(e: any) => setTextIA(e.target.value)} value={textIA} config="h-96" />
                            : ''
                        }
                      </div>
                    </div>
                  </>
                )
                : type === 'Generación de imagenes'
                  ? (
                    <>
                      <h2 className="font-medium">Generación de imagenes con inteligencia artificial</h2>
                      <div className="flex gap-6 flex-col sm:flex-row">
                        <div className="flex flex-col gap-4 w-full sm:w-1/2">
                          <div className="flex flex-col gap-2">
                            <p className="text-sm">Sube la imagen de referencia</p>
                            <input type="file" className="text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20" onChange={imageChange} />
                          </div>
                          {
                            imageRef !== ''
                              ? (
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm">Imagen de referencia</p>
                                  <div className="flex gap-2 flex-wrap">
                                    <Image className='w-52 h-fit' src={imageRef} alt={'Imagen'} width={500} height={500} />
                                  </div>
                                </div>
                              )
                              : ''
                          }
                          <div className="flex flex-col gap-2">
                            <p className='text-sm'>Describe la imagen que quieres generar</p>
                            <Textarea change={(e: any) => setImage({ ...image, promt: e.target.value })} value={image.promt} placeholder="Descripción" config='h-20' />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className='text-sm'>Elige el formato de la imagen</p>
                            <Select change={(e: any) => setImage({ ...image, size: e.target.value })} value={image.size}>
                              <option>21:9</option>
                              <option>16:9</option>
                              <option>4:3</option>
                              <option>1:1</option>
                              <option>3:4</option>
                              <option>9:16</option>
                              <option>16:21</option>
                            </Select>
                          </div>
                          {
                            error !== ''
                              ? <p className="w-fit p-2 bg-red-500 text-white">{error}</p>
                              : ''
                          }
                          <ButtonAI click={handleSubmitImage} text={'Generar imagen con IA'} loading={loadingImage} />
                        </div>
                        <div className="flex flex-col gap-4 w-full sm:w-1/2">
                          {
                            imageIA !== ''
                              ? (
                                <>
                                  <Image className='w-full h-fit' src={imageIA} alt={'Imagen'} width={500} height={500} />
                                  <Button action={async () => {
                                    try {
                                      const response = await fetch(imageIA);
                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);
                                      const link = document.createElement('a');
                                      link.href = url;
                                      const fileName = imageIA.split('/').pop() ?? 'download.png';
                                      link.download = fileName;
                                      document.body.appendChild(link);
                                      link.click();
                                      link.remove();
                                      window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                      console.error('Error descargando imagen:', err);
                                    }
                                  }}>Descargar imagen</Button>
                                </>
                              )
                              : ''
                          }
                        </div>
                      </div>
                    </>
                  )
                  : type === 'Generación de videos'
                    ? (
                      <>
                        <h2 className="font-medium">Generación de videos con inteligencia artificial</h2>
                        <div className="flex gap-6 flex-col sm:flex-row">
                          <div className="flex flex-col gap-4 w-full sm:w-1/2">
                            <div className="flex flex-col gap-2">
                              <p className="text-sm">Sube la imagen de referencia</p>
                              <input type="file" className="text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20" onChange={imageVideoChange} />
                            </div>
                            {
                              video.image !== ''
                                ? (
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm">Imagenes de referencia</p>
                                    <div className="flex gap-2 flex-wrap">
                                      <Image className='w-52 h-fit' src={video.image} alt={'Imagen'} width={500} height={500} />
                                    </div>
                                  </div>
                                )
                                : ''
                            }
                            <div className="flex flex-col gap-2">
                              <p className='text-sm'>Describe el video que quieres generar</p>
                              <Textarea change={(e: any) => setVideo({ ...video, promt: e.target.value })} value={video.promt} placeholder="Descripción" config='h-20' />
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className='text-sm'>Elige el formato de la imagen</p>
                              <Select change={(e: any) => setVideo({ ...video, size: e.target.value })} value={video.size}>
                                <option>16:9</option>
                                <option>4:3</option>
                                <option>1:1</option>
                                <option>3:4</option>
                                <option>9:16</option>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className='text-sm'>Calidad del video</p>
                              <Select change={(e: any) => setVideo({ ...video, size: e.target.value })} value={video.size}>
                                <option>720p</option>
                                <option>1080p</option>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className='text-sm'>Duración del video</p>
                              <Select change={(e: any) => setVideo({ ...video, size: e.target.value })} value={video.size}>
                                <option>5</option>
                                {
                                  video.quality === '720p'
                                    ? <option>8</option>
                                    : ''
                                }
                              </Select>
                            </div>
                            {
                              error !== ''
                                ? <p className="w-fit p-2 bg-red-500 text-white">{error}</p>
                                : ''
                            }
                            <ButtonAI click={handleSubmitVideo} text={'Generar video con IA'} loading={loadingVideo} />
                          </div>
                          <div className="flex flex-col gap-4 w-full sm:w-1/2">
                            {videoIA && (
                              <>
                                <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                                  <iframe
                                    src={videoIA}
                                    loading="lazy"
                                    onLoad={() => setIsLoaded(true)}
                                    style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                                    allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
                                    allowFullScreen
                                  />
                                </div>
                                <Button
                                  action={async () => {
                                    try {
                                      const parts = videoIA.split('/')
                                      const guid = parts[parts.length - 1]
                                      const videoUrl = `https://vz-58c97fb8-099.b-cdn.net/${guid}/play_720p.mp4`;
                                      const response = await fetch(videoUrl, {
                                        mode: 'cors',
                                        headers: {
                                          'Referer': 'https://iframe.mediadelivery.net/',
                                        }
                                      });
                                      if (!response.ok) throw new Error('No se pudo obtener el video');
                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = 'video.mp4';
                                      document.body.appendChild(a);
                                      a.click();
                                      a.remove();
                                      window.URL.revokeObjectURL(url);
                                    } catch (error) {
                                      console.error('Error descargando el video:', error);
                                      alert('No se pudo descargar el video.');
                                    }
                                  }}
                                >
                                  Descargar video
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )
                    : ''
              : <p>Selecciona el tipo de contenido que quieres generar</p>
          }
        </div>
      </div>
    </>
  )
}