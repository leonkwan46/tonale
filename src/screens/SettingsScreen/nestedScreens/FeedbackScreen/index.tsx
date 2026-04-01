import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { InputField } from '@/compLib/InputField'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import Constants from 'expo-constants'
import { useState } from 'react'
import { Keyboard, Platform } from 'react-native'

import { ScreenIntroHeader } from '../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../components/SettingItemHeader'
import { SettingSection } from '../../components/SettingSection'
import {
  ConsentContainer,
  ConsentText,
  ContentWrapper,
  ErrorContainer,
  ErrorText,
  PrivacyNoticeText,
  ScrollContentContainer,
  SuccessContainer,
  SuccessText
} from './FeedbackScreen.styles'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf57n-isBz_kuEPxE3H16glGL6O0H0pCPRu0vvDQXabk5zU8w/formResponse'

const GOOGLE_FORM_ENTRY_IDS = {
  fullName: 'entry.890075842',
  email: 'entry.913982394',
  message: 'entry.249512772'
} as const

export const FeedbackScreen = () => {
  const { authUser } = useUser()
  const [fullName, setFullName] = useState(authUser?.displayName || '')
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState(authUser?.email || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    Keyboard.dismiss()
    setError('')
    setSuccess(false)

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
    const trimmedFullName = fullName.trim()

    setLoading(true)
    try {
      const body = new URLSearchParams()
      body.append(GOOGLE_FORM_ENTRY_IDS.fullName, trimmedFullName || 'N/A')
      body.append(GOOGLE_FORM_ENTRY_IDS.email, trimmedEmail || 'N/A')

      const appVersion = Constants.expoConfig?.version ?? 'unknown'
      const platform = Platform.OS as 'ios' | 'android'
      const osVersion = String(Platform.Version)

      const nativeBuildVersion =
        platform === 'ios'
          ? Constants.expoConfig?.ios?.buildNumber
          : Constants.expoConfig?.android?.versionCode

      const message = `${trimmedFeedback}\n\n---\nPlatform: ${platform}\nOS version: ${osVersion}\nApp version: ${appVersion}\nBuild: ${nativeBuildVersion ?? 'unknown'}`
      body.append(GOOGLE_FORM_ENTRY_IDS.message, message)

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      })

      setSuccess(true)
      setFeedback('')
    } catch (err) {
      setError(
        getUserFacingErrorMessage(
          err,
          'Couldn’t submit your feedback. Please try again.'
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title='Feedback' />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollContentContainer>
          <ContentWrapper>
            <ScreenIntroHeader
              icon='chatbubble-outline'
              description="We'd love to hear from you! Share your ideas, feedback, or report a problem."
            />
            {success ? (
              <SuccessContainer>
                <Icon
                  name='checkmark-circle'
                  sizeVariant='xs'
                  colorVariant='success'
                />
                <SuccessText size='xs' colorVariant='success'>
                  Thanks for your feedback! It helps us make the app better.
                </SuccessText>
              </SuccessContainer>
            ) : (
              <SettingSection>
                {error ? (
                  <ErrorContainer>
                    <Icon
                      name='alert-circle'
                      sizeVariant='xs'
                      colorVariant='error'
                    />
                    <ErrorText size='xs' colorVariant='error'>
                      {error}
                    </ErrorText>
                  </ErrorContainer>
                ) : null}

                <InputField
                  placeholder='Tell us what you think...'
                  onChangeText={setFeedback}
                  value={feedback}
                  multiline
                  numberOfLines={6}
                  textAlignVertical='top'
                  autoCapitalize='sentences'
                  autoCorrect={true}
                  disabled={loading}
                />

                <InputField
                  leftIcon='mail-outline'
                  placeholder='Email (optional)'
                  onChangeText={setEmail}
                  value={email}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  disabled={loading}
                />

                <InputField
                  leftIcon='person-outline'
                  placeholder='Full name (optional)'
                  onChangeText={(value) => setFullName(value)}
                  value={fullName}
                  autoCapitalize='words'
                  autoCorrect={false}
                  disabled={loading}
                />

                <ConsentContainer
                  onPress={() => {
                    setConsentGiven(!consentGiven)
                    setError('')
                  }}
                >
                  <Icon
                    name={consentGiven ? 'checkbox' : 'checkbox-outline'}
                    sizeVariant='sm'
                    colorVariant={consentGiven ? 'primary' : 'icon'}
                  />
                  <ConsentText size='xs'>
                    I agree to share my feedback to help improve the app.
                  </ConsentText>
                </ConsentContainer>

                <PrivacyNoticeText size='xxs' muted>
                  We collect your message, email (if provided), device type, and
                  app version so we can review feedback and improve the app. We
                  may contact you by email if needed.
                </PrivacyNoticeText>

                <Button
                  variant='filled'
                  size='md'
                  disabled={loading || !feedback.trim() || !consentGiven}
                  loading={loading}
                  onPress={handleSubmit}
                  label={loading ? 'Sending feedback…' : 'Submit Feedback'}
                />
              </SettingSection>
            )}
          </ContentWrapper>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}
