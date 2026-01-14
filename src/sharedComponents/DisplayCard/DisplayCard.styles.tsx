import styled from '@emotion/native'

import { scale } from 'react-native-size-matters'

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
    marginTop: scale(20),
    marginBottom: scale(20),
    transform: [{ scale: 1.4 }]
  })
}))
