import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from 'react-icons/ci'
import { Button2, Card, Input, Select } from '../ui'
import Image from 'next/image'

interface Props {
  information: IProduct,
  setInformation: any
}

export const StockVariations: React.FC<Props> = ({information, setInformation}) => {

  const [indexImage, setIndexImage] = useState(-1)
  const [variations, setVariations] = useState('rotate-90')
  const [loadingImage, setLoadingImage] = useState(false)
  const [errorImage, setErrorImage] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const onDrop = async (e: any) => {
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
        const img = data
        setInformation((prev: any) => {
          const newVariation = {...prev.variations}
          newVariation.variations[indexImage].image = img
          return {...prev, variations: newVariation}
        })
        setLoadingImage(false)
      } catch (error) {
        setLoadingImage(false)
        setErrorImage('Ha ocurrido un error al subir la imagen, intentalo nuevamente.')
      }
    }
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Card title='Inventario'>
      <div>
        <div className='flex gap-2'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Stock</p>
            <Input type='number' placeholder='Stock' name='stock' change={inputChange} value={information.stock} />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>SKU</p>
            <Input placeholder='SKU' name='sku' change={inputChange} value={information.sku} />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <button onClick={(e: any) => {
          e.preventDefault()
          if (variations === 'rotate-90') {
            setVariations('-rotate-90')
          } else {
            setVariations('rotate-90')
          }
        }} className='flex gap-3 w-fit'>
          <h2 className='font-medium text-[15px]'>Variaciones</h2>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`${variations} transition-all duration-150 my-auto text-lg w-4 text-neutral-500`} xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
        </button>
        <div className={`${variations === 'rotate-90' ? 'hidden' : 'flex'} flex-col gap-4`}>
          <div className='flex gap-2'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Ingresa el nombre de la variación</p>
              <Input change={(e: any) => {
                let mod = information.variations
                mod!.nameVariation = e.target.value
                setInformation({ ...information, variations: mod })
              }} placeholder='Color' value={information.variations?.nameVariation} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Formato</p>
              <Select change={(e: any) => {
                let mod = information.variations
                mod!.formatVariation = e.target.value
                setInformation({ ...information, variations: mod })
              }} value={information.variations?.formatVariation}>
                <option>Imagen</option>
                <option>Color</option>
                <option>Texto</option>
              </Select>
            </div>
          </div>
          {
            information.variations?.nameVariation !== ''
              ? (
                <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                  {
                    information.variations?.nameVariations.map((variation, i) => (
                      <div key={i} className='flex gap-2'>
                        <div className='flex flex-col gap-2 w-96'>
                          <p className='text-sm'>{information.variations?.nameVariation} {i + 1}</p>
                          <Input placeholder='Manga corta' value={variation.variation} change={(e: any) => {
                            let mod = information.variations
                            mod!.nameVariations[i].variation = e.target.value
                            setInformation({ ...information, variations: mod })
                          }} />
                        </div>
                        {
                          information.variations?.formatVariation === 'Color'
                            ? (
                              <div className='flex flex-col gap-2'>
                                <p>Color</p>
                                <Input type='color' value={variation.colorVariation} change={(e: any) => {
                                  let mod = information.variations
                                  mod!.nameVariations[i].colorVariation = e.target.value
                                  setInformation({ ...information, variations: mod })
                                }} />
                              </div>
                            )
                            : ''
                        }
                      </div>
                    ))
                  }
                  <Button2 action={(e: any) => {
                    e.preventDefault()
                    const info = {...information}
                    info.variations?.nameVariations.push({ variation: '', colorVariation: '#000000' })
                    setInformation(info)
                  }}>Agregar variación</Button2>
                </div>
              )
              : ''
          }
          {
            information.variations?.nameSubVariation !== undefined
              ? (
                <>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Ingresa el nombre de la subvariación</p>
                      <Input change={(e: any) => {
                        let mod = information.variations
                        mod!.nameSubVariation = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} placeholder='Talla' value={information.variations.nameSubVariation} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Formato</p>
                      <Select change={(e: any) => {
                        let mod = information.variations
                        mod!.formatSubVariation = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} value={information.variations.formatSubVariation}>
                        <option>Imagen</option>
                        <option>Color</option>
                        <option>Texto</option>
                      </Select>
                    </div>
                  </div>
                  {
                    information.variations?.nameSubVariation !== ''
                      ? (
                        <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                          {
                            information.variations?.nameSubVariations?.map((variation, i) => (
                              <div key={i} className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                  <p className='text-sm'>{information.variations?.nameSubVariation} {i + 1}</p>
                                  <Input placeholder='Manga corta' value={variation.subVariation} change={(e: any) => {
                                    let mod = information.variations
                                    mod!.nameSubVariations![i].subVariation = e.target.value
                                    setInformation({ ...information, variations: mod })
                                  }} />
                                </div>
                                {
                                  information.variations?.formatSubVariation === 'Color'
                                    ? (
                                      <div className='flex flex-col gap-2'>
                                        <p>Color</p>
                                        <Input type='color' change={(e: any) => {
                                          let mod = information.variations
                                          mod!.nameSubVariations![i].colorSubVariation = e.target.value
                                          setInformation({ ...information, variations: mod })
                                        }} value={variation.colorSubVariation} />
                                      </div>
                                    )
                                    : ''
                                }
                              </div>
                            ))
                          }
                          <Button2 action={(e: any) => {
                            e.preventDefault()
                            const info = {...information}
                            info.variations?.nameSubVariations!.push({ subVariation: '', colorSubVariation: '#000000' })
                            setInformation(info)
                          }}>Agregar variación</Button2>
                        </div>
                      )
                      : ''
                  }
                  {
                    information.variations?.nameSubVariation2 === '' || information.variations?.nameSubVariation2
                      ? ''
                      : (
                        <Button2 action={(e: any) => {
                          e.preventDefault()
                          let mod = information.variations
                          mod!.nameSubVariations2 = [{ subVariation2: '', colorSubVariation2: '#000000' }]
                          mod!.nameSubVariation2 = ''
                          setInformation({ ...information, variations: mod })
                        }}>Crear segunda subvariación</Button2>
                      )
                  }
                </>
              )
              : (
                <Button2 action={(e: any) => {
                  e.preventDefault()
                  let mod = information.variations
                  mod!.nameSubVariations = [{ subVariation: '', colorSubVariation: '#000000' }]
                  mod!.nameSubVariation = ''
                  setInformation({ ...information, variations: mod })
                }}>Crear subvariación</Button2>
              )
          }
          {
            information.variations?.nameSubVariation2 !== undefined
              ? (
                <>
                  <div className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Ingresa el nombre de la segunda subvariación</p>
                      <Input change={(e: any) => {
                        let mod = information.variations
                        mod!.nameSubVariation2 = e.target.value
                        setInformation({ ...information, variations: mod })
                      }} placeholder='Modelo' value={information.variations.nameSubVariation2} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Formato</p>
                      <Select value={information.variations.formatSubVariation2} change={(e: any) => {
                        let mod = information.variations
                        mod!.formatSubVariation2 = e.target.value
                        setInformation({ ...information, variations: mod })
                      }}>
                        <option>Imagen</option>
                        <option>Color</option>
                        <option>Texto</option>
                      </Select>
                    </div>
                  </div>
                  {
                    information.variations?.nameSubVariation2 !== ''
                      ? (
                        <div className='flex flex-col gap-4 p-4 rounded bg-gray-50 dark:bg-neutral-700'>
                          {
                            information.variations?.nameSubVariations2?.map((variation, i) => (
                              <div key={i} className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                  <p className='text-sm'>{information.variations?.nameSubVariation2} {i + 1}</p>
                                  <Input placeholder='Manga corta' value={variation.subVariation2} change={(e: any) => {
                                    let mod = information.variations
                                    mod!.nameSubVariations2![i].subVariation2 = e.target.value
                                    setInformation({ ...information, variations: mod })
                                  }} />
                                </div>
                                {
                                  information.variations?.formatSubVariation2 === 'Color'
                                    ? (
                                      <div className='flex flex-col gap-2'>
                                        <p>Color</p>
                                        <Input type='color' value={variation.colorSubVariation2} change={(e: any) => {
                                          let mod = information.variations
                                          mod!.nameSubVariations2![i].colorSubVariation2 = e.target.value
                                          setInformation({ ...information, variations: mod })
                                        }} />
                                      </div>
                                    )
                                    : ''
                                }
                              </div>
                            ))
                          }
                          <Button2 action={(e: any) => {
                            e.preventDefault()
                            const info = {...information}
                            info.variations?.nameSubVariations2!.push({ subVariation2: '', colorSubVariation2: '#000000' })
                            setInformation(info)
                          }}>Agregar variación</Button2>
                        </div>
                      )
                      : ''
                  }
                </>
              )
              : ''
          }
          <Button2 action={(e: any) => {
            e.preventDefault()
            let generatedVariations: any = []
            if (information.variations!.nameVariations?.length && information.variations!.nameVariations[0].variation !== '') {
              information.variations!.nameVariations.forEach(nameVariation => {
                if (information.variations!.nameSubVariations?.length && information.variations!.nameSubVariations[0].subVariation !== '') {
                  information.variations!.nameSubVariations.forEach(nameSubVariation => {
                    if (information.variations!.nameSubVariations2?.length && information.variations!.nameSubVariations2[0].subVariation2 !== '') {
                      information.variations!.nameSubVariations2?.forEach(nameSubVariation2 => {
                        const variation = {
                          variation: nameVariation.variation,
                          subVariation: nameSubVariation.subVariation,
                          subVariation2: nameSubVariation2.subVariation2,
                          stock: 0
                        }
                        generatedVariations.push(variation)
                      })
                    } else {
                      const variation = {
                        variation: nameVariation.variation,
                        subVariation: nameSubVariation.subVariation,
                        stock: 0
                      };
                      generatedVariations.push(variation)
                    }
                  })
                } else {
                  const variation = {
                    variation: nameVariation.variation,
                    stock: 0
                  }
                  generatedVariations.push(variation)
                }
              })
            } else if (information.variations!.nameVariations?.length) {
              information.variations!.nameVariations.forEach(nameVariation => {
                if (information.variations!.nameSubVariations?.length) {
                  information.variations!.nameSubVariations.forEach(nameSubVariation => {
                    const variation = {
                      variation: nameVariation.variation,
                      subVariation: nameSubVariation.subVariation,
                      stock: 0
                    }
                    generatedVariations.push(variation)
                  })
                } else {
                  const variation = {
                    variation: nameVariation.variation,
                    stock: 0
                  }
                  generatedVariations.push(variation)
                }
              })
            } else if (information.variations!.nameVariations.length > 0) {
              information.variations!.nameVariations.forEach(nameVariation => {
                const variation = {
                  variation: nameVariation.variation,
                  stock: 0
                }
                generatedVariations.push(variation)
              })
            }
            setInformation({ ...information, variations: { ...information.variations, variations: generatedVariations } })
          }}>Crear variantes</Button2>
          {
            information.variations?.nameVariation !== '' && information.variations?.variations.length
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <p className='text-sm w-20'>Imagen</p>
                    <p className='text-sm w-32'>Variación</p>
                    {
                      information.variations?.nameSubVariation !== undefined
                        ? <p className='text-sm w-32'>Subvariación</p>  
                        : ''
                    }
                    {
                      information.variations?.nameSubVariation2 !== undefined
                        ? <p className='text-sm w-32'>Subvariación 2</p>  
                        : ''
                    }
                    <p className='text-sm w-20'>Stock</p>
                    <p className='text-sm'>SKU</p>
                  </div>
                  {
                    information.variations?.variations?.length
                      ? information.variations?.variations.map((variation, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                          <div className='flex gap-2'>
                            {

                            }
                            <div {...getRootProps()} className={`flex w-20 h-20 transition-colors duration-200 border rounded-lg cursor-pointer ${isDragActive ? 'bg-neutral-100' : 'bg-white'} hover:bg-neutral-100 dark:bg-neutral-700 dark:border-neutral-600 dark:hover:bg-neutral-600`}>
                              <div onDragEnter={() => setIndexImage(index)} onMouseMove={() => setIndexImage(index)} onClick={() => setIndexImage(index)} className='w-20 h-20 flex'>
                                <input {...getInputProps()} />
                                {
                                  variation.image && variation.image !== ''
                                    ? <Image src={variation.image} alt={variation.image} width={100} height={100} className='w-16 h-16 m-auto' />
                                    : <CiImageOn className='text-3xl m-auto text-neutral-400' />
                                }
                              </div>
                            </div>
                            <p className='my-auto text-sm w-32'>{variation.variation}</p>
                            {
                              information.variations?.nameSubVariation !== undefined
                                ? (
                                  <p className='my-auto text-sm w-32'>{variation.subVariation}</p>
                                )
                                : ''
                            }
                            {
                              information.variations?.nameSubVariation2 !== undefined
                                ? (
                                  <p className='my-auto text-sm w-32'>{variation.subVariation2}</p>
                                )
                                : ''
                            }
                            <Input type='number' placeholder='Stock' change={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].stock = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.stock} config='w-20' />
                            <Input placeholder='SKU' name='sku' change={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].sku = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.sku} config='w-32' />
                          </div>
                        </div>
                      ))
                      : ''
                  }
                </div>
              )
              : ''
          }
        </div>
      </div>
    </Card>
  )
}
