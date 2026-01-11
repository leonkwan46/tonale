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

export const ScrollContent = styled.View({
  padding: scale(20),
  gap: scale(20)
})

export const ContentContainer = styled.View(({ theme }) => ({
  padding: scale(20),
  gap: scale(20)
}))

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  paddingHorizontal: scale(10)
}))

export const LogoutCard = styled.View(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: scale(12),
  borderWidth: 1,
  borderColor: theme.colors.error,
  paddingHorizontal: scale(10)
}))
