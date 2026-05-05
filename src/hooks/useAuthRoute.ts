import { useUserStore, type AuthRoute } from '@/stores/userStore'

// Single source of truth for routing decisions.
// index.tsx, (auth)/_layout.tsx, and screen guards all consume this.
export const useAuthRoute = (): AuthRoute => {
  const authUser = useUserStore(s => s.authUser)
  const userData = useUserStore(s => s.userData)
  const userDataStatus = useUserStore(s => s.userDataStatus)
  const loading = useUserStore(s => s.loading)

  if (loading) return 'loading'
  if (!authUser) return 'auth'
  switch (userDataStatus) {
    case 'idle': return 'loading'
    case 'error': return 'auth'
    case 'not-found': return 'onboarding'
    case 'found': return userData?.onboardingCompleted === true ? 'app' : 'onboarding'
  }
}
