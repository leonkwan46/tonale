import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const MessageText = styled(Typography)(({ theme }) => ({
  lineHeight: theme.device.isTablet
    ? scale(theme.typography.lg)
    : scale(theme.typography.lg)
}))
