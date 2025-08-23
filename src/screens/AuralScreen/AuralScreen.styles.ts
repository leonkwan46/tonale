import { Colors } from '@/constants/Colors'
import styled from '@emotion/native'

export const Container = styled.View<{ colorScheme: 'light' | 'dark' }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => Colors[props.colorScheme].background};
  padding: 20px;
`

export const Title = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 32px;
  font-weight: bold;
  color: ${props => Colors[props.colorScheme].text};
  margin-bottom: 16px;
  text-align: center;
`

export const Subtitle = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 18px;
  color: ${props => Colors[props.colorScheme].text};
  margin-bottom: 24px;
  text-align: center;
  opacity: 0.8;
`

export const Description = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 16px;
  color: ${props => Colors[props.colorScheme].text};
  text-align: center;
  opacity: 0.6;
  line-height: 24px;
`

