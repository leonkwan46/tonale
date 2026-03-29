import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const DescriptionTextContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  gap: scale(theme.spacing.sm),
  width: '100%',
  flex: 1
}))

export const TitleText = styled(Typography)(() => ({
  flexWrap: 'wrap',
  width: '100%'
}))

export const DescriptionText = styled(Typography)(() => ({
  flexWrap: 'wrap',
  width: '100%',
  flexShrink: 1
}))
