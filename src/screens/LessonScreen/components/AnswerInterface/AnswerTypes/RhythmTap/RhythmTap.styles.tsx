import styled from '@emotion/native'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

interface TapButtonProps {
  state: 'default' | 'correct' | 'incorrect'
  isRecording: boolean
  disabled: boolean
}

export const TapButton = styled.View<TapButtonProps>`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-items: center;
  justify-content: center;

  ${({ state, isRecording, disabled }) => {
    if (disabled) return 'background-color: #CCCCCC;'
    if (state === 'correct') return 'background-color: #4ECDC4;'
    if (state === 'incorrect') return 'background-color: #FF6B6B;'
    if (isRecording) return 'background-color: #FFD93D;'
    return 'background-color: #6C63FF;'
  }}

  /* 3D effect */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 8;
`

export const TapButtonText = styled.Text`
  font-family: ${getSourGummyFontFamily('700')};
  font-size: 24px;
  color: #FFFFFF;
`
