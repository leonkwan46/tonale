import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'

export const AppNameContainer = styled(Animated.View)(() => ({}))

export const AppNameText = styled(Typography)(({ theme }) => ({
  marginBottom: scale(theme.spacing.xs),
  letterSpacing: scale(-0.5)
}))

export const EnvironmentContainer = styled(Animated.View)(() => ({}))

export const EnvironmentText = styled(Typography)(({ theme }) => ({
  marginBottom: scale(theme.spacing.sm),
  letterSpacing: scale(0.25)
}))

export const TaglineContainer = styled(Animated.View)(() => ({}))

export const TaglineText = styled(Typography)(({ theme }) => ({
  marginBottom: scale(theme.spacing.xxl),
  lineHeight: scale(22)
}))
