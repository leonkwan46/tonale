import { sendEmailVerificationToUser } from '@/config/firebase/auth'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useDevice, useSafeNavigation, useUser } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { ScreenIntroHeader } from '../../../../components/ScreenIntroHeader'
import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import { SettingSection } from '../../../../components/SettingSection'
import { SettingsItem } from '../../../../components/SettingsItem'
import { ContentContainer } from '../../../../SettingsScreen.styles'
import {
  EmailPill,
  EmailPillText,
  ErrorContainer,
  ErrorText,
  MessageText,
  SuccessContainer,
  SuccessText
} from './EmailScreen.styles'

export const EmailScreen = () => {
  const { isTablet } = useDevice()
  const { authUser } = useUser()
  const { navigate } = useSafeNavigation()

  const [isVerified, setIsVerified] = useState(authUser?.emailVerified || false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState('')
  const [verifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    setIsVerified(authUser?.emailVerified || false)
  }, [authUser?.emailVerified])

  const handleSendVerification = async () => {
    setVerifyLoading(true)
    setVerifyError('')
    setVerifySuccess(false)

    try {
      await sendEmailVerificationToUser()
      setVerifySuccess(true)
    } catch (err) {
      setVerifyError(
        getUserFacingErrorMessage(
          err,
          'Couldn’t send the verification email. Please try again.'
        )
      )
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleChangeEmailPress = () => {
    navigate('/(tabs)/settings/account/change-email-form')
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Email" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContentContainer>
          <ScreenIntroHeader
            icon='mail-outline'
            description={`Your email is needed to access your account and get important messages.
It won't be shared with others.`}
          />

          <EmailPill>
            <EmailPillText size={isTablet ? 'sm' : 'md'}>
              {authUser?.email}
            </EmailPillText>
            <Icon
              name={isVerified ? 'checkmark-circle' : 'checkmark-circle-outline'}
              sizeVariant="xs"
              colorVariant={isVerified ? 'primary' : 'icon'}
            />
          </EmailPill>

          {!isVerified &&
            (verifySuccess ? (
              <SuccessContainer>
                <SuccessText
                  size={isTablet ? 'xs' : 'sm'}
                  colorVariant="success"
                >
                  We&apos;ve sent a verification email to you!
                </SuccessText>
              </SuccessContainer>
            ) : (
              <SettingSection>
                <MessageText size="md" align="center">
                  Make sure it&apos;s your email!
                </MessageText>
                {verifyError ? (
                  <ErrorContainer>
                    <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
                    <ErrorText
                      size={isTablet ? 'xs' : 'sm'}
                      colorVariant="error"
                    >
                      {verifyError}
                    </ErrorText>
                  </ErrorContainer>
                ) : null}
                <Button
                  variant="filled"
                  color="primary"
                  depth
                  depthLayout="row"
                  fullWidth
                  disabled={verifyLoading}
                  loading={verifyLoading}
                  onPress={handleSendVerification}
                  label={verifyLoading ? 'Sending verification email…' : 'Send verification email'}
                />
              </SettingSection>
            ))}

          <SettingSection variant="list">
            <SettingsItem
              icon="people-outline"
              label="Change your email"
              onPress={handleChangeEmailPress}
            />
          </SettingSection>
        </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}
