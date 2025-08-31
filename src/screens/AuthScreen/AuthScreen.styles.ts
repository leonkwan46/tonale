import { AppTheme } from '@/constants/Colors'
import styled from '@emotion/native'
import { Platform, ScrollView, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'

// Common font weight utilities
export const fontWeights = {
  bold: Platform.select({ ios: '700', android: 'bold' }),
  semiBold: Platform.select({ ios: '600', android: '700' }),
  medium: Platform.select({ ios: '500', android: '500' })
}

// Main container styles
export const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${props => props.backgroundColor};
`

export const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`

export const ScrollContainer = styled(ScrollView)`
  flex-grow: 1;
`

export const ScrollContentContainer = {
  flexGrow: 1,
  justifyContent: 'center' as const,
  paddingHorizontal: 32,
  paddingVertical: 40
}

// Logo section
export const LogoSection = styled.View`
  align-items: center;
  margin-bottom: 40px;
`

export const LogoContainer = styled(Animated.View)`
  shadow-color: ${AppTheme.gold};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 10;
  margin-bottom: 20px;
`

export const LogoOuter = styled.View<{ backgroundColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`

export const LogoInner = styled.View<{ backgroundColor: string }>`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`

export const AppTitle = styled.Text<{ color: string }>`
  font-size: 28px;
  font-weight: ${fontWeights.bold};
  margin-bottom: 8px;
  text-align: center;
  color: ${props => props.color};
`

export const Subtitle = styled.Text<{ color: string }>`
  font-size: 16px;
  opacity: 0.7;
  text-align: center;
  color: ${props => props.color};
`

// Toggle section
export const ToggleContainer = styled.View`
  margin-bottom: 30px;
`

export const ToggleBackground = styled.View<{ backgroundColor: string }>`
  flex-direction: row;
  border-radius: 12px;
  padding: 4px;
  background-color: ${props => props.backgroundColor};
`

export const ToggleButton = styled(TouchableOpacity)<{ isActive: boolean; backgroundColor?: string }>`
  flex: 1;
  padding-vertical: 12px;
  border-radius: 8px;
  align-items: center;
  background-color: ${props => props.isActive ? (props.backgroundColor || AppTheme.gold) : 'transparent'};
`

export const ToggleText = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: ${fontWeights.semiBold};
  color: ${props => props.color};
`

// Form section
export const FormSection = styled(Animated.View)`
  margin-bottom: 30px;
`

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffe0e0;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`

export const ErrorText = styled.Text`
  color: #ff4757;
  margin-left: 8px;
  flex: 1;
`

// Input section
export const InputContainer = styled.View`
  margin-bottom: 16px;
`

export const InputWrapper = styled.View<{ backgroundColor: string; borderColor: string }>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-radius: 12px;
  padding-horizontal: 16px;
  height: 56px;
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
`

export const InputIcon = styled.View`
  margin-right: 12px;
`

export const TextInputStyled = styled.TextInput<{ color: string }>`
  flex: 1;
  font-size: 16px;
  height: 100%;
  color: ${props => props.color};
`

export const EyeIcon = styled(TouchableOpacity)`
  padding: 4px;
`

// Requirements
export const RequirementsContainer = styled.View`
  margin-bottom: 24px;
`

export const RequirementsText = styled.Text<{ color: string }>`
  font-size: 12px;
  opacity: 0.6;
  text-align: center;
  color: ${props => props.color};
`

// Buttons
export const PrimaryButton = styled(TouchableOpacity)<{ opacity: number }>`
  background-color: ${AppTheme.gold};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 16px;
  border-radius: 12px;
  margin-top: 8px;
  shadow-color: ${AppTheme.gold};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
  opacity: ${props => props.opacity};
`

export const PrimaryButtonText = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: ${fontWeights.semiBold};
  margin-right: 8px;
`

export const ButtonIcon = styled.View`
  margin-left: 4px;
`

// Divider
export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 24px;
`

export const Divider = styled.View<{ backgroundColor: string }>`
  flex: 1;
  height: 1px;
  background-color: ${props => props.backgroundColor};
`

export const DividerText = styled.Text<{ color: string }>`
  padding-horizontal: 16px;
  font-size: 14px;
  opacity: 0.6;
  color: ${props => props.color};
`

// Secondary button
export const SecondaryButton = styled(TouchableOpacity)<{ borderColor: string; opacity: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 16px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${props => props.borderColor};
  opacity: ${props => props.opacity};
`

export const SecondaryButtonText = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: ${fontWeights.medium};
  color: ${props => props.color};
`


