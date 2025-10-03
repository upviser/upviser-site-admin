import React, { ChangeEvent } from 'react'
import { Input, Select, Textarea } from '../ui'
import { ICall, IClientTag, IForm, IFunnel, IService } from '@/interfaces'

interface Props {
    setAutomatization: any
    automatization: any
    clientTags: IClientTag[]
    forms: IForm[]
    calls: ICall[]
    services: IService[]
    funnels: IFunnel[]
}

export const Segment: React.FC<Props> = ({ setAutomatization, automatization, clientTags, forms, calls, services, funnels }) => {
  return (
    <div className='w-full max-w-[500px] p-5 flex flex-col gap-4 bg-white m-auto rounded-xl border border-black/5 dark:bg-neutral-800 dark:border-neutral-700' style={{ boxShadow: '0px 3px 10px 3px #11111108' }}>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Selecciona cual será la acción que inicie la automatización</p>
        <Select change={(e: any) => setAutomatization({ ...automatization, startType: e.target.value })} value={automatization.startType}>
          <option>Seleccionar acción</option>
          <option>Formulario completado</option>
          <option>Llamada agendada</option>
          <option>Ingreso a un servicio</option>
          <option>Añadido a una etapa de un embudo</option>
          <option>Añadido a una etapa de un servicio</option>
          <option>Tag añadido</option>
          <option>Comentario en post de Instagram</option>
        </Select>
      </div>
      {
        automatization.startType === 'Comentario en post de Instagram'
          ? (
            <>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Que palabra o frase activara la automatización</p>
                <Input change={(e: any) => setAutomatization({ ...automatization, text: e.target.value })} value={automatization.text} placeholder='Palabra o frase' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Describe como sera la respuesta del comentario para que se genere con IA</p>
                <Textarea change={(e: any) => setAutomatization({ ...automatization, replyPromt: e.target.value })} value={automatization.replyPromt} placeholder='Ej: Al usuario se le enviara un ebook de como hacer panqueques, genera una respuesta corta de que ya se le envio por DM' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Mensaje al DM</p>
                <Textarea change={(e: any) => setAutomatization({ ...automatization, message: e.target.value })} value={automatization.message} placeholder='Mensaje' />
              </div>
            </>
          )
          : (
            <>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Selecciona {automatization.startType === 'Formulario completado' ? 'un formulario' : automatization.startType === 'Llamada agendada' ? 'una llamada' : automatization.startType === 'Ingreso a un servicio' ? 'un servicio' : automatization.startType === 'Añadido a una etapa de un embudo' ? 'un embudo y su etapa' : automatization.startType === 'Añadido a una etapa de un servicio' ? 'un servicio y su etapa' : ''}</p>
                <Select change={(e: ChangeEvent<HTMLSelectElement>) => setAutomatization({ ...automatization, startValue: e.target.value })} value={automatization.startValue}>
                  <option>Selecciona {automatization.startType === 'Formulario completado' ? 'un formulario' : automatization.startType === 'Llamada agendada' ? 'una llamada' : automatization.startType === 'Ingreso a un servicio' ? 'un servicio' : automatization.startType === 'Añadido a una etapa de un embudo' ? 'un embudo y su etapa' : automatization.startType === 'Añadido a una etapa de un servicio' ? 'un servicio y su etapa' : ''}</option>
                  {
                    automatization.startType === 'Formulario completado'
                      ? forms.map(form => (
                        <option key={form._id} value={form._id}>{form.nameForm}</option>
                      ))
                      : ''
                  }
                  {
                    automatization.startType === 'Llamada agendada'
                      ? calls.map(call => (
                        <option key={call._id} value={call._id}>{call.nameMeeting}</option>
                      ))
                      : ''
                  }
                  {
                    automatization.startType === 'Ingreso a un servicio'
                      ? services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                      ))
                      : ''
                  }
                  {
                    automatization.startType === 'Añadido a una etapa de un embudo'
                      ? funnels.map(funnel => funnel.steps.map(step => (
                        <option key={step._id} value={step._id}>{funnel.funnel} / {step.step}</option>
                      )))
                      : ''
                  }
                  {
                    automatization.startType === 'Añadido a una etapa de un servicio'
                      ? services.map(service => service.steps.map(step => (
                        <option key={step._id} value={step._id}>{service.name} / {step.step}</option>
                      )))
                      : ''
                  }
                  {
                    automatization.startType === 'Tag añadido'
                      ? clientTags.map(tag => (
                        <option key={tag._id}>{tag.tag}</option>
                      ))
                      : ''
                  }
                </Select>
              </div>
              {
                automatization.startType === 'Añadido a una etapa de un embudo' || automatization.startType === 'Añadido a una etapa de un servicio'
                  ? <p className='text-sm text-black/80 dark:text-white/80'>* Cuando el usuario cambie de etapa se detendra la automatización</p>
                  : ''
              }
            </>
          )
      }
    </div>
  )
}
