import styled from '@emotion/native'

export const DisplayCardContainer = styled.View<{ isTablet: boolean; minHeight?: number }>(({ theme, isTablet, minHeight = 200 }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: theme.colors.border,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: isTablet ? 460 : 360,
  minHeight,
  overflow: 'hidden',
  ...(isTablet && {
    transform: [{ scale: 1.4 }]
  })
}))
