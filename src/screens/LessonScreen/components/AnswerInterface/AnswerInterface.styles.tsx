import styled from '@emotion/native'
import { useDevice } from '@/hooks'

export const AnswerInterfaceContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  padding: isTablet ? theme.spacing.xl : theme.spacing.lg,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.spacing.sm,
  width: isTablet ? '95%' : '100%',
  maxWidth: isTablet ? '600px' : 'none',
  alignSelf: 'center'
}))

