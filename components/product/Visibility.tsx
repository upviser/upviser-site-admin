import { IProduct } from '@/interfaces'
import React from 'react'
import { Card, Select } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
}

export const Visibility: React.FC<Props> = ({ information, setInformation }) => {
  
  const selectChange = (e: any) => {
    setInformation({...information, state: e.target.value === 'Activo' ? true : false})
  }
  
  return (
    <Card title='Visibilidad del producto'>
      <Select change={selectChange} value={information.state ? 'Activo' : 'En borrador'}>
        <option>Activo</option>
        <option>En borrador</option>
      </Select>
    </Card>
  )
}
