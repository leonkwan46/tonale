import { useTheme } from '@emotion/react'
import { Typography } from '@/compLib/Typography'
import styled from '@emotion/native'
import type { ComponentProps } from 'react'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
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

export const QuestionText = styled(Typography)(({ theme }) => ({
  paddingVertical: scale(theme.spacing.sm)
}))
