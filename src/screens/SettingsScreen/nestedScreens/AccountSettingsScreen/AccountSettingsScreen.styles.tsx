import styled from '@emotion/native'
import { ScrollView, View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: scale(theme.spacing.sm)
}))

export const Divider = styled(View)(({ theme }) => ({
  height: scale(1),
  backgroundColor: theme.colors.border
}))

export const DeleteAccountCard = styled.View(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: scale(theme.borderRadius.md),
  borderWidth: scale(1),
  borderColor: theme.colors.error,
  paddingHorizontal: scale(theme.spacing.sm)
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})
