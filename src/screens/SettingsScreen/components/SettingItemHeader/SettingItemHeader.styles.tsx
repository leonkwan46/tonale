import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Header = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(theme.spacing.md),
  paddingHorizontal: scale(theme.spacing.lg),
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
  position: 'relative'
}))

export const BackButton = styled(TouchableOpacity)(({ theme }) => ({
  position: 'absolute',
  left: scale(theme.spacing.lg),
  width: scale(30),
  height: scale(30),
  borderRadius: scale(20),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center'
}))

export const Title = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.lg || 20),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold || '700')
}))

