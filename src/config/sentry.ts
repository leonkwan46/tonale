import * as Sentry from '@sentry/react-native'

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN

export const initSentry = (): void => {
  if (!SENTRY_DSN) return

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: 0.2,
    enableAutoSessionTracking: true,
    beforeSend(event) {
      if (event.message?.includes('Network request failed')) return null
      return event
    }
  })

  if (!__DEV__) {
    const originalConsoleError = console.error

    console.error = (...args: unknown[]) => {
      originalConsoleError(...args)
      const error = args[0] instanceof Error
        ? args[0]
        : new Error(args.map(String).join(' '))
      Sentry.captureException(error)
    }
  }
}
