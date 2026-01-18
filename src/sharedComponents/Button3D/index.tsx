import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button3DContainer, Button3DContent, Button3DDepth, ButtonState, LayoutType } from './Button3D.styles'

interface Button3DProps {
  onPress: () => void
  disabled?: boolean
  testID?: string
  buttonState: ButtonState
  layoutType?: LayoutType
  fullWidth?: boolean
  children: (props: { buttonState: ButtonState, isPressed: boolean }) => ReactNode
}

export const Button3D = ({
  onPress,
  disabled = false,
  testID,
  buttonState,
  layoutType,
  fullWidth,
  children
}: Button3DProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePress = () => {
    if (!disabled) {
      onPress()
    }
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
      <Button3DDepth buttonState={buttonState} />
      <Button3DContent buttonState={buttonState} layoutType={layoutType} fullWidth={fullWidth}>
        {children({ buttonState, isPressed })}
      </Button3DContent>
    </Button3DContainer>
  )
}
