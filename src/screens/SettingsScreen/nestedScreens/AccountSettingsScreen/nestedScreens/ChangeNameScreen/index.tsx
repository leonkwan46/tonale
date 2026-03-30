import { updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useDevice, useUser } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { InputField } from '@/compLib/InputField'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Keyboard } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { SettingSection } from '../../../../components/SettingSection'
import {
  ErrorContainer,
  ErrorText,
  ScrollContentContainer
} from './ChangeNameScreen.styles'

export const ChangeNameScreen = () => {
  const { isTablet } = useDevice()
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
      setError('Please enter a name')
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
      setError(
        getUserFacingErrorMessage(err, 'Couldn’t update your name. Please try again.')
      )
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
          description="Your name helps personalise your learning in Tonalè. It will show on your profile and progress."
        />
        {/* Display Name Section */}
        <SettingSection>
          {error ? (
            <ErrorContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
              <ErrorText
                size={isTablet ? 'xxs' : 'xs'}
                colorVariant="error"
              >
                {error}
              </ErrorText>
            </ErrorContainer>
          ) : null}

          <InputField
            leftIcon="person-outline"
            placeholder="Enter your name"
            onChangeText={handleNameChange}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            disabled={loading}
          />

          <Button
            variant="filled"
            color="primary"
            disabled={loading || !name.trim()}
            loading={loading}
            onPress={handleSave}
            label={loading ? 'Saving…' : 'Save'}
          />
        </SettingSection>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

