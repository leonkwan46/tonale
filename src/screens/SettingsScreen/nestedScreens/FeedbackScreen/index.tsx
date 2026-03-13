import { db } from '@/config/firebase/firebase'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon'
import Constants from 'expo-constants'
import { useRouter } from 'expo-router'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { Alert, Keyboard, Platform } from 'react-native'

import { ScreenIntroHeader } from '../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../components/SettingItemHeader'
import { SettingSection } from '../../components/SettingSection'
import {
  ConsentContainer,
  ConsentText,
  ContentWrapper,
  EmailInput,
  EmailInputField,
  ErrorContainer,
  ErrorText,
  FeedbackInput,
  InputField,
  PrimaryButton,
  PrimaryButtonText,
  PrivacyNoticeText,
  ScrollContentContainer
} from './FeedbackScreen.styles'

export const FeedbackScreen = () => {
  const router = useRouter()
  const { authUser } = useUser()
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState(authUser?.email || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  const handleSubmit = async () => {
    Keyboard.dismiss()
    setError('')

    const trimmedFeedback = feedback.trim()
    if (!trimmedFeedback) {
      setError('Please enter your feedback.')
      return
    }

    if (trimmedFeedback.length < 10) {
      setError('Please add a little more detail (at least 10 characters).')
      return
    }

    if (!consentGiven) {
      setError('Please accept the privacy notice to send feedback.')
      return
    }

    const trimmedEmail = email.trim()
    
    setLoading(true)
    try {
      await addDoc(collection(db, 'feedback'), {
        message: trimmedFeedback,
        email: trimmedEmail || null,
        platform: Platform.OS as 'ios' | 'android',
        appVersion: Constants.expoConfig?.version ?? 'unknown',
        createdAt: serverTimestamp()
      })
      
      Alert.alert(
        'Thank you!',
        'Thanks for your feedback! It helps us make the app better.',
        [
          {
            text: 'OK',
            onPress: () => {
              router.back()
            }
          }
        ]
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit feedback'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Feedback" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
      >
        <ScrollContentContainer>
          <ContentWrapper>
            <ScreenIntroHeader
              icon="chatbubble-outline"
              description="We&apos;d love to hear from you! Share your ideas, feedback, or report a problem."
            />
            <SettingSection>
            {error ? (
              <ErrorContainer>
                <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                <ErrorText>{error}</ErrorText>
              </ErrorContainer>
            ) : null}

            <InputField>
              <FeedbackInput
                placeholder="Tell us what you think..."
                onChangeText={setFeedback}
                value={feedback}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                autoCapitalize="sentences"
                autoCorrect={true}
                editable={!loading}
              />
            </InputField>

            <EmailInputField>
              <Icon name="mail-outline" sizeVariant="sm" colorVariant="primary" />
              <EmailInput
                placeholder="Email (optional)"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </EmailInputField>

            <ConsentContainer
              onPress={() => {
                setConsentGiven(!consentGiven)
                setError('')
              }}
              activeOpacity={0.7}
            >
              <Icon
                name={consentGiven ? 'checkbox' : 'checkbox-outline'}
                sizeVariant="sm"
                colorVariant={consentGiven ? 'primary' : 'icon'}
              />
              <ConsentText>
                I agree to share my feedback to help improve the app.
              </ConsentText>
            </ConsentContainer>

            <PrivacyNoticeText>
              We collect your message, email (if provided), device type, and app version so we can review feedback and improve the app. We may contact you by email if needed.
            </PrivacyNoticeText>

            <PrimaryButton
              disabled={loading || !feedback.trim() || !consentGiven}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <PrimaryButtonText>
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </PrimaryButtonText>
              </PrimaryButton>
            </SettingSection>
          </ContentWrapper>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}
