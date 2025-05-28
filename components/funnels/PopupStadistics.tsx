import { IClient, IFunnel } from '@/interfaces'
import React from 'react'

interface Props {
    popup: any
    setPopup: any
    clients: IClient[]
    funnel?: IFunnel
}

export const PopupStadistics: React.FC<Props> = ({ popup, setPopup, clients, funnel }) => {

  return (
    <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} transition-opacity duration-200 fixed w-full h-full bg-black/30 flex top-0 left-0 z-50 p-4`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} onMouseMove={() => setPopup({ ...popup, mouse: true })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 w-full max-w-[700px] max-h-[600px] overflow-y-auto p-5 rounded-xl flex flex-col gap-4 m-auto border bg-white shadow-popup dark:shadow-popup-dark dark:bg-neutral-800 dark:border-neutral-700`}>
          <p className="text-lg font-medium">Estadisticas</p>
          <p className='font-medium'>Tasa de conversion</p>
          <div className={`overflow-y-auto flex gap-4`}>
            {
              funnel?.steps.map((step, index, steps) => (
                <div key={step._id} className='flex flex-col gap-2 justify-between min-w-28 w-full'>
                  <p className='text-center my-auto'>{step.step}</p>
                  <p className='text-2xl font-medium mx-auto text-center'>
                    {
                      clients.filter(client => 
                        client.funnels?.some(funnel => 
                          funnel.funnel === funnel.funnel && 
                          steps.findIndex(s => s._id === funnel.step) >= index
                        )
                      ).length
                    }
                  </p>
                  <p className="text-center text-lg font-medium">
                    {
                      (() => {
                        // Clientes en el último paso del embudo
                        const clientsInLastStep = clients.filter(client => 
                          client.funnels?.some(funn => 
                            funn.funnel === funnel._id && 
                            funn.step === steps.slice(-1)[0]._id
                          )
                        ).length;

                        // Clientes en el paso actual o posterior
                        const clientsInCurrentOrLaterStep = clients.filter(client => 
                          client.funnels?.some(funn => 
                            funn.funnel === funnel._id && 
                            steps.findIndex(s => s._id === funn.step) >= index
                          )
                        ).length;

                        // Si no hay clientes en el último paso, mostrar '0%'
                        if (clientsInLastStep === 0) {
                          return '0%';
                        }

                        // Calcular el porcentaje
                        const percentage = (clientsInCurrentOrLaterStep / clientsInLastStep) * 100;
                        return `${percentage.toFixed(2)}%`; // Mostrar con 2 decimales
                      })()
                    }
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
  )
}
