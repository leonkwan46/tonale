import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

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

export const BackButton = styled(PressableOpacity07)(({ theme }) => ({
  position: 'absolute',
  left: scale(theme.spacing.lg),
  width: scale(30),
  height: scale(30),
  borderRadius: scale(20),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center'
}))

export const Title = styled(Typography)(() => ({}))

