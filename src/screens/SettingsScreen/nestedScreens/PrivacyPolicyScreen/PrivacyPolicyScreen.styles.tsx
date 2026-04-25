import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { ScrollView, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getTabBarHeight } from '@/globalComponents/CustomTabBar/CustomTabBar.styles'

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const ScrollContentContainer = styled(View)(({ theme }) => ({
  flexGrow: 1,
  paddingHorizontal: theme.device.isTablet ? scale(24) : scale(20),
  paddingTop: theme.device.isTablet ? scale(16) : scale(12),
  paddingBottom: getTabBarHeight(theme)
}))

export const LastUpdatedText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.device.isTablet ? scale(20) : scale(16)
}))

export const SectionTitleWrapper = styled.View(({ theme }) => ({
  marginTop: theme.device.isTablet ? scale(24) : scale(20),
  marginBottom: theme.device.isTablet ? scale(10) : scale(8),
  paddingBottom: theme.device.isTablet ? scale(8) : scale(6),
  borderBottomWidth: 2,
  borderBottomColor: theme.colors.primary
}))

export const SectionTitleFirst = styled(SectionTitleWrapper)(() => ({
  marginTop: 0
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  letterSpacing: 0.3
}))

const paragraphLine = (theme: { device: { isTablet: boolean } }) => ({
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
})

export const Paragraph = styled(Typography)(({ theme }) => ({
  ...paragraphLine(theme),
  marginBottom: theme.device.isTablet ? scale(12) : scale(10)
}))

export const ParagraphPlain = styled(Typography)(({ theme }) => ({
  ...paragraphLine(theme)
}))

export const ParagraphBold = styled(Typography)(({ theme }) => ({
  ...paragraphLine(theme)
}))

export const ParagraphItalic = styled(Typography)(({ theme }) => ({
  ...paragraphLine(theme)
}))

export const ParagraphHighlight = styled(Typography)(({ theme }) => ({
  ...paragraphLine(theme)
}))
