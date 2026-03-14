import { useTheme } from '@emotion/react'
import styled from '@emotion/native'
import type { ComponentProps } from 'react'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import type { Theme } from '@emotion/react'

const scrollContentContainer = (theme: Theme) => ({
  flexGrow: 1,
  backgroundColor: theme.colors.surface
})

export const LessonScrollView = (props: ComponentProps<typeof ScrollView>) => {
  const theme = useTheme()
  return (
    <ScrollView
      {...props}
      contentContainerStyle={[scrollContentContainer(theme), props.contentContainerStyle]}
    />
  )
}

export const QuestionText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.base) : scale(theme.typography.lg),
  textAlign: 'center',
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold),
  paddingVertical: scale(theme.spacing.sm)
}))
