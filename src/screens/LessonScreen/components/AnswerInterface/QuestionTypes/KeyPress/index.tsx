import { PianoKeyboard } from '@/sharedComponents/PianoKeyboard'
import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { useState } from 'react'
import {
  Container,
  FeedbackContainer,
  FeedbackText
} from './KeyPress.styles'

interface KeyPressProps {
  onKeyPress?: (key: string) => void
  correctKey?: string
}

const ALL_PIANO_KEYS: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#']

export const KeyPress = ({ 
  onKeyPress,
  correctKey 
}: KeyPressProps) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleKeyPress = (noteName: string) => {
    if (selectedKey !== null) return
    setPressedKey(noteName)
  }

  const handleKeyRelease = (noteName: string) => {
    if (selectedKey !== null) return
    setSelectedKey(noteName)
    setPressedKey(null)
    onKeyPress?.(noteName)
  }

  const handleKeyCancel = () => {
    if (selectedKey !== null) return
    setPressedKey(null)
  }

  const hasFeedback = selectedKey !== null && correctKey !== undefined
  const isCorrect = hasFeedback && isEnharmonicEquivalent(selectedKey!, correctKey!)
  const disabledKeys = selectedKey !== null ? ALL_PIANO_KEYS : []

  return (
    <Container>
      <PianoKeyboard
        onKeyPress={handleKeyPress}
        onKeyRelease={handleKeyRelease}
        onKeyCancel={handleKeyCancel}
        selectedKey={hasFeedback ? selectedKey : pressedKey}
        correctKey={correctKey}
        showFeedback={hasFeedback}
        disabledKeys={disabledKeys}
      />

      {hasFeedback && (
        <FeedbackContainer>
          <FeedbackText isCorrect={isCorrect}>
            {isCorrect ? '✅ Correct!' : '❌ Try again'}
          </FeedbackText>
        </FeedbackContainer>
      )}
    </Container>
  )
}
