import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLCardContainer = styled.View<{ isTablet: boolean, isTextTerm?: boolean }>(({ theme, isTablet, isTextTerm }) => ({
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    maxWidth: isTablet ? 600 : 380,
    minHeight: isTextTerm ? (isTablet ? scale(115) : scale(135)) : (isTablet ? scale(115) : scale(135)),
    position: 'relative'
  }))
