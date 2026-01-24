import styled from '@emotion/native'
import { ScrollView } from 'react-native'

export const KeyboardContainer = styled.KeyboardAvoidingView(() => ({
  flex: 1
}))

export const StyledScrollView = styled(ScrollView)(() => ({
  flex: 1
}))
