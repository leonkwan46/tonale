import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

export const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const ScrollContent = styled.View(({ theme }) => ({
  padding: scale(theme.spacing.lg),
  gap: scale(theme.spacing.lg)
}))

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(theme.spacing.lg),
  gap: scale(theme.spacing.lg)
}))

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(theme.borderRadius.md),
  paddingHorizontal: scale(theme.spacing.sm)
}))

export const LogoutCard = styled.View(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: scale(theme.borderRadius.md),
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: scale(theme.spacing.sm)
}))
