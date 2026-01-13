import { useDevice } from '@/hooks'
import { ModalOverlay } from '@/sharedComponents/Modal/Modal.styles'
import { getExplanationFormattingConfig, shouldShowVisualInExplanation } from '@/theory/exercises/utils/explanation'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import type { Explanation, VisualComponent } from '@types'
import * as React from 'react'
import { Modal, Text } from 'react-native'
import {
  ButtonContainer,
  ContinueButton,
  ContinueButtonText,
  ExplanationText,
  ModalContainer
} from './QuestionExplanation.styles'
import { VisualExplanation } from './VisualExplanation/VisualExplanation'

interface QuestionExplanationProps {
  explanation?: Explanation
  correctAnswer: string
  visualComponent?: VisualComponent
  onContinue: () => void
}

const formatExplanationWithBoldAnswer = (text: string, correctAnswer: string): React.ReactNode => {
  if (!text) return null
  
  const formattingConfig = getExplanationFormattingConfig()
  const stringsToBold: string[] = []
  
  // Add correct answer if configured to bold
  if (formattingConfig.boldPatterns.correctAnswer) {
    stringsToBold.push(correctAnswer)
  }
  
  // Add note/rest names if configured to bold
  if (formattingConfig.boldPatterns.noteRestNames) {
    stringsToBold.push(...formattingConfig.noteRestNames)
  }
  
  // Add custom patterns if any
  if (formattingConfig.boldPatterns.customPatterns) {
    stringsToBold.push(...formattingConfig.boldPatterns.customPatterns)
  }
  
  // Create a regex pattern that matches any of the strings to bold
  const escapedStrings = stringsToBold.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = `(${escapedStrings.join('|')})`
  const regex = new RegExp(pattern, 'gi')
  
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    
    // Add the bolded text with the same font family
    parts.push(
      React.createElement(Text, { key: match.index, style: { fontFamily: getSourGummyFontFamily('700') } }, match[0])
    )
    
    lastIndex = regex.lastIndex
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  
  return parts.length > 0 ? <>{parts}</> : text
}

export const QuestionExplanation = ({
  explanation,
  correctAnswer,
  visualComponent,
  onContinue
}: QuestionExplanationProps) => {
  const { isTablet } = useDevice()
  
  // Extract text and visualComponent from explanation
  const explanationText = explanation?.text
  // Merge visual components: start with question's visualComponent, override with explanation's visualComponent
  // but preserve properties from question if explanation doesn't have them (elements for musicStaff, noteType for noteValue)
  const displayVisualComponent = explanation?.visualComponent && visualComponent
    ? { 
        ...visualComponent, 
        ...explanation.visualComponent,
        // Preserve elements from question if explanation doesn't have them (for musicStaff types)
        ...(explanation.visualComponent.elements === undefined && visualComponent.elements && { elements: visualComponent.elements }),
        // Preserve noteType from question if explanation doesn't have it (for noteValue types)
        ...(explanation.visualComponent.noteType === undefined && visualComponent.noteType && { noteType: visualComponent.noteType })
      }
    : explanation?.visualComponent || visualComponent
  // Show visual if it should be shown
  const showVisual = shouldShowVisualInExplanation(displayVisualComponent, explanation)
  const displayText = explanationText || `The correct answer is ${correctAnswer}.`
  const formattedText = formatExplanationWithBoldAnswer(displayText, correctAnswer)

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onContinue}
    >
      <ModalOverlay>
        <ModalContainer isTablet={isTablet}>
          {showVisual && displayVisualComponent && (
            <VisualExplanation 
              visualComponent={displayVisualComponent}
            />
          )}

          {formattedText && (
            <ExplanationText isTablet={isTablet}>
              {formattedText}
            </ExplanationText>
          )}
          
          <ButtonContainer isTablet={isTablet}>
            <ContinueButton isTablet={isTablet} onPress={onContinue}>
              <ContinueButtonText isTablet={isTablet}>
                Continue
              </ContinueButtonText>
            </ContinueButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}

