import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLCardContainer = styled.View<{ isTablet: boolean, isTextTerm?: boolean }>(({ theme, isTablet, isTextTerm }) => ({
    backgroundColor: '#ffffff',
    borderRadius: scale(16),
    borderWidth: scale(1),
    borderColor: '#000',
    width: '75%',
    maxWidth: isTablet ? scale(600) : scale(380),
    minHeight: isTextTerm ? (isTablet ? scale(115) : scale(135)) : (isTablet ? scale(115) : scale(135)),
    position: 'relative'
  }))
