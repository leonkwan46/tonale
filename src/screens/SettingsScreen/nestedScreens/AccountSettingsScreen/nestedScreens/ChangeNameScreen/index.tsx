import { updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Keyboard } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  Card,
  ErrorContainer,
  ErrorText,
  Input,
  InputField,
  PrimaryButton,
  PrimaryButtonText,
  ScrollContentContainer
} from './ChangeNameScreen.styles'

export const ChangeNameScreen = () => {
  const { userData, setUserData } = useUser()
  const router = useRouter()
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
      >
        <ScrollContentContainer>
          <ScreenIntroHeader
          icon="person-outline"
          description="Your name helps personalize your experience in Tonalè. This name will be visible in your profile and progress tracking."
        />
        {/* Display Name Section */}
        <Card>
          {error ? (
            <ErrorContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <InputField>
            <Icon name="person-outline" sizeVariant="sm" colorVariant="primary" />
            <Input
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
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <PrimaryButtonText>Save</PrimaryButtonText>
          </PrimaryButton>
        </Card>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

