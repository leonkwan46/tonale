import styled from '@emotion/native'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ContentContainer = styled.View`
  padding: 20px;
`

export const ScreenTitle = styled.Text`
  font-family: ${getSourGummyFontFamily('800')};
  font-size: 32px;
  color: #2D3748;
  margin-bottom: 24px;
  text-align: center;
`

export const StageContainer = styled.View`
  margin-bottom: 32px;
`

export const StageTitle = styled.Text`
  font-family: ${getSourGummyFontFamily('700')};
  font-size: 24px;
  color: #4A5568;
  margin-bottom: 16px;
`

interface LessonCardProps {
  isLocked?: boolean
}

export const LessonCard = styled.TouchableOpacity<LessonCardProps>`
  background-color: ${({ isLocked }) => (isLocked ? '#E2E8F0' : '#FFFFFF')};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  opacity: ${({ isLocked }) => (isLocked ? 0.6 : 1)};
`

interface LessonTextProps {
  isLocked?: boolean
}

export const LessonTitle = styled.Text<LessonTextProps>`
  font-family: ${getSourGummyFontFamily('600')};
  font-size: 18px;
  color: ${({ isLocked }) => (isLocked ? '#718096' : '#2D3748')};
  margin-bottom: 4px;
`

export const LessonDescription = styled.Text<LessonTextProps>`
  font-family: ${getSourGummyFontFamily('400')};
  font-size: 14px;
  color: ${({ isLocked }) => (isLocked ? '#A0AEC0' : '#718096')};
`
