import { useRouter } from 'expo-router'
import { Component, ReactNode } from 'react'

import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import {
  ErrorBoundaryScroll,
  ErrorText,
  Message,
  ReloadButton,
  ReloadText,
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
      <ErrorBoundaryScroll>
        <Title size="xl" weight="bold" align="center" colorVariant="error">
          Something went wrong
        </Title>
        <Message size="md" align="center" muted>
          Tonale hit a snag and couldn&apos;t finish what you were doing. Please try
          again.
        </Message>

        {__DEV__ && error && (
          <>
            <SectionTitle size="lg" weight="semibold">
              Error Message:
            </SectionTitle>
            <ErrorText size="sm" colorVariant="error">
              {error.message}
            </ErrorText>

            {error.stack && (
              <>
                <SectionTitle size="lg" weight="semibold">
                  Stack Trace:
                </SectionTitle>
                <StackText size="sm" muted>
                  {error.stack}
                </StackText>
              </>
            )}
          </>
        )}

        {__DEV__ && errorInfo && errorInfo.componentStack && (
          <>
            <SectionTitle size="lg" weight="semibold">
              Component Stack:
            </SectionTitle>
            <StackText size="sm" muted>
              {errorInfo.componentStack}
            </StackText>
          </>
        )}

        <ReloadButton onTouchEnd={goHome}>
          <ReloadText size="md" weight="semibold" colorVariant="primaryContrast">
            Go to Home
          </ReloadText>
        </ReloadButton>
      </ErrorBoundaryScroll>
    </ScreenContainer>
  )
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}
