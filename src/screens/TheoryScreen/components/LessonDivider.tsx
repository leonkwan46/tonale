import { useDevice } from '@/hooks'
import styled from '@emotion/native'

const DividerContainer = styled.View(({ theme }) => ({
  width: '100%',
  alignItems: 'center'
}))

const DividerLine = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  width: '95%',
  height: isTablet ? 2 : 1,
  backgroundColor: theme.colors.primary,
  opacity: 0.5
}))

export const LessonDivider = () => {
  const { isTablet } = useDevice()
  
  return (
    <DividerContainer>
      <DividerLine isTablet={isTablet} />
    </DividerContainer>
  )
}
