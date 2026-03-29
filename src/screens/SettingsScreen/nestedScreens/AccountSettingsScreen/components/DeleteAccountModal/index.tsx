import { useState } from 'react'

import { Button } from '@/compLib/Button'
import { Icon } from '@/compLib/Icon'
import { InputField } from '@/compLib/InputField'

import {
  ActionsRow,
  BodyText,
  EyeButton,
  ModalCard,
  ModalMask,
  ModalMaskContainer,
  StatusContainer,
  StatusText,
  TitleText
} from './DeleteAccountModal.styles'

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
            <InputField
              leftIcon="lock-closed-outline"
              value={password}
              onChangeText={onChangePassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              disabled={isLoading}
              returnKeyType="done"
              rightSlot={
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
              }
            />
          )}

          <ActionsRow>
            <Button
              variant="ghost"
              size="md"
              onPress={onCancel}
              disabled={isLoading}
              label="Cancel"
            />

            <Button
              variant="filled"
              color="error"
              size="md"
              labelWeight="bold"
              onPress={onConfirm}
              loading={isLoading}
              disabled={isLoading}
              label="Delete"
            />
          </ActionsRow>
        </ModalCard>
      </ModalMaskContainer>
    </ModalMask>
  )
}

