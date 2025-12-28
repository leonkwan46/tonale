import styled from '@emotion/native'
import { ScrollView, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ScrollContainer = styled(ScrollView)`
`

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(10),
  alignItems: 'center'
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: scale(24),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold),
  textAlign: 'center'
}))

export const Subtitle = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal),
  textAlign: 'center',
  opacity: 0.7,
  marginBottom: scale(32)
}))

export const SectionContainer = styled.View`
  width: 100%;
  margin-bottom: ${scale(32)};
`

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  marginBottom: scale(16)
}))

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 71, 87, 0.1);
  padding-horizontal: ${scale(16)};
  padding-vertical: ${scale(12)};
  border-radius: ${scale(8)};
  margin-bottom: ${scale(20)};
`

export const ErrorText = styled.Text`
  color: #ff4757;
  margin-left: ${scale(8)};
  flex: 1;
  font-family: "${getSourGummyFontFamily('400')}";
`

export const PrimaryButton = styled(TouchableOpacity)<{ opacity: number; disabled: boolean }>(({ theme, opacity, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(16),
  borderRadius: scale(12),
  marginTop: scale(8),
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  opacity: disabled ? 0.5 : opacity,
  width: '100%'
}))

export const PrimaryButtonText = styled.Text`
  color: #fff;
  font-size: ${scale(16)};
  margin-right: ${scale(8)};
  font-family: "${getSourGummyFontFamily('600')}";
`

