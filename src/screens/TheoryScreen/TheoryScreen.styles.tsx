import styled from '@emotion/native'

export const ContentWrapper = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export const TopText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text
}))

export const BottomText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text
}))
