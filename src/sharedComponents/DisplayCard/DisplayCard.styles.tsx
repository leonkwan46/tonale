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
  padding: ${getCardPadding()}px;
  border-radius: 16px;
  border-width: 1px;
  border-color: #e5e7eb;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-offset: 0px 6px;
  shadow-radius: 16px;
  elevation: 8;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 460px;
  min-height: ${({ extraHeight }) => extraHeight ? '320px' : '200px'};
  margin: 0 auto;

  // Tablet specific styles for increasing the size of music staff
  ${({ isTablet }) => isTablet && `
    transform: scale(1.4);
    marginTop: 60px;
    marginBottom: 80px;
  `}
`
