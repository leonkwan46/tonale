import type { UserData } from '@types'
import type { User } from 'firebase/auth'

export type UserDataStatus = 'idle' | 'not-found' | 'found' | 'error'

// The canonical route the user should be on, derived from auth + profile state.
// Consume via useAuthRoute() — never re-derive this logic in individual screens.
export type AuthRoute = 'loading' | 'auth' | 'onboarding' | 'app'

export interface UserState {
  authUser: User | null
  userData: UserData | null
  userDataStatus: UserDataStatus
  loading: boolean
  // Set to true by the registration flow so the bootstrap skips the guaranteed-miss
  // fetchUserData() call right after createUserWithEmailAndPassword. Consumed (reset
  // to false) on the next auth state change.
  skipNextFetch: boolean
}

export interface UserActions {
  fetchUserData: () => Promise<UserData | null>
  setUserData: (userData: UserData | null) => void
  setAuthUser: (authUser: User | null) => void
  setUserDataStatus: (status: UserDataStatus) => void
  setLoading: (loading: boolean) => void
  setSkipNextFetch: (value: boolean) => void
  resetUser: () => void
}

export type UserStore = UserState & UserActions
