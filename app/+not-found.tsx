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
  padding: theme.spacing.lg,
  backgroundColor: theme.colors.background
}))

const Title = styled.Text(({ theme }) => ({
  fontSize: theme.typography.xl,
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: theme.spacing.md,
  fontFamily: getSourGummyFontFamily('bold')
}))

const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing.md,
  paddingVertical: theme.spacing.md
}))

const LinkText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.typography.base,
  textDecorationLine: 'underline',
  fontFamily: getSourGummyFontFamily('400')
}))
