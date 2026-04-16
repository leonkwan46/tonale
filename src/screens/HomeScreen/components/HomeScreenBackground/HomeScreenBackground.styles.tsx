import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getTabBarHeight } from '@/globalComponents/CustomTabBar/CustomTabBar.styles'

export const useGradientColors = (isDark: boolean): readonly [string, string, ...string[]] => {
  const theme = useTheme()
  const colors = isDark
    ? theme.components.homeScreen.gradient.dark
    : theme.components.homeScreen.gradient.light
  return colors as unknown as readonly [string, string, ...string[]]
}

export const HOME_SCREEN_H_PADDING = scale(15)

export const ContentContainer = styled.View(({ theme }) => ({
  paddingHorizontal: HOME_SCREEN_H_PADDING,
  paddingVertical: scale(theme.spacing.sm),
  gap: scale(theme.spacing.lg),
  alignItems: 'center'
}))

export const HomeScreenContainer = styled(View)({
  flex: 1,
  position: 'relative'
})

export const ScrollContentContainer = styled.View(() => ({
  flexGrow: 1
}))

export const ImageContainer = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative'
})

export const StageImage = styled(Image)<{ screenWidth: number }>(
  ({ screenWidth }) => ({
    width: screenWidth,
    height: screenWidth * 1.5,
    resizeMode: 'cover'
  })
)

export const AvatarImage = styled(Image)<{ screenWidth: number }>(
  ({ screenWidth, theme }) => ({
    position: 'absolute',
    bottom: scale(100),
    left: screenWidth / 2 - scale(65),
    right: 0,
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    resizeMode: 'contain'
  })
)

export const BackgroundGradient = styled(LinearGradient)({
  paddingBottom: scale(100)
})

export const StatusBarBlur = styled(BlurView)<{ height: number }>(({ height }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height,
  overflow: 'hidden'
}))

export const TabBarSpacer = styled(View)(({ theme }) => ({
  height: getTabBarHeight(theme)
}))
