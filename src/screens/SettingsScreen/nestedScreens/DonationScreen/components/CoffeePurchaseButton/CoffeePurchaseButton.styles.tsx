import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import { Image } from 'react-native'
import { scale } from 'react-native-size-matters'

import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const PurchaseButtonContainer = styled(PressableOpacity07)(({ theme }) => ({
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

export const ButtonDescription = styled(Typography)(() => ({
  flex: 1
}))

export const PriceText = styled(Typography)(() => ({}))
