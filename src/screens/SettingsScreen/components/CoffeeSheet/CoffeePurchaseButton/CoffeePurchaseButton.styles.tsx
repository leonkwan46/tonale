import styled from '@emotion/native'
import { Image, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const PurchaseButtonContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  padding: theme.device.isTablet ? scale(16) : scale(14),
  borderWidth: 1,
  borderColor: theme.colors.border
}))

export const CoffeeIcon = styled(Image)(({ theme }) => ({
  width: theme.device.isTablet ? scale(48) : scale(40),
  height: theme.device.isTablet ? scale(48) : scale(40),
  resizeMode: 'contain',
  marginRight: theme.device.isTablet ? scale(16) : scale(12)
}))

export const ButtonDescription = styled(Text)(({ theme }) => ({
  flex: 1,
  fontSize: theme.device.isTablet ? scale(16) : scale(14),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(22) : scale(20)
}))

export const PriceText = styled(Text)(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(18) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('bold'),
  marginLeft: theme.device.isTablet ? scale(16) : scale(12)
}))
