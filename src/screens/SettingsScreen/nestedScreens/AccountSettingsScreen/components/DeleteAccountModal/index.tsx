import { ActivityIndicator } from 'react-native'
import { useState } from 'react'

import {
  ActionsRow,
  BodyText,
  CancelButton,
  CancelButtonText,
  ConfirmButton,
  ConfirmButtonText,
  EyeButton,
  Input,
  InputField,
  ModalCard,
  ModalMask,
  ModalMaskContainer,
  StatusContainer,
  StatusText,
  TitleText
} from './DeleteAccountModal.styles'
import { Icon } from '@/sharedComponents/Icon'

type DeleteAccountModalProps = {
  visible: boolean
  canReauthenticateWithPassword: boolean
  password: string
  error: string
  isLoading: boolean
  onChangePassword: (text: string) => void
  onCancel: () => void
  onConfirm: () => void
}

export const DeleteAccountModal = ({
  visible,
  canReauthenticateWithPassword,
  password,
  error,
  isLoading,
  onChangePassword,
  onCancel,
  onConfirm
}: DeleteAccountModalProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <ModalMask
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        if (!isLoading) onCancel()
      }}
    >
      <ModalMaskContainer>
        <ModalCard>
          <TitleText>Confirm deletion</TitleText>
          <BodyText>This will permanently delete your account and progress. This cannot be undone.</BodyText>

          {!!error && (
            <StatusContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
              <StatusText>{error}</StatusText>
            </StatusContainer>
          )}

          {canReauthenticateWithPassword && (
            <InputField>
              <Icon
                name="lock-closed-outline"
                sizeVariant="sm"
                colorVariant="primary"
              />
              <Input
                value={password}
                onChangeText={onChangePassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
                returnKeyType="done"
              />
              <EyeButton
                onPress={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
              >
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  sizeVariant="sm"
                  colorVariant="primary"
                />
              </EyeButton>
            </InputField>
          )}

          <ActionsRow>
            <CancelButton onPress={onCancel} disabled={isLoading}>
              <CancelButtonText>Cancel</CancelButtonText>
            </CancelButton>

            <ConfirmButton onPress={onConfirm} disabled={isLoading}>
              {isLoading && <ActivityIndicator color="white" />}
              <ConfirmButtonText>Delete</ConfirmButtonText>
            </ConfirmButton>
          </ActionsRow>
        </ModalCard>
      </ModalMaskContainer>
    </ModalMask>
  )
}

