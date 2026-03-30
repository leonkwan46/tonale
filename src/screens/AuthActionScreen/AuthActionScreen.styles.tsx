import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Card = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: scale(theme.spacing.lg),
  justifyContent: 'center',
  gap: scale(theme.spacing.lg)
}))
