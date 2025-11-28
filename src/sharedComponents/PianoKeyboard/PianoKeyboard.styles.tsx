import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const WHITE_KEY_HEIGHT = scale(145)
export const WHITE_KEY_WIDTH = scale(42)
export const WHITE_KEY_MARGIN = scale(1)
export const BLACK_KEY_HEIGHT = scale(80)
export const BLACK_KEY_WIDTH = scale(35)
export const BLACK_KEY_OFFSET = WHITE_KEY_WIDTH / 2 - BLACK_KEY_WIDTH / 2 + scale(23)

export const KeyboardContainer = styled.View(({ theme }) => ({
  width: '100%',
  marginBottom: scale(20),
  position: 'relative',
  height: WHITE_KEY_HEIGHT,
  alignItems: 'center'
}))

export const KeysRow = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  position: 'relative',
  zIndex: 1
}))

export const Key = styled.TouchableOpacity<{ isBlack: boolean; isSelected: boolean; isCorrect: boolean; isIncorrect: boolean }>(
  ({ theme, isBlack, isSelected, isCorrect, isIncorrect }) => {
    let backgroundColor: string
    let borderWidth = scale(1)
    let borderColor = theme.colors.border

    if (isSelected) {
      if (isCorrect) {
        backgroundColor = theme.colors.success
      } else if (isIncorrect) {
        backgroundColor = theme.colors.error
      } else {
        backgroundColor = theme.colors.primary
      }
    } else {
      backgroundColor = isBlack ? '#1a1a1a' : '#FFFFFF'
    }

    return {
      marginHorizontal: WHITE_KEY_MARGIN,
      borderRadius: isBlack ? scale(2) : scale(4),
      justifyContent: isBlack ? 'center' : 'flex-end',
      alignItems: 'center',
      paddingBottom: isBlack ? 0 : scale(8),
      minWidth: isBlack ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH,
      height: isBlack ? BLACK_KEY_HEIGHT : WHITE_KEY_HEIGHT,
      backgroundColor,
      borderWidth: isBlack ? 0 : borderWidth,
      borderColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: isBlack ? scale(2) : scale(1)
      },
      shadowOpacity: isBlack ? 0.3 : 0.1,
      shadowRadius: isBlack ? scale(3) : scale(2),
      elevation: isBlack ? 3 : 1
    }
  }
)

export const KeyboardWrapper = styled.View<{ totalWidth: number }>(({ totalWidth }) => ({
  width: totalWidth,
  position: 'relative',
  height: WHITE_KEY_HEIGHT,
  alignSelf: 'center'
}))

export const BlackKeysContainer = styled.View<{ totalWidth: number }>(({ totalWidth }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: totalWidth,
  height: BLACK_KEY_HEIGHT,
  zIndex: 10
}))

export const BlackKeyWrapper = styled.View<{ left: number }>(({ left }) => ({
  position: 'absolute',
  left,
  width: BLACK_KEY_WIDTH,
  zIndex: 10
}))
