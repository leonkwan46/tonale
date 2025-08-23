import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import type { AuthFormData } from '../types'
import {
    ButtonIcon,
    ErrorContainer,
    ErrorText,
    EyeIcon,
    FormSection,
    InputContainer,
    InputIcon,
    InputWrapper,
    PrimaryButton,
    PrimaryButtonText,
    RequirementsContainer,
    RequirementsText,
    TextInputStyled
} from '../AuthScreen.styles'

interface AuthFormProps {
  authState: any
  formData: any
  colorScheme: string
  textColor: string
  inputBackgroundColor: string
  borderColor: string
  updateFormData: (field: keyof AuthFormData, value: string) => void
  updateAuthState: (updates: any) => void
  handleAuth: () => void
  handleGuestLogin: () => void
  formAnimatedStyle: any
}

export const AuthForm: React.FC<AuthFormProps> = ({
  authState,
  formData,
  colorScheme,
  textColor,
  inputBackgroundColor,
  borderColor,
  updateFormData,
  updateAuthState,
  handleAuth,
  handleGuestLogin,
  formAnimatedStyle
}) => (
  <FormSection style={formAnimatedStyle}>
    {authState.error ? (
      <ErrorContainer>
        <Ionicons name="alert-circle" size={20} color="#ff4757" />
        <ErrorText>{authState.error}</ErrorText>
      </ErrorContainer>
    ) : null}

    {/* Email Input */}
    <InputContainer>
      <InputWrapper backgroundColor={inputBackgroundColor} borderColor={borderColor}>
        <InputIcon>
          <Ionicons name="mail-outline" size={20} color="#FFD700" />
        </InputIcon>
        <TextInputStyled
          placeholder="Email"
          placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
          color={textColor}
          onChangeText={(text) => updateFormData('email', text)}
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </InputWrapper>
    </InputContainer>

    {/* Password Input */}
    <InputContainer>
      <InputWrapper backgroundColor={inputBackgroundColor} borderColor={borderColor}>
        <InputIcon>
          <Ionicons name="lock-closed-outline" size={20} color="#FFD700" />
        </InputIcon>
        <TextInputStyled
          placeholder="Password"
          placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
          color={textColor}
          onChangeText={(text) => updateFormData('password', text)}
          value={formData.password}
          secureTextEntry={!authState.showPassword}
        />
        <EyeIcon
          onPress={() => updateAuthState({ showPassword: !authState.showPassword })}
        >
          <Ionicons 
            name={authState.showPassword ? 'eye-outline' : 'eye-off-outline'} 
            size={20} 
            color="#FFD700" 
          />
        </EyeIcon>
      </InputWrapper>
    </InputContainer>

    {/* Confirm Password Input (Register only) */}
    {authState.mode === 'register' && (
      <InputContainer>
        <InputWrapper backgroundColor={inputBackgroundColor} borderColor={borderColor}>
          <InputIcon>
            <Ionicons name="lock-closed-outline" size={20} color="#FFD700" />
          </InputIcon>
          <TextInputStyled
            placeholder="Confirm Password"
            placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
            color={textColor}
            onChangeText={(text) => updateFormData('confirmPassword', text)}
            value={formData.confirmPassword}
            secureTextEntry={!authState.showConfirmPassword}
          />
          <EyeIcon
            onPress={() => updateAuthState({ showConfirmPassword: !authState.showConfirmPassword })}
          >
            <Ionicons 
              name={authState.showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
              size={20} 
              color="#FFD700" 
            />
          </EyeIcon>
        </InputWrapper>
      </InputContainer>
    )}

    {/* Password Requirements (Register only) */}
    {authState.mode === 'register' && (
      <RequirementsContainer>
        <RequirementsText color={textColor}>
          Password must be at least 6 characters
        </RequirementsText>
      </RequirementsContainer>
    )}

    {/* Primary Button */}
    <PrimaryButton
      opacity={authState.loading ? 0.7 : 1}
      onPress={handleAuth}
      disabled={authState.loading}
    >
      <PrimaryButtonText>
        {authState.loading 
          ? (authState.mode === 'login' ? 'Signing In...' : 'Creating Account...')
          : (authState.mode === 'login' ? 'Sign In' : 'Create Account')
        }
      </PrimaryButtonText>
      <ButtonIcon>
        <Ionicons 
          name={authState.mode === 'login' ? 'arrow-forward' : 'person-add'} 
          size={20} 
          color="#000" 
        />
      </ButtonIcon>
    </PrimaryButton>
  </FormSection>
)