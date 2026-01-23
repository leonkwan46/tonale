import styled from '@emotion/native'
import { Link, Stack } from 'expo-router'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Title>This screen does not exist.</Title>
        <StyledLink href="/">
          <LinkText>Go to home screen!</LinkText>
        </StyledLink>
      </Container>
    </>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: theme.colors.background
}))

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: 16,
  fontFamily: getSourGummyFontFamily('bold')
}))

const StyledLink = styled(Link)({
  marginTop: 15,
  paddingVertical: 15
})

const LinkText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: 16,
  textDecorationLine: 'underline',
  fontFamily: getSourGummyFontFamily('400')
}))
