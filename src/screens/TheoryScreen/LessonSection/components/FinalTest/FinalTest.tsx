import React from 'react'
import { LockLogo } from '../Logo/LockLogo'
import { FinalTestContainer, FinalTestContent, FinalTestDepth, FinalTestDescription, FinalTestTextContainer, FinalTestTitle, LockContainer } from './FinalTest.styles'

interface FinalTestProps {
  title: string
  description: string
  isPressed?: boolean
  isLocked?: boolean
}

export const FinalTest: React.FC<FinalTestProps> = ({ 
  isPressed = false, 
  isLocked = true,
  title,
  description
}) => {
  return (
    <>
        {isLocked && (
            <LockContainer>
                <LockLogo size={35} />
            </LockContainer>
        )}
        <FinalTestContainer isPressed={isPressed && !isLocked} isLocked={isLocked}>
            <FinalTestDepth />
            <FinalTestContent isLocked={isLocked}>
                <FinalTestTextContainer>
                    <FinalTestTitle>{title}</FinalTestTitle>
                    {description && (
                        <FinalTestDescription>{description}</FinalTestDescription>
                    )}
                </FinalTestTextContainer>
            </FinalTestContent>
        </FinalTestContainer>
    </>
  )
}