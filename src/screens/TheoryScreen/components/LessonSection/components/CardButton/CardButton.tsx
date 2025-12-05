import { useDevice } from '@/hooks'
import * as React from 'react'
import { BeamedQuaverLogo, LockLogo, StarLogo } from '../Logo'
import { NodeContainer, NodeContentContainer, NodeDepth, StarContainer } from './CardButton.styles'

interface CardButtonProps {
  isLocked?: boolean
  isPressed?: boolean
  stars?: number
  isCompleted?: boolean
}

export const CardButton: React.FC<CardButtonProps> = ({ isLocked = false, isPressed = false, stars = 0, isCompleted = false }) => {

  const { isTablet } = useDevice()

  return (
    <NodeContainer isPressed={isPressed}>
      <NodeDepth isLocked={isLocked} isTablet={isTablet} isCompleted={isCompleted} />
      <NodeContentContainer isLocked={isLocked} isTablet={isTablet} isCompleted={isCompleted}>
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
