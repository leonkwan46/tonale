import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

export const ContentWrapper = styled(ScrollView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(10),
  gap: scale(20),
  alignItems: 'center'
}))
