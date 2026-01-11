import { AuthActionScreen } from '@/screens/AuthActionScreen'

/**
 * Handles deep links from Firebase email actions
 * Deep link: tonale://auth-action?mode=<mode>&oobCode=<code>
 */
export default function AuthActionRoute() {
  return <AuthActionScreen />
}

