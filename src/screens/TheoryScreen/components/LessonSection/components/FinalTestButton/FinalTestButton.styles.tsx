import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { LinearGradient } from 'expo-linear-gradient'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

const FINAL_TEST_HEIGHT = scale(110)
const FINAL_TEST_WIDTH = '95%'

export const FinalTestWrapper = styled.View(({ theme }) => ({
  width: '100%',
  marginVertical: scale(theme.spacing.md),
  alignItems: 'center',
  justifyContent: 'center'
}))

export const FinalTestButtonContainer = styled.View({
  width: FINAL_TEST_WIDTH,
  height: FINAL_TEST_HEIGHT
})

const FinalTestGradientStyled = styled(LinearGradient)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: scale(theme.borderRadius['2xl'])
}))

export const FinalTestGradient = () => {
  const theme = useTheme()
  return (
    <FinalTestGradientStyled
      colors={theme.colors.finalTest.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  )
}

export const FinalTestIconContainer = styled.View(({ theme }) => ({
  width: scale(50),
  height: scale(50),
  borderRadius: scale(theme.borderRadius['2xl']),
  backgroundColor: theme.colors.warning,
  alignItems: 'center',
  justifyContent: 'center'
}))

export const FinalTestTitle = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.lg),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('900')
}))

export const FinalTestDescription = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('600')
}))

export const FinalTestContentContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: scale(theme.spacing.xl),
  width: '100%',
  height: '100%',
  position: 'relative'
}))

export const FinalTestTextWrapper = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})
