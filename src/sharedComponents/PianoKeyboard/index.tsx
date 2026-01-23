import { isEnharmonicEquivalent } from '@/utils/enharmonicMap'
import { useRef, useState } from 'react'
import {
  BLACK_KEY_OFFSET,
  BlackKeyWrapper,
  BlackKeysContainer,
  Key,
  KeyboardContainer,
  KeyboardWrapper,
  KeysRow,
  WHITE_KEY_MARGIN,
  WHITE_KEY_WIDTH
} from './PianoKeyboard.styles'

interface PianoKeyboardProps {
  onKeyPress?: (key: string) => void
  onKeyRelease?: (key: string) => void
  onKeyCancel?: () => void
  selectedKey?: string | null
  correctKey?: string
  disabledKeys?: string[]
  showFeedback?: boolean
}

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
const BLACK_KEYS = ['C#', 'D#', 'F#', 'G#', 'A#'] as const
const CANCEL_TIMEOUT_MS = 100

export const PianoKeyboard = ({
  onKeyPress,
  onKeyRelease,
  onKeyCancel,
  selectedKey = null,
  correctKey,
  disabledKeys = [],
  showFeedback = false
}: PianoKeyboardProps) => {
  const pressedKeyRef = useRef<string | null>(null)
  const cancelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [internalPressedKey, setInternalPressedKey] = useState<string | null>(null)

  const clearCancelTimeout = () => {
    if (cancelTimeoutRef.current) {
      clearTimeout(cancelTimeoutRef.current)
      cancelTimeoutRef.current = null
    }
  }

  const handleKeyPressIn = (noteName: string) => {
    if (disabledKeys.includes(noteName)) return

    clearCancelTimeout()

    if (pressedKeyRef.current && pressedKeyRef.current !== noteName) {
      setInternalPressedKey(null)
      onKeyCancel?.()
    }

    pressedKeyRef.current = noteName
    setInternalPressedKey(noteName)

    onKeyPress?.(noteName)
  }

  const handleKeyPressOut = (noteName: string) => {
    if (disabledKeys.includes(noteName)) return

    if (pressedKeyRef.current === noteName) {
      cancelTimeoutRef.current = setTimeout(() => {
        if (pressedKeyRef.current === noteName) {
          setInternalPressedKey(null)
          onKeyCancel?.()
          pressedKeyRef.current = null
        }
        cancelTimeoutRef.current = null
      }, CANCEL_TIMEOUT_MS)
    }
  }

  const handleKeyPress = (noteName: string) => {
    if (disabledKeys.includes(noteName)) return

    clearCancelTimeout()

    if (pressedKeyRef.current === noteName) {
      setInternalPressedKey(null)
      onKeyRelease?.(noteName)
      pressedKeyRef.current = null
    } else {
      setInternalPressedKey(null)
      onKeyCancel?.()
      pressedKeyRef.current = null
    }
  }

  const getKeyState = (noteName: string) => {
    const isPressed = internalPressedKey === noteName
    const isSelected = selectedKey === noteName || isPressed
    const isCorrectKey = correctKey !== undefined && isEnharmonicEquivalent(noteName, correctKey)
    const isCorrect = showFeedback && isSelected && isCorrectKey
    const isIncorrect = showFeedback && isSelected && !isCorrectKey

    return { isSelected, isCorrect, isIncorrect }
  }

  const renderKey = (noteName: string, isBlack: boolean) => {
    const { isSelected, isCorrect, isIncorrect } = getKeyState(noteName)
    const isDisabled = disabledKeys.includes(noteName)

    return (
      <Key
        key={noteName}
        isBlack={isBlack}
        isSelected={isSelected}
        isCorrect={isCorrect}
        isIncorrect={isIncorrect}
        activeOpacity={0.95}
        onPressIn={() => handleKeyPressIn(noteName)}
        onPressOut={() => handleKeyPressOut(noteName)}
        onPress={() => handleKeyPress(noteName)}
        disabled={isDisabled}
      />
    )
  }

  const getBlackKeyPosition = (noteName: string): number => {
    const noteToWhiteKeyMap: Record<string, string> = {
      'C#': 'C',
      'D#': 'D',
      'F#': 'F',
      'G#': 'G',
      'A#': 'A'
    }

    const whiteKeyName = noteToWhiteKeyMap[noteName]
    if (!whiteKeyName) return 0

    const whiteKeyIndex = WHITE_KEYS.findIndex((key) => key === whiteKeyName)
    return whiteKeyIndex * (WHITE_KEY_WIDTH + WHITE_KEY_MARGIN * 2) + BLACK_KEY_OFFSET
  }

  const totalWhiteKeysWidth = WHITE_KEYS.length * (WHITE_KEY_WIDTH + WHITE_KEY_MARGIN * 2) - WHITE_KEY_MARGIN * 2

  return (
    <KeyboardContainer>
      <KeyboardWrapper totalWidth={totalWhiteKeysWidth}>
        <KeysRow>
          {WHITE_KEYS.map((noteName) => renderKey(noteName, false))}
        </KeysRow>
        <BlackKeysContainer totalWidth={totalWhiteKeysWidth}>
          {BLACK_KEYS.map((noteName) => (
            <BlackKeyWrapper key={noteName} left={getBlackKeyPosition(noteName)}>
              {renderKey(noteName, true)}
            </BlackKeyWrapper>
          ))}
        </BlackKeysContainer>
      </KeyboardWrapper>
    </KeyboardContainer>
  )
}
