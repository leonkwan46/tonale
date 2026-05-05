import { getUserData } from '@/config/firebase/functions'
import { isFirebaseError } from '@types'
import { create } from 'zustand'

import type { UserState, UserStore } from './userTypes'

const INITIAL_STATE: UserState = {
  authUser: null,
  userData: null,
  userDataStatus: 'idle',
  loading: true,
  skipNextFetch: false
}

export const useUserStore = create<UserStore>((set) => ({
  ...INITIAL_STATE,

  fetchUserData: async () => {
    try {
      const result = await getUserData()
      const profileData = result.data.data
      set({ userData: profileData, userDataStatus: 'found' })
      return profileData
    } catch (error) {
      // httpsCallable surfaces server HttpsError('not-found') as 'functions/not-found'.
      // The bare 'not-found' form is kept for any non-callable callers.
      if (
        isFirebaseError(error) &&
        (error.code === 'functions/not-found' || error.code === 'not-found')
      ) {
        set({ userData: null, userDataStatus: 'not-found' })
        return null
      }
      console.error('[fetchUserData] Error fetching user data:', error)
      set({ userData: null, userDataStatus: 'error' })
      return null
    }
  },

  // Keeps userDataStatus in sync when callers bypass fetchUserData.
  setUserData: (data) =>
    set({ userData: data, userDataStatus: data !== null ? 'found' : 'idle' }),

  setAuthUser: (authUser) => set({ authUser }),

  setUserDataStatus: (userDataStatus) => set({ userDataStatus }),

  setLoading: (loading) => set({ loading }),

  setSkipNextFetch: (skipNextFetch) => set({ skipNextFetch }),

  resetUser: () => set(INITIAL_STATE)
}))
