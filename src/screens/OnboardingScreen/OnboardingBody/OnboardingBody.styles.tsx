import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ContentContainer = styled(ScrollView)(({ theme }) => ({
  padding: scale(10),
  flex: 1
}))

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 71, 87, 0.1);
  padding-horizontal: ${scale(16)};
  padding-vertical: ${scale(12)};
  border-radius: ${scale(8)};
  margin-bottom: ${scale(20)};
`

export const ErrorText = styled.Text`
  color: #ff4757;
  margin-left: ${scale(8)};
  flex: 1;
  font-family: "${getSourGummyFontFamily('400')}";
`

