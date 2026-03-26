import { useRouter } from 'expo-router'
import { Component, ReactNode } from 'react'

import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import {
  ErrorText,
  Message,
  ReloadButton,
  ReloadText,
  ScrollContainer,
  SectionTitle,
  StackText,
  Title
} from './ErrorBoundary.styles'

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
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error)
      console.error('ErrorBoundary errorInfo:', errorInfo)
      console.error('ErrorBoundary stack:', error.stack)
    }
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />
      )
    }

    return this.props.children
  }
}

const ErrorFallback = ({ error, errorInfo }: { error?: Error, errorInfo?: ErrorInfo }) => {
  const router = useRouter()

  const goHome = () => {
    router.replace('/')
  }

  return (
    <ScreenContainer includeBottomPadding>
      <ScrollContainer>
        <Title>Something went wrong</Title>
        <Message>
          Tonale hit a snag and couldn&apos;t finish what you were doing. Please try again.
        </Message>

        {__DEV__ && error && (
          <>
            <SectionTitle>Error Message:</SectionTitle>
            <ErrorText>
              {error.message}
            </ErrorText>

            {error.stack && (
              <>
                <SectionTitle>Stack Trace:</SectionTitle>
                <StackText>
                  {error.stack}
                </StackText>
              </>
            )}
          </>
        )}

        {__DEV__ && errorInfo && errorInfo.componentStack && (
          <>
            <SectionTitle>Component Stack:</SectionTitle>
            <StackText>
              {errorInfo.componentStack}
            </StackText>
          </>
        )}

        <ReloadButton onTouchEnd={goHome}>
          <ReloadText>Go to Home</ReloadText>
        </ReloadButton>
      </ScrollContainer>
    </ScreenContainer>
  )
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}
