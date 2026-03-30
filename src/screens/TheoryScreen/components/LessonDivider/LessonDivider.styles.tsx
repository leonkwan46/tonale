import styled from '@emotion/native'

export const DividerContainer = styled.View(({ theme }) => ({
  width: '100%',
  alignItems: 'center'
}))

export const DividerLine = styled.View(({ theme }) => ({
  width: '95%',
  height: theme.device.isTablet ? 2 : 1,
  backgroundColor: theme.colors.primary,
  opacity: 0.5
}))
