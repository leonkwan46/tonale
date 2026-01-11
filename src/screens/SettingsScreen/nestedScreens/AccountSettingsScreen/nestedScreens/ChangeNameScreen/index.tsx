import { updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { useDevice, useUser } from '@/hooks'
import { KeyboardAwareScrollView, ScreenContainer } from '@/sharedComponents'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Keyboard } from 'react-native'
import { scale } from 'react-native-size-matters'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  Card,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  Input,
  InputField,
  PrimaryButton,
  PrimaryButtonText,
  PrimaryIcon
} from './ChangeNameScreen.styles'

export const ChangeNameScreen = () => {
  const { userData, setUserData } = useUser()
  const router = useRouter()
  const { isTablet } = useDevice()
  const [name, setName] = useState(userData?.name || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateName = (text: string): string => {
    // Remove all spaces and special characters, keep only letters (a-z, A-Z) and hyphens (-)
    return text.replace(/[^a-zA-Z-]/g, '')
  }

  const handleNameChange = (text: string) => {
    const cleanedText = validateName(text)
    setName(cleanedText)
  }

  const handleSave = async () => {
    Keyboard.dismiss()
    setError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Name cannot be empty')
      return
    }

    // Only update if name actually changed
    if (trimmedName === userData?.name) {
      router.back()
      return
    }

    setLoading(true)
    try {
      // Update Firebase Auth displayName and Firestore user data in parallel
      const [result] = await Promise.all([
        updateUserData({ name: trimmedName }),
        updateUserDisplayName(trimmedName)
      ])
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
        router.back()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update name'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Change Name" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: scale(20), gap: scale(20) }}
      >
        <ScreenIntroHeader
          icon="person-outline"
          description="Your name helps personalize your experience in Tonalè. This name will be visible in your profile and progress tracking."
        />
        {/* Display Name Section */}
        <Card>
          {error ? (
            <ErrorContainer isTablet={isTablet}>
              <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
              <ErrorText isTablet={isTablet}>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <InputField isTablet={isTablet}>
            <PrimaryIcon name="person-outline" size={isTablet ? scale(16) : scale(20)} />
            <Input
              isTablet={isTablet}
              placeholder="Enter your name"
              onChangeText={handleNameChange}
              value={name}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSave}
              editable={!loading}
            />
          </InputField>

          <PrimaryButton
            disabled={loading || !name.trim()}
            isTablet={isTablet}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <PrimaryButtonText isTablet={isTablet}>Save</PrimaryButtonText>
          </PrimaryButton>
        </Card>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

