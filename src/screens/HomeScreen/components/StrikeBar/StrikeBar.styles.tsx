import styled from '@emotion/native'
import { Dimensions, View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const screenWidth = Dimensions.get('window').width

const getCardWidth = (): number => {
  // Calculate card width: (screen width - ContentContainer padding - gaps) / 5 cards
  // ContentContainer has padding: scale(10) on all sides, so horizontal padding is scale(10) * 2
  const contentContainerPadding = scale(10) * 2 // left + right padding from ContentContainer
  const gaps = scale(8) * 4 // 4 gaps between 5 cards
  const availableWidth = screenWidth - contentContainerPadding - gaps
  return availableWidth / 5
}

export const StrikeBarContainer = styled(View)({
  flexDirection: 'row',
  gap: scale(8),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  alignSelf: 'center'
})

export const StrikeBarCard = styled(View)<{ 
  isActive: boolean
  isCompleted: boolean
}>(({ theme, isActive, isCompleted }) => {
  let backgroundColor = theme.colors.surface // Light blue for completed/upcoming
  
  if (isActive) {
    // Darker blue for active day - using primary color with opacity or a variant
    backgroundColor = theme.colors.primary
  }
  
  return {
    width: getCardWidth(),
    height: scale(80),
    borderRadius: scale(14),
    backgroundColor,
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    minWidth: scale(50)
  }
})

export const DayLabel = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

export const FlameIconContainer = styled(View)({
  justifyContent: 'center',
  alignItems: 'center'
})

