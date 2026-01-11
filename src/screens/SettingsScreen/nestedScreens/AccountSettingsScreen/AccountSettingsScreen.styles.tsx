import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  paddingHorizontal: scale(10)
}))
