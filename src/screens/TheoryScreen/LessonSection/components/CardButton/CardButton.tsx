import React from 'react'
import { BeamedQuaverLogo, LockLogo, StarLogo } from '../Logo'
import { NodeContainer, NodeContentContainer, NodeDepth, StarContainer } from './CardButton.styles'

interface CardButtonProps {
  isLocked?: boolean
}

export const CardButton: React.FC<CardButtonProps> = ({ isLocked = false }) => {
  return (
    <NodeContainer>
      <NodeDepth isLocked={isLocked} />
      <NodeContentContainer isLocked={isLocked}>
        {isLocked ? <LockLogo /> : <BeamedQuaverLogo />}
        {isLocked ? null : (
          <StarContainer>
            <StarLogo filled={true} />
            <StarLogo />
            <StarLogo />
          </StarContainer>
        )}
      </NodeContentContainer>
    </NodeContainer>
  )
}
