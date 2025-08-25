import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import { componentDimensions } from '../../../../../constants/theme'

export const DescriptionTextContainer = styled.View(({ theme }) => ({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: scale(10),
    height: scale(componentDimensions.cardButton.size), // Match CardButton height from shared constants
    width: '100%', // Ensure full width for text wrapping
    flex: 1 // Allow container to grow/shrink as needed
  }))

export const TitleText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%'
}))

export const DescriptionText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  flexWrap: 'wrap',
  width: '100%',
  flexShrink: 1 // Allow text to shrink and wrap when needed
}))