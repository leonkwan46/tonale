import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'

export const ContentWrapper = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export const TopText = styled(Typography)(() => ({}))

export const BottomText = styled(Typography)(() => ({}))
