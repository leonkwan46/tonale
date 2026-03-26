import styled from '@emotion/native'
import { ScrollView, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const ScrollContentContainer = styled(View)(({ theme }) => ({
  flexGrow: 1,
  paddingHorizontal: theme.device.isTablet ? scale(24) : scale(20),
  paddingTop: theme.device.isTablet ? scale(16) : scale(12),
  paddingBottom: theme.device.isTablet ? scale(32) : scale(24)
}))

export const LastUpdatedText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(11) : scale(12),
  color: theme.colors.text,
  opacity: 0.65,
  fontFamily: getSourGummyFontFamily(),
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

export const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(19) : scale(18),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.bold),
  letterSpacing: 0.3
}))

export const Paragraph = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20),
  marginBottom: theme.device.isTablet ? scale(12) : scale(10)
}))

export const ParagraphPlain = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
}))

export const ParagraphBold = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
}))

export const ParagraphItalic = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(undefined, true),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
}))

export const ParagraphHighlight = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(13) : scale(14),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
}))
