import styled from '@emotion/native'
import { TextInput, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const CustomInstrumentInputWrapper = styled(View)(({ theme }) => ({
  width: '100%',
  marginTop: scale(16),
  marginBottom: scale(20)
}))

export const CustomInstrumentInput = styled(TextInput)(({ theme }) => ({
  width: '100%',
  height: scale(48),
  borderWidth: 1,
  borderRadius: scale(12),
  paddingHorizontal: scale(16),
  fontSize: scale(16),
  color: theme.colors.text,
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.primary,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.normal)
}))

