import styled from '@emotion/native'
import { Image, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const PurchaseButtonContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  paddingVertical: theme.device.isTablet ? scale(12) : scale(16),
  paddingHorizontal: theme.device.isTablet ? scale(16) : scale(20),
  borderWidth: 1,
  borderColor: theme.colors.border,
  gap: theme.device.isTablet ? scale(12) : scale(16)
}))

export const CoffeeIcon = styled(Image)(({ theme }) => ({
  width: theme.device.isTablet ? scale(30) : scale(40),
  height: theme.device.isTablet ? scale(30) : scale(40),
  resizeMode: 'contain'
}))

export const ButtonDescription = styled(Text)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const PriceText = styled(Text)(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(16) : scale(18),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold')
}))
