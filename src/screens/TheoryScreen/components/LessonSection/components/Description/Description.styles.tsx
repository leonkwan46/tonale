import { componentDimensions } from '@/constants/theme';
import styled from '@emotion/native';
import { scale } from 'react-native-size-matters';

export const DescriptionTextContainer = styled.View(({ theme }) => ({
    flexDirection: 'column',
    justifyContent: 'center',
    gap: scale(10),
    height: scale(componentDimensions.cardButton.size),
    width: '100%',
    flex: 1
  }))

export const TitleText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? theme.typography['4xl'] : theme.typography.lg,
  fontWeight: 'bold',
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%'
}))
export const DescriptionText = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? theme.typography['2xl'] : theme.typography.base,
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%',
  flexShrink: 1
}))
