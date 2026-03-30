import type { ReactNode } from 'react'
import { useState } from 'react'

import {
  Depth3DContainer,
  Depth3DContent,
  Depth3DDepth,
  type Depth3DColor,
  type Depth3DSizeVariant,
  type Depth3DCustomStyles,
  type LayoutType
} from './Depth3D.styles'

export type {
  Depth3DColor,
  Depth3DSizeVariant,
  Depth3DCustomStyles,
  LayoutType
} from './Depth3D.styles'

interface Depth3DProps {
  onPress: () => void
  disabled?: boolean
  testID?: string
  color?: Depth3DColor
  layoutType?: LayoutType
  sizeVariant?: Depth3DSizeVariant
  gridColumns?: number
  fullWidth?: boolean
  width?: number
  height?: number
  customStyles?: Depth3DCustomStyles
  children: (props: { color: Depth3DColor; isPressed: boolean }) => ReactNode
}

export const Depth3D = ({
  onPress,
  disabled = false,
  testID,
  color = 'blue',
  layoutType,
  sizeVariant = 'auto',
  gridColumns,
  fullWidth,
  width,
  height,
  customStyles,
  children
}: Depth3DProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    if (!disabled) setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePress = () => {
    if (!disabled) onPress()
  }

  return (
    <Depth3DContainer
      testID={testID}
      isPressed={isPressed}
      layoutType={layoutType}
      sizeVariant={sizeVariant}
      gridColumns={gridColumns}
      fullWidth={fullWidth}
      width={width}
      height={height}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Depth3DDepth color={color} customStyles={customStyles} />
      <Depth3DContent
        color={color}
        layoutType={layoutType}
        sizeVariant={sizeVariant}
        customStyles={customStyles}
        isPressed={isPressed}
        fullWidth={fullWidth}
        height={height}
      >
        {children({ color, isPressed })}
      </Depth3DContent>
    </Depth3DContainer>
  )
}
