import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const DescriptionText = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.base),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: scale(theme.typography.xl),
  textAlign: 'center'
}))

export const HeaderIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))
