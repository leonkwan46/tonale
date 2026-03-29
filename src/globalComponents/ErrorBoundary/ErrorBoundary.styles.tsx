import { Typography } from '@/compLib/Typography'
import { useTheme } from '@emotion/react'
import styled from '@emotion/native'
import { ScrollView } from 'react-native'

export const ErrorBoundaryScroll = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  return (
    <ScrollContainer
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg
      }}
    >
      {children}
    </ScrollContainer>
  )
}

const ScrollContainer = styled(ScrollView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing.md
}))

export const Message = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing.lg
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing.md,
  marginBottom: theme.spacing.sm
}))

export const ErrorText = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md
}))

export const StackText = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md
}))

export const ReloadButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.sm,
  marginTop: theme.spacing.lg,
  alignItems: 'center'
}))

export const ReloadText = styled(Typography)(() => ({}))
