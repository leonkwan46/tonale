import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { scale } from 'react-native-size-matters'

export const useTextColor = () => useTheme().colors.text

export const SectionContainer = styled.View(({ theme }) => ({
  width: '100%',
  gap: theme.device.isTablet ? scale(theme.spacing.sm) : scale(theme.spacing.md)
}))

export const SectionTitle = styled(Typography)(() => ({}))

