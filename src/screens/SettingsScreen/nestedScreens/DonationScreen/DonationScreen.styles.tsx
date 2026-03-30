import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { Image, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const ScrollContentContainer = styled.View({
  flexGrow: 1
})

export const CharacterImage = styled(Image)(({ theme }) => ({
  width: theme.device.isTablet ? scale(200) : scale(160),
  height: theme.device.isTablet ? scale(200) : scale(160),
  alignSelf: 'center',
  resizeMode: 'contain',
  marginBottom: theme.device.isTablet ? scale(24) : scale(20)
}))

export const NarrativeContainer = styled.View(({ theme }) => ({
  marginBottom: theme.device.isTablet ? scale(32) : scale(28),
  paddingHorizontal: theme.device.isTablet ? scale(24) : scale(20)
}))

export const NarrativeLine = styled.View(({ theme }) => ({
  marginBottom: theme.device.isTablet ? scale(8) : scale(6)
}))

export const NarrativeText = styled(Typography)(({ theme }) => ({
  lineHeight: theme.device.isTablet ? scale(26) : scale(22)
}))

export const ButtonsContainer = styled.View(({ theme }) => ({
  gap: theme.device.isTablet ? scale(16) : scale(12),
  paddingHorizontal: theme.device.isTablet ? scale(24) : scale(20),
  paddingBottom: theme.device.isTablet ? scale(32) : scale(24)
}))
