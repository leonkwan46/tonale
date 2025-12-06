import { Colors } from '@/constants/Colors'
import styled from '@emotion/native'
import { Component, ReactNode } from 'react'
import { useColorScheme } from 'react-native'

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
  
  return (
    <ScrollContainer colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>🚨 Error Caught</Title>
      <Message colorScheme={colorScheme}>
        The app encountered an error. Check the details below:
      </Message>
      
      {error && (
        <>
          <SectionTitle colorScheme={colorScheme}>Error Message:</SectionTitle>
          <ErrorText colorScheme={colorScheme}>
            {error.message}
          </ErrorText>
          
          {error.stack && (
            <>
              <SectionTitle colorScheme={colorScheme}>Stack Trace:</SectionTitle>
              <StackText colorScheme={colorScheme}>
                {error.stack}
              </StackText>
            </>
          )}
        </>
      )}
      
      {errorInfo && errorInfo.componentStack && (
        <>
          <SectionTitle colorScheme={colorScheme}>Component Stack:</SectionTitle>
          <StackText colorScheme={colorScheme}>
            {errorInfo.componentStack}
          </StackText>
        </>
      )}
      
      <ReloadButton colorScheme={colorScheme}>
        <ReloadText colorScheme={colorScheme}>
          Check Metro terminal for more details
        </ReloadText>
      </ReloadButton>
    </ScrollContainer>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}

const ScrollContainer = styled.ScrollView<{ colorScheme: 'light' | 'dark' }>`
  flex: 1
  background-color: ${props => Colors[props.colorScheme].background}
  padding: 20px
`

const Title = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 24px
  color: ${props => Colors[props.colorScheme].error}
  margin-bottom: 16px
  text-align: center
  font-family: "${getSourGummyFontFamily('bold')}"
`

const Message = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 16px
  color: ${props => Colors[props.colorScheme].text}
  text-align: center
  margin-bottom: 24px
  opacity: 0.8
  font-family: "${getSourGummyFontFamily('400')}"
`

const SectionTitle = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 18px
  color: ${props => Colors[props.colorScheme].text}
  margin-top: 16px
  margin-bottom: 8px
  font-family: "${getSourGummyFontFamily('600')}"
`

const ErrorText = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 14px
  color: ${props => Colors[props.colorScheme].error}
  font-family: "${getSourGummyFontFamily('400')}"
  background-color: ${props => Colors[props.colorScheme].surface}
  padding: 12px
  border-radius: 8px
  margin-bottom: 16px
`

const StackText = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 12px
  color: ${props => Colors[props.colorScheme].text}
  font-family: "${getSourGummyFontFamily('400')}"
  background-color: ${props => Colors[props.colorScheme].surface}
  padding: 12px
  border-radius: 8px
  margin-bottom: 16px
  opacity: 0.8
`

const ReloadButton = styled.View<{ colorScheme: 'light' | 'dark' }>`
  background-color: ${props => Colors[props.colorScheme].primary}
  padding: 16px
  border-radius: 8px
  margin-top: 24px
  align-items: center
`

const ReloadText = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  color: ${props => props.colorScheme === 'light' ? '#ffffff' : '#000000'}
  font-size: 16px
  font-family: "${getSourGummyFontFamily('600')}"
`
