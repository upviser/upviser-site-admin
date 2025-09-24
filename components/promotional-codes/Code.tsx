import React from 'react'
import { Card, Input } from '../ui'

interface Props {
    codeInfo: any
    inputChange: any
}

export const Code: React.FC<Props> = ({ codeInfo, inputChange }) => {
  return (
    <Card title='Código promocional'>
      <Input placeholder='Código promocional' name='promotionalCode' change={inputChange} value={codeInfo.promotionalCode} />
    </Card>
  )
}
