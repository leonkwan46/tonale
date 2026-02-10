import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button3DContainer, Button3DContent, Button3DDepth, type Button3DCustomStyles, type ButtonColor, type LayoutType } from './Button3D.styles'

interface Button3DProps {
  onPress: () => void
  disabled?: boolean
  testID?: string
  color?: ButtonColor
  layoutType?: LayoutType
  fullWidth?: boolean
  width?: number
  height?: number
  customStyles?: Button3DCustomStyles
  children: (props: { color: ButtonColor, isPressed: boolean }) => ReactNode
}

export const Button3D = ({
  onPress,
  disabled = false,
  testID,
  color = 'blue',
  layoutType,
  fullWidth,
  width,
  height,
  customStyles,
  children
}: Button3DProps) => {
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
    <Button3DContainer
      testID={testID}
      isPressed={isPressed}
      layoutType={layoutType}
      fullWidth={fullWidth}
      width={width}
      height={height}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Button3DDepth
        color={color}
        customStyles={customStyles}
      />
      <Button3DContent
        color={color}
        layoutType={layoutType}
        fullWidth={fullWidth}
        height={height}
        customStyles={customStyles}
        isPressed={isPressed}
      >
        {children({ color, isPressed })}
      </Button3DContent>
    </Button3DContainer>
  )
}
