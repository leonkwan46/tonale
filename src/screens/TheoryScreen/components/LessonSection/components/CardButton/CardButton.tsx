import { useDevice } from '@/hooks'
import { BeamedQuaverLogo } from '../Logo/BeamedQuaverLogo'
import { LockLogo } from '../Logo/LockLogo'
import { StarLogo } from '../Logo/StarLogo'
import { NodeContainer, NodeContentContainer, NodeDepth, StarContainer } from './CardButton.styles'

interface CardButtonProps {
  isLocked?: boolean
  isPressed?: boolean
  stars?: number
  isCompleted?: boolean
}

export const CardButton = ({ isLocked = false, isPressed = false, stars = 0, isCompleted = false }: CardButtonProps) => {

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
