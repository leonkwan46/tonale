import styled from '@emotion/native'

export const DisplayCardContainer = styled.View<{ isTablet: boolean; extraHeight?: boolean }>(({ theme, isTablet, extraHeight }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: theme.colors.border,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: isTablet ? 460 : 360,
  minHeight: extraHeight ? 300 : 200,
  // Tablet specific styles for increasing the size of music staff
  ...(isTablet && {
    transform: [{ scale: 1.4 }]
  })
}))
