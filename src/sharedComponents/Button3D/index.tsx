import { Card3DView, type Card3DCustomStyles } from '@/sharedComponents/Card3DView'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button3DContainer, ButtonColor, LayoutType } from './Button3D.styles'

interface Button3DProps {
  onPress: () => void
  disabled?: boolean
  testID?: string
  color?: ButtonColor
  layoutType?: LayoutType
  fullWidth?: boolean
  customStyles?: Card3DCustomStyles
  children: (props: { color: ButtonColor, isPressed: boolean }) => ReactNode
}

export const Button3D = ({
  onPress,
  disabled = false,
  testID,
  color = 'blue',
  layoutType,
  fullWidth,
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
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Card3DView color={color} layoutType={layoutType} fullWidth={fullWidth} customStyles={customStyles}>
        {children({ color, isPressed })}
      </Card3DView>
    </Button3DContainer>
  )
}
