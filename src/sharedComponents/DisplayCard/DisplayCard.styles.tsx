import styled from '@emotion/native'

import { scale } from 'react-native-size-matters'

export const DisplayCardContainer = styled.View<{ minHeight?: number }>(({ theme, minHeight = 200 }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: theme.colors.border,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: theme.device.isTablet ? 460 : 360,
  minHeight,
  overflow: 'hidden',
  ...(theme.device.isTablet && {
    marginTop: scale(20),
    marginBottom: scale(20),
    transform: [{ scale: 1.4 }]
  })
}))
