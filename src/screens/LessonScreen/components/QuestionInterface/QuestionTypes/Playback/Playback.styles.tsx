import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const PlaybackCard = styled.View<{ isTablet: boolean }>(({ isTablet }) => ({
  backgroundColor: '#E5E5EA',
  borderRadius: scale(20),
  paddingVertical: scale(32),
  paddingHorizontal: scale(24),
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: isTablet ? scale(400) : scale(320),
  minHeight: scale(200)
}))

export const PlaybackText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  fontSize: isTablet ? scale(18) : scale(20),
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'center',
  marginBottom: scale(24)
}))

export const PlayButton = styled.TouchableOpacity<{ isTablet: boolean }>(({ isTablet }) => ({
  width: isTablet ? scale(80) : scale(100),
  height: isTablet ? scale(80) : scale(100),
  borderRadius: isTablet ? scale(40) : scale(50),
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.8,
  overflow: 'hidden'
}))
