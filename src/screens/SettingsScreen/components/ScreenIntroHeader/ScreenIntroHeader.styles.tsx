import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const DescriptionText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  lineHeight: scale(theme.typography.xl)
}))
