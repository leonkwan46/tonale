import * as React from 'react'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './KeyPress.styles'

interface KeyPressProps {
  targetNote?: string // The note the user should press
  onKeyPress?: (key: string) => void // Callback when a key is pressed
  correctKey?: string // The correct key for validation
}

export const KeyPress: React.FC<KeyPressProps> = ({ 
  targetNote = 'C', 
  onKeyPress,
  correctKey 
}) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Piano keys layout (white keys)
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  
  // Piano keys layout (black keys)
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#']

  // Handle key press
  const handleKeyPress = (key: string) => {
    setSelectedKey(key)
    onKeyPress?.(key)
    
    if (correctKey) {
      setIsCorrect(key === correctKey)
    }
  }

  // Get key style
  const getKeyStyle = (key: string) => {
    const isSelected = selectedKey === key
    const isCorrectKey = correctKey === key
    
    if (isSelected && isCorrect !== null) {
      return isCorrect ? styles.correctKey : styles.incorrectKey
    }
    
    if (isSelected) {
      return styles.selectedKey
    }
    
    if (isCorrectKey && isCorrect !== null) {
      return styles.correctKey
    }
    
    return key.includes('#') ? styles.blackKey : styles.whiteKey
  }

  return (
    <View style={styles.container}>
      {/* Question display */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Press the key for: <Text style={styles.noteText}>{targetNote}</Text>
        </Text>
      </View>

      {/* Piano keyboard */}
      <View style={styles.keyboardContainer}>
        <View style={styles.keysRow}>
          {/* White keys */}
          {whiteKeys.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, getKeyStyle(key)]}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={[
                styles.keyText, 
                key.includes('#') ? styles.blackKeyText : styles.whiteKeyText
              ]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Black keys row */}
        <View style={styles.blackKeysRow}>
          {blackKeys.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, getKeyStyle(key)]}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={[styles.keyText, styles.blackKeyText]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Feedback */}
      {isCorrect !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={[
            styles.feedbackText,
            isCorrect ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            {isCorrect ? '✅ Correct!' : '❌ Try again'}
          </Text>
        </View>
      )}
    </View>
  )
}

