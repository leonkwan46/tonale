import * as Sentry from '@sentry/react-native'

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN

export const initSentry = (): void => {
  if (__DEV__) return

  if (SENTRY_DSN) {
    Sentry.init({ dsn: SENTRY_DSN, environment: 'production' })
  }

  console.log = () => {}
  console.warn = () => {}
  console.info = () => {}
  console.debug = () => {}
  console.error = SENTRY_DSN
    ? (...args: unknown[]) => {
        Sentry.captureException(args[0] instanceof Error ? args[0] : new Error(String(args[0])))
      }
    : () => {}
}
