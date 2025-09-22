import styled from '@emotion/native'
import { Dimensions } from 'react-native'

// Get screen width for responsive sizing
const { width: screenWidth } = Dimensions.get('window')

// Calculate responsive padding based on screen width
export const getCardPadding = (): number => {
  // Scale padding based on screen width as a percentage
  const basePadding = Math.max(12, Math.min(24, screenWidth * 0.05))
  return Math.round(basePadding)
}

export const DisplayCardContainer = styled.View<{ isTablet: boolean; extraHeight?: boolean }>`
  background-color: #ffffff;
  border-radius: 16px;
  border-width: 1px;
  border-color: #000;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${({ isTablet }) => isTablet ? '460px' : '360px'};
  min-height: ${({ extraHeight }) => extraHeight ? '300px' : '200px'};

  // Tablet specific styles for increasing the size of music staff
  ${({ isTablet, extraHeight }) => isTablet && `
    transform: scale(1.4);
  `}
`
