import { useTheme } from '@emotion/react'
import styled from '@emotion/native'
import { Animated, Pressable } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { StarLogo } from '../LessonSection/components/Logo/StarLogo'

export const HeaderContainer = styled(Pressable)<{ isPerfect?: boolean }>(({ theme, isPerfect }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: scale(16),
  backgroundColor: isPerfect
    ? theme.components.stage.perfect
    : theme.components.stage.cleared,
  borderRadius: scale(12),
  borderWidth: isPerfect ? 2 : 0,
  borderColor: isPerfect ? theme.components.stage.perfectBorder : 'transparent'
}))

export const StageTitle = styled.Text<{ isPerfect?: boolean }>(({ theme, isPerfect }) => ({
  fontSize: scale(18),
  color: isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared,
  marginBottom: scale(4),
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const LeftContentContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(12)
})

export const TextContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: scale(4)
})

export const StageStats = styled.View({
  alignItems: 'flex-end'
})

export const StatsText = styled.Text<{ isPerfect?: boolean }>(({ theme, isPerfect }) => ({
  fontSize: scale(12),
  color: isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared,
  opacity: 0.85,
  fontFamily: getSourGummyFontFamily()
}))

export const ProgressBarWrapper = styled.View(() => ({
  width: scale(60),
  height: scale(4),
  borderRadius: scale(2),
  marginTop: scale(4),
  overflow: 'hidden',
  position: 'relative'
}))

export const ProgressTrack = styled.View<{ isPerfect?: boolean }>(({ theme, isPerfect }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared,
  opacity: 0.35,
  borderRadius: scale(2)
}))

export const ProgressFill = styled.View<{ width: string; isPerfect?: boolean }>(({ width, theme, isPerfect }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: width as `${number}%`,
  backgroundColor: isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared,
  borderRadius: scale(2),
  zIndex: 1
}))

export const ChevronIcon = styled(Animated.View)<{ isCollapsed: boolean; isPerfect?: boolean }>(({ isCollapsed, theme, isPerfect }) => ({
  width: scale(12),
  height: scale(12),
  borderTopWidth: 2,
  borderRightWidth: 2,
  borderColor: isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared,
  transform: [{ rotate: isCollapsed ? '135deg' : '-45deg' }]
}))

export function StageHeaderStarLogo({ isPerfect, size = 16 }: { isPerfect: boolean; size?: number }) {
  const theme = useTheme()
  const color = isPerfect
    ? theme.components.stage.textOnPerfect
    : theme.components.stage.textOnCleared
  return <StarLogo filled size={size} color={color} />
}
