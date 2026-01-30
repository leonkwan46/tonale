import { Component, ReactNode } from 'react'
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

const ErrorFallback = ({ error, errorInfo }: { error?: Error, errorInfo?: ErrorInfo }) => {
  return (
    <ScrollContainer>
      <Title>Oops! Something went wrong</Title>
      <Message>
        The app ran into a problem. Try restarting the app.
      </Message>

      {error && (
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

      {errorInfo && errorInfo.componentStack && (
        <>
          <SectionTitle>Component Stack:</SectionTitle>
          <StackText>
            {errorInfo.componentStack}
          </StackText>
        </>
      )}

      <ReloadButton>
        <ReloadText>
          Check Metro terminal for more details
        </ReloadText>
      </ReloadButton>
    </ScrollContainer>
  )
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}
