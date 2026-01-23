import type { ButtonColor, LayoutType } from '@/sharedComponents/Button3D/Button3D.styles'
import type { ReactNode } from 'react'
import { Card3DContent, Card3DDepth, Card3DViewContainer } from './Card3DView.styles'

export type Card3DVariant = 'filled' | 'outlined'

export interface Card3DCustomStyles {
  width?: number
  height?: number
  backgroundColor?: string
  depthColor?: string
  borderWidth?: number
  borderColor?: string
}

interface Card3DViewProps {
  color?: ButtonColor
  variant?: Card3DVariant
  size?: number
  layoutType?: LayoutType
  fullWidth?: boolean
  customStyles?: Card3DCustomStyles
  children: ReactNode
}

export const Card3DView = ({
  color,
  variant = 'filled',
  size,
  layoutType,
  fullWidth,
  customStyles,
  children
}: Card3DViewProps) => {
  return (
    <Card3DViewContainer>
      <Card3DDepth 
        color={color} 
        variant={variant}
        size={size} 
        fullWidth={fullWidth}
        customStyles={customStyles}
      />
      <Card3DContent 
        color={color} 
        variant={variant}
        size={size} 
        layoutType={layoutType} 
        fullWidth={fullWidth}
        customStyles={customStyles}
      >
        {children}
      </Card3DContent>
    </Card3DViewContainer>
  )
}
