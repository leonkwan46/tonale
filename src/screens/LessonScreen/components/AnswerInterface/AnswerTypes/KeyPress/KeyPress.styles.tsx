import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'
import { createForwardProps } from '@/utils/styledProps'

export const Container = styled(View)(({ theme }) => ({
    flex: 1,
    padding: scale(theme.spacing.lg),
    alignItems: 'center'
}))

export const FeedbackContainer = styled(View)(({ theme }) => ({
    marginTop: scale(theme.spacing.lg),
    alignItems: 'center'
}))

export const FeedbackText = styled(Typography, {
  shouldForwardProp: createForwardProps(['isCorrect'])
})<{ isCorrect: boolean }>(() => ({}))
