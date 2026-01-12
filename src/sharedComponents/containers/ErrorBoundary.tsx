import styled from '@emotion/native'
import { Component, ReactNode } from 'react'
import { useColorScheme } from 'react-native'

import { Colors } from '@/config/theme/Colors'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

interface ErrorInfo {
  componentStack?: string
  [key: string]: unknown
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error Boundary caught an error:', error)
    console.error('🚨 Error Info:', errorInfo)
    console.error('🚨 Stack Trace:', error.stack)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error, errorInfo }: { error?: Error, errorInfo?: ErrorInfo }) {
  const colorScheme = useColorScheme() ?? 'light'
  const colors = Colors[colorScheme]
  
  return (
    <ScrollContainer colorScheme={colorScheme} colors={colors}>
      <Title colorScheme={colorScheme} colors={colors}>🚨 Error Caught</Title>
      <Message colorScheme={colorScheme} colors={colors}>
        The app encountered an error. Check the details below:
      </Message>
      
      {error && (
        <>
          <SectionTitle colorScheme={colorScheme} colors={colors}>Error Message:</SectionTitle>
          <ErrorText colorScheme={colorScheme} colors={colors}>
            {error.message}
          </ErrorText>
          
          {error.stack && (
            <>
              <SectionTitle colorScheme={colorScheme} colors={colors}>Stack Trace:</SectionTitle>
              <StackText colorScheme={colorScheme} colors={colors}>
                {error.stack}
              </StackText>
            </>
          )}
        </>
      )}
      
      {errorInfo && errorInfo.componentStack && (
        <>
          <SectionTitle colorScheme={colorScheme} colors={colors}>Component Stack:</SectionTitle>
          <StackText colorScheme={colorScheme} colors={colors}>
            {errorInfo.componentStack}
          </StackText>
        </>
      )}
      
      <ReloadButton colorScheme={colorScheme} colors={colors}>
        <ReloadText colorScheme={colorScheme} colors={colors}>
          Check Metro terminal for more details
        </ReloadText>
      </ReloadButton>
    </ScrollContainer>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}

const ScrollContainer = styled.ScrollView<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
  padding: 20
}))

const Title = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  fontSize: 24,
  color: colors.error,
  marginBottom: 16,
  textAlign: 'center',
  fontFamily: getSourGummyFontFamily('bold')
}))

const Message = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  fontSize: 16,
  color: colors.text,
  textAlign: 'center',
  marginBottom: 24,
  opacity: 0.8,
  fontFamily: getSourGummyFontFamily('400')
}))

const SectionTitle = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  fontSize: 18,
  color: colors.text,
  marginTop: 16,
  marginBottom: 8,
  fontFamily: getSourGummyFontFamily('600')
}))

const ErrorText = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  fontSize: 14,
  color: colors.error,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: colors.surface,
  padding: 12,
  borderRadius: 8,
  marginBottom: 16
}))

const StackText = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  fontSize: 12,
  color: colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  backgroundColor: colors.surface,
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
  opacity: 0.8
}))

const ReloadButton = styled.View<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  backgroundColor: colors.primary,
  padding: 16,
  borderRadius: 8,
  marginTop: 24,
  alignItems: 'center'
}))

const ReloadText = styled.Text<{ colorScheme: 'light' | 'dark', colors: typeof Colors.light }>(({ colors }) => ({
  color: colors.background,
  fontSize: 16,
  fontFamily: getSourGummyFontFamily('600')
}))
