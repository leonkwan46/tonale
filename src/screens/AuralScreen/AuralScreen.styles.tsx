import styled from '@emotion/native'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ContentWrapper = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export const TopText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const BottomText = styled.Text(({ theme }) => ({
  fontSize: theme.typography.base,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

