import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const SheetContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.surface,
  borderTopLeftRadius: scale(20),
  borderTopRightRadius: scale(20)
}))

export const SheetHandle = styled.View(({ theme }) => ({
  width: scale(40),
  height: scale(4),
  backgroundColor: theme.colors.border,
  borderRadius: scale(2),
  alignSelf: 'center',
  opacity: 0.5
}))

export const getBackgroundStyle = (theme: { colors: { surface: string } }) => ({
  backgroundColor: theme.colors.surface
})

export const sheetViewStyle = {
  flex: 1
}

export const handleIndicatorStyle: { backgroundColor: string; display: 'none' } = {
  backgroundColor: 'transparent',
  display: 'none'
}
