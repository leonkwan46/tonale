import styled from '@emotion/native'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const PlayButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`

interface PlayButtonProps {
  isPlaying: boolean
}

export const PlayButton = styled.View<PlayButtonProps>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ isPlaying }) => (isPlaying ? '#FF6B6B' : '#4ECDC4')};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 8;
`

export const PlayButtonText = styled.Text`
  font-family: ${getSourGummyFontFamily('700')};
  font-size: 16px;
  color: #FFFFFF;
`
