import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { Typography } from '@/compLib/Typography'

export const HeaderContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  width: '100%',
  gap: theme.device.isTablet ? scale(2) : scale(theme.spacing.sm)
}))

export const TitlesContainer = styled.View(() => ({
  flexDirection: 'column',
  width: '100%'
}))

export const Title = styled(Typography)(() => ({}))

export const Subtitle = styled(Typography)(() => ({}))

