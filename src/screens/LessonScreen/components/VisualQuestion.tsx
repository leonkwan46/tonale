import { Question } from '@/data/theoryData/types'
import React from 'react'
import { Text, View } from 'react-native'

interface VisualQuestionProps {
  question: Question
}

export const VisualQuestion: React.FC<VisualQuestionProps> = ({ question }) => {
  if (!question.visualComponent) {
    return null
  }

  const { visualComponent } = question

  // Temporary placeholder until we fix the music notation library imports
  return (
    <View style={{ alignItems: 'center', marginVertical: 20, padding: 20, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
        Visual Component: {visualComponent.type}
      </Text>
      {visualComponent.noteType && (
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          Note: {visualComponent.noteType}
        </Text>
      )}
      {visualComponent.clef && (
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          Clef: {visualComponent.clef}
        </Text>
      )}
      {visualComponent.timeSignature && (
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          Time Signature: {visualComponent.timeSignature}
        </Text>
      )}
      {visualComponent.keyName && (
        <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
          Key: {visualComponent.keyName}
        </Text>
      )}
    </View>
  )
}