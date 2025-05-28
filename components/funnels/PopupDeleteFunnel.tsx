import { IFunnel } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { ButtonRedSubmit, Popup } from '../ui'

interface Props {
    popupDelete: { view: string, opacity: string, mouse: boolean }
    setPopupDelete: any
    setSelectFunnel: any
    selectFunnel: IFunnel
    getFunnels: any
}

export const PopupDeleteFunnel: React.FC<Props> = ({ popupDelete, setPopupDelete, setSelectFunnel, selectFunnel, getFunnels }) => {

  const [loadingDelete, setLoadingDelete] = useState(false)

  return (
    <Popup popup={popupDelete} setPopup={setPopupDelete}>
      <p>Estas seguro que deseas eliminar el embudo: <span className="font-medium">{selectFunnel?.funnel}</span>?</p>
      <div className="flex gap-6">
        <ButtonRedSubmit action={async (e: any) => {
          e.preventDefault()
          if (!loadingDelete) {
            setLoadingDelete(true)
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/funnel/${selectFunnel?._id}`)
            setSelectFunnel(undefined)
            getFunnels()
            setTimeout(() => {
              setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
              setLoadingDelete(false)
            }, 200)
          }
        }} submitLoading={loadingDelete} textButton='Eliminar embudo' config='w-44' />
        <button onClick={(e: any) => {
          e.preventDefault()
          setPopupDelete({ ...popupDelete, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopupDelete({ ...popupDelete, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }} className="my-auto text-sm">Cancelar</button>
      </div>
    </Popup>
  )
}
