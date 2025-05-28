import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Button2, Input, Select, Spinner2, Textarea } from '../ui'
import { IoMdClose } from 'react-icons/io'
import { IFunnel, IService } from '@/interfaces'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { useSession } from 'next-auth/react'

interface Props {
    popup: { view: string, opacity: string, mouse: boolean }
    setPopup: any
    getFunnels: any
    newFunnel: IFunnel
    setNewFunnel: any
    selectFunnel: IFunnel
    title: string
    error: string
    setError: any
    services: IService[]
    funnels: IFunnel[]
}

export const PopupNewFunnel: React.FC<Props> = ({ popup, setPopup, getFunnels, newFunnel, setNewFunnel, selectFunnel, title, error, setError, services, funnels }) => {

  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  const popupRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && popup.view === 'flex') {
        setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
        setTimeout(() => {
          setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
        }, 200)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popup, setPopup]);

  return (
    <div className={`${popup.view} ${popup.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50 p-4`}>
        <form ref={popupRef} onSubmit={async (e: any) => {
          e.preventDefault()
          if (!loading) {
            setLoading(true)
            setError('')
            if (title === 'Nuevo embudo') {
              if (newFunnel.funnel !== '' && newFunnel.steps[0].step !== '' && newFunnel.steps[0].slug !== '') {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/funnel`, newFunnel)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                getFunnels()
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  setLoading(false)
                }, 200)
                setNewFunnel({ funnel: '', slug: '', steps: [{ step: '', sendEmail: false, slug: '', email: { subject: '', title: '', text: '', linkButton: '', textButton: '' } }], description: '' })
              } else {
                setError('Debes ingresar todos los datos necesarios')
                setLoading(false)
              }
            } else {
              if (newFunnel.funnel !== '' && newFunnel.steps[0].step !== '' && newFunnel.steps[0].slug !== '') {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${selectFunnel?._id}`, newFunnel)
                setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                getFunnels()
                setTimeout(() => {
                  setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
                  setLoading(false)
                }, 200)
                setNewFunnel({ funnel: '', slug: '', steps: [{ step: '', slug: '', sendEmail: false, email: { subject: '', title: '', text: '', linkButton: '', textButton: '' } }], description: '' })
              } else {
                setError('Debes ingresar todos los datos necesarios')
                setLoading(false)
              }
            }
          }
        }} onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} className={`${popup.opacity === 'opacity-0' ? 'scale-90' : 'scale-100'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-6 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          {
            error !== ''
              ? <p className='px-2 py-1 bg-red-500 text-white w-fit'>{error}</p>
              : ''
          }
          <p className="text-lg font-medium">{title}</p>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Embudo</p>
            <Input change={(e: any) => setNewFunnel({ ...newFunnel, funnel: e.target.value })} placeholder='Embudo' value={newFunnel.funnel} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Descripción</p>
            <Textarea change={(e: any) => setNewFunnel({ ...newFunnel, description: e.target.value })} placeholder='Descripción' value={newFunnel.description!} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">A que servicio pertenece</p>
            <Select change={(e: any) => setNewFunnel({ ...newFunnel, service: e.target.value })} value={newFunnel.service}>
              <option>Seleccionar servicio</option>
              {
                services.map(service => (
                  <option key={service._id} value={service._id}>{service.name}</option>
                ))
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Pasos</p>
            {
              newFunnel.steps.map((step, i) => (
                <>
                  <p className='text-sm'>Paso {i + 1}</p>
                  <div className="flex gap-4">
                    <Input change={(e: any) => {
                      const oldSteps = [...newFunnel.steps]
                      oldSteps[i].step = e.target.value
                      setNewFunnel({ ...newFunnel, steps: oldSteps })
                    }} placeholder={`Paso ${i + 1}`} value={step.step} />
                    <Input change={(e: any) => {
                      const oldSteps = [...newFunnel.steps]
                      oldSteps[i].slug = e.target.value
                      setNewFunnel({ ...newFunnel, steps: oldSteps })
                    }} placeholder={`Slug paso ${i + 1}`} value={step.slug} />
                    <div className="flex gap-3">
                      <button onClick={(e: any) => {
                        e.preventDefault();
                        if (i < newFunnel.steps.length - 1) {
                          const updatedSteps = [...newFunnel.steps];
                          const temp = updatedSteps[i];
                          updatedSteps[i] = updatedSteps[i + 1];
                          updatedSteps[i + 1] = temp;
                          setNewFunnel({ ...newFunnel, steps: updatedSteps });
                        }
                      }}><SlArrowDown className="text-2xl" /></button>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        if (i > 0) {
                          const updatedSteps = [...newFunnel.steps];
                          const temp = updatedSteps[i];
                          updatedSteps[i] = updatedSteps[i - 1];
                          updatedSteps[i - 1] = temp;
                          setNewFunnel({ ...newFunnel, steps: updatedSteps });
                        }
                      }}><SlArrowUp className="text-2xl" /></button>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        const updatedSteps = [...newFunnel.steps]
                        updatedSteps.splice(i, 1)
                        setNewFunnel({ ...newFunnel, steps: updatedSteps })
                      }}><IoMdClose className="text-2xl" /></button>
                    </div>
                  </div>
                </>
              ))
            }
            <Button2 action={(e: any) => {
              e.preventDefault()
              const oldSteps = [...newFunnel.steps]
              oldSteps.push({ step: '', slug: '' })
              setNewFunnel({ ...newFunnel, steps: oldSteps })
            }}>Nuevo paso</Button2>
          </div>
          <Button type='submit' loading={loading} config='w-full min-h-10'>{title === 'Nuevo embudo' ? 'Crear' : 'Editar'} embudo</Button>
        </form>
      </div>
  )
}
