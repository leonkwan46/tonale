import { useEffect } from 'react'
import { useProgressStore } from '@/stores/progressStore'
import { useUserStore } from '@/stores/userStore'

export const useProgressBootstrap = () => {
  const authUser = useUserStore(s => s.authUser)
  const userData = useUserStore(s => s.userData)
  const userLoading = useUserStore(s => s.loading)
  const initializeUserProgress = useProgressStore(s => s.initializeUserProgress)
  const resetProgress = useProgressStore(s => s.resetProgress)
  const refreshRevisionQuestions = useProgressStore(s => s.refreshRevisionQuestions)
  const progressDataInitialized = useProgressStore(s => s.progressDataInitialized)

  useEffect(() => {
    if (!authUser) {
      resetProgress()
      return
    }
    if (userLoading || userData === null) return
    initializeUserProgress(authUser.uid)
  }, [authUser, userData, userLoading, initializeUserProgress, resetProgress])

  useEffect(() => {
    if (authUser && progressDataInitialized) {
      refreshRevisionQuestions()
    }
  }, [authUser, progressDataInitialized, refreshRevisionQuestions])
}
