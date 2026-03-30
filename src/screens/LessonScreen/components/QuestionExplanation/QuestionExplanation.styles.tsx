import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const ExplanationText = styled(Typography)(({ theme }) => ({
  color: theme.components.notation.text,
  lineHeight: theme.device.isTablet ? scale(20) : scale(24)
}))

