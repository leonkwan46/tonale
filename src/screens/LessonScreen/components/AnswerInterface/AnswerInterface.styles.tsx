import styled from '@emotion/native'

export const AnswerInterfaceContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  padding: isTablet ? 0 : theme.spacing.lg,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.spacing.sm,
  width: isTablet ? '95%' : '100%',
  maxWidth: isTablet ? 600 : undefined,
  alignSelf: 'center'
}))
