import { IDesign } from '@/interfaces'
import React from 'react'

interface Props {
    style?: any,
    text?: string
    config?: string
    design: IDesign
}

export const ButtonDesign2: React.FC<Props> = ({ style, text, config, design }) => {
  return (
    <button className={`${config} w-fit px-6 h-10 border`} style={{ borderRadius: style?.form === 'Redondeadas' ? `${style?.borderButton}px` : '', border: `1px solid ${style.borderColor}` }}>{text}</button>
  )
}
