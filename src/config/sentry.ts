import * as Sentry from '@sentry/react-native'
const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN

export const wrapWithSentry = (component: Parameters<typeof Sentry.wrap>[0]) =>
  Sentry.wrap(component)

export const initSentry = (): void => {
  if (__DEV__ || !SENTRY_DSN) return

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 1,
    enableAutoSessionTracking: true,
    beforeSend(event) {
      if (event.message?.includes('Network request failed')) return null
      return event
    }
  })

  const originalConsoleError = console.error

  console.error = (...args: unknown[]) => {
    originalConsoleError(...args)
    const error = args[0] instanceof Error
      ? args[0]
      : new Error(args.map(String).join(' '))
    Sentry.captureException(error)
  }
}
