import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export type ButtonColor = 'blue' | 'red' | 'green' | 'yellow' | 'grey'
export type LayoutType = 'grid' | 'row'

export const Button3DContainer = styled.TouchableOpacity<{ isPressed: boolean; layoutType?: LayoutType; fullWidth?: boolean }>(({ isPressed, layoutType, fullWidth }) => {
  const getWidth = () => {
    if (fullWidth) return '100%'
    if (layoutType === 'row') return '100%'
    if (layoutType === 'grid') return '50%'
    return 'auto'
  }

  return {
  position: 'relative',
    alignSelf: (layoutType === 'row' || fullWidth) ? 'stretch' : 'center',
    width: getWidth(),
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  activeOpacity: 1
  }
})
