import type { DimensionValue } from 'react-native'
import type { ReactNode } from 'react'
import { CardContent, CardDepth, CardContainer, type CardColor, type CardVariant } from './Card.styles'

export type { CardVariant }

interface CardProps {
  color?: CardColor
  variant?: CardVariant
  size?: number
  enable3D?: boolean
  width?: DimensionValue
  height?: DimensionValue
  backgroundColor?: string
  depthColor?: string
  borderWidth?: number
  borderColor?: string
  children: ReactNode
}

export const Card = ({
  color,
  variant = 'filled',
  size,
  enable3D = false,
  width,
  height,
  backgroundColor,
  depthColor,
  borderWidth,
  borderColor,
  children
}: CardProps) => {
  const customStyles = (width && height) || backgroundColor || depthColor || borderWidth !== undefined || borderColor
    ? { width, height, backgroundColor, depthColor, borderWidth, borderColor }
    : undefined

  return (
    <CardContainer>
      {enable3D && (
        <CardDepth 
          color={color} 
          variant={variant}
          size={size} 
          customStyles={customStyles}
        />
      )}
      <CardContent 
        color={color} 
        variant={variant}
        size={size} 
        customStyles={customStyles}
      >
        {children}
      </CardContent>
    </CardContainer>
  )
}
