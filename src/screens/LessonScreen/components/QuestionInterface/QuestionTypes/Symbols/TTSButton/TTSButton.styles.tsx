import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const TTSButtonRoot = styled(PressableOpacity07)<{ disabled?: boolean }>(({ theme, disabled }) => ({
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
