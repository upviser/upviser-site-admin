import React from 'react'
import { Card, Select } from '../ui'

interface Props {
    codeInfo: any
    setCodeInfo: any
}

export const State: React.FC<Props> = ({ codeInfo, setCodeInfo }) => {
  return (
    <Card title='Estado del cupon'>
      <Select value={codeInfo.state ? 'Activo' : 'Desactivado'} change={(e: any) => setCodeInfo({...codeInfo, state: e.target.value === 'Activo' ? true : false})}>
        <option>Activo</option>
        <option>Desactivado</option>
      </Select>
    </Card>
  )
}
