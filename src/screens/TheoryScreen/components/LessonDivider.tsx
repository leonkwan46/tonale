import styled from '@emotion/native'

const DividerContainer = styled.View(({ theme }) => ({
  width: '100%',
  alignItems: 'center'
}))

const DividerLine = styled.View(({ theme }) => ({
  width: '95%',
  height: theme.device.isTablet ? 2 : 1,
  backgroundColor: theme.colors.primary,
  opacity: 0.5
}))

export const LessonDivider = () => {
  return (
    <DividerContainer>
      <DividerLine />
    </DividerContainer>
  )
}
