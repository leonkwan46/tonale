import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const PrimaryButton = styled(TouchableOpacity)<{ opacity: number; disabled: boolean }>(({ theme, opacity, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(16),
  borderRadius: scale(12),
  marginTop: scale(8),
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  opacity: disabled ? 0.5 : opacity,
  width: '100%'
}))

export const PrimaryButtonText = styled.Text`
  color: #fff;
  font-size: ${scale(16)};
  margin-right: ${scale(8)};
  font-family: "${getSourGummyFontFamily('600')}";
`

