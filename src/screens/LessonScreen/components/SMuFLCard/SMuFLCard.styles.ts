import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SMuFLCardContainer = styled.View<{ isTextTerm?: boolean }>(({ theme, isTextTerm }) => ({
    backgroundColor: theme.colors.surface,
    borderRadius: scale(theme.borderRadius.lg),
    borderWidth: scale(1),
    borderColor: theme.colors.text,
    width: '75%',
    maxWidth: theme.device.isTablet ? scale(600) : scale(380),
    minHeight: isTextTerm ? (theme.device.isTablet ? scale(115) : scale(135)) : (theme.device.isTablet ? scale(115) : scale(135)),
    position: 'relative'
  }))
