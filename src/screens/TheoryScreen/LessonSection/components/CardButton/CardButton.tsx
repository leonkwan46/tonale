import React from 'react'
import { BeamedQuaverLogo, LockLogo, StarLogo } from '../Logo'
import { NodeContainer, NodeContentContainer, NodeDepth, StarContainer } from './CardButton.styles'
import { useDevice } from '../../../../../hooks'

interface CardButtonProps {
  isLocked?: boolean
  isPressed?: boolean
  stars?: number
}

export const CardButton: React.FC<CardButtonProps> = ({ isLocked = false, isPressed = false, stars = 0 }) => {

  const { isTablet } = useDevice()

  return (
    <NodeContainer isPressed={isPressed}>
      <NodeDepth isLocked={isLocked} isTablet={isTablet} />
      <NodeContentContainer isLocked={isLocked} isTablet={isTablet}>
        {isLocked ? <LockLogo /> : <BeamedQuaverLogo />}
        {isLocked ? null : (
          <StarContainer isTablet={isTablet}>
            <StarLogo filled={stars >= 1} />
            <StarLogo filled={stars >= 2} />
            <StarLogo filled={stars >= 3} />
          </StarContainer>
        )}
      </NodeContentContainer>
    </NodeContainer>
  )
}
