import React from 'react'
import {
  FinalTestContainer,
  FinalTestContent,
  FinalTestDepth,
  FinalTestDescription,
  FinalTestGradient,
  FinalTestIconContainer,
  FinalTestTextContainer,
  FinalTestTitle
} from './FinalTest.styles'
import { ScrollIcon } from './ScrollIcon'

interface FinalTestProps {
  title: string
  description: string
  isPressed?: boolean
}

export const FinalTest: React.FC<FinalTestProps> = ({ 
  isPressed = false, 
  title,
  description
}) => {
  return (
    <FinalTestContainer isPressed={isPressed} isLocked={false}>
      <FinalTestDepth />
      <FinalTestContent isLocked={false}>
        <FinalTestGradient 
          colors={['#ff6b6b', '#FF4500', '#ffd43b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Scroll Icon */}
        <FinalTestIconContainer>
          <ScrollIcon size={24} />
        </FinalTestIconContainer>
        
        {/* Main Content */}
        <FinalTestTextContainer>
          <FinalTestTitle>{title}</FinalTestTitle>
          {description && (
            <FinalTestDescription>{description}</FinalTestDescription>
          )}
        </FinalTestTextContainer>
      </FinalTestContent>
    </FinalTestContainer>
  )
}