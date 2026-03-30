import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const TypewriterText = styled(Typography)(({ theme }) => ({
  lineHeight: theme.device.isTablet ? scale(26) : scale(22)
}))
