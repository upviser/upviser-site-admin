import { IAutomatization, IEmailAutomatization } from '@/interfaces'
import React from 'react'
import { Button2, Input, Select } from '../ui'

interface Props {
    email: any
    index: any
    setAutomatization: any
    automatization: IAutomatization
    setTempEmail: any
    selectStep: any
    setSelectStep: any
    popupCondition: any
    setPopupCondition: any
}

export const Step: React.FC<Props> = ({ email, index, setAutomatization, automatization, setTempEmail, selectStep, setSelectStep, popupCondition, setPopupCondition }) => {

  const editEmail = (email: IEmailAutomatization, index: any, e: any) => {
    e.preventDefault()
    setTempEmail({ affair: email.affair, buttonText: email.buttonText, index: index, paragraph: email.paragraph, title: email.title, url: email.url })
  }

  return (
    <>
      <div className='h-[40px] w-[2px] bg-black/5 m-auto dark:bg-neutral-700' />
      <div className='w-full max-w-[500px] p-5 flex flex-col gap-2 bg-white m-auto rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
        <p className='text-sm'>Tiempo de espera</p>
        <div className='flex gap-2'>
          <Input change={(e: any) => {
            const data = automatization.automatization
            data[index].number = e.target.value
            setAutomatization({ ...automatization, automatization: data })
          }} value={automatization.automatization[index].number} placeholder='Tiempo' />
          <Select change={(e: any) => {
            const data = automatization.automatization
            data[index].time = e.target.value
            setAutomatization({ ...automatization, automatization: data })
          }} value={automatization.automatization[index].time}>
            <option>Días</option>
            <option>Horas</option>
            <option>Minutos</option>
          </Select>
        </div>
      </div>
      <div className='h-[40px] w-[2px] bg-black/5 m-auto dark:bg-neutral-700' />
      {
        email.condition?.length
          ? (
            <div className='p-5 rounded-xl border flex flex-col gap-2 border-black/5 w-96 m-auto bg-white dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
              <p className='font-medium text-sm'>Condiciones:</p>
              <p className='text-sm'>Que no tengan estos tags</p>
              <div className='flex gap-4 flex-wrap'>
                {
                  email.condition.map((cond: any) => (
                    <p key={cond} className='border border-border text-sm px-2 py-1 rounded-lg shadow-md dark:border-neutral-700'>{cond}</p>
                  ))
                }
              </div>
              <Button2 action={(e: any) => {
                e.preventDefault()
                setSelectStep(index)
                setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-0' })
                setTimeout(() => {
                  setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-1' })
                }, 10)
              }}>Editar condiciones</Button2>
            </div>
          )
          : (
            <Button2 config='m-auto' action={(e: any) => {
              e.preventDefault()
              setSelectStep(index)
              setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-0' })
              setTimeout(() => {
                setPopupCondition({ ...popupCondition, view: 'flex', opacity: 'opacity-1' })
              }, 10)
            }}>Agregar condición</Button2>
          )
      }
      <div className='h-[40px] w-[2px] bg-black/5 m-auto dark:bg-neutral-700' />
      <div key={email.affair} className='w-full max-w-[500px] p-5 flex flex-col gap-2 bg-white m-auto rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
        <p className='text-sm font-medium'>Envíar correo</p>
        <p className='text-sm'>Asunto: {email.affair}</p>
        <Button2 action={(e: any) => editEmail(email, index, e)}>Editar Correo</Button2>
      </div>
    </>
  )
}
