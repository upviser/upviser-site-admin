import React from 'react'
import { Card, Select } from '../ui'

interface Props {
    setContentData: any
    contentData: any
}

export const Visibility: React.FC<Props> = ({ setContentData, contentData }) => {
  return (
    <Card title='Visibilidad del post'>
      <Select change={(e: any) => {
        setContentData({...contentData, state: e.target.value === 'Activo' ? true : false})
      }} value={contentData.state ? 'Activo' : 'En borrador'}>
        <option>Activo</option>
        <option>En borrador</option>
      </Select>
    </Card>
  )
}
