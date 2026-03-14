import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const TTSButtonRoot = styled.TouchableOpacity<{ disabled?: boolean }>(({ theme, disabled }) => ({
  position: 'absolute',
  bottom: scale(8),
  right: scale(8),
  width: scale(32),
  height: scale(32),
  borderRadius: scale(16),
  backgroundColor: theme.colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disabled ? 0.5 : 1,
  ...theme.shadows.md
}))
