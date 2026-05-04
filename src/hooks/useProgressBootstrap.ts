import { useEffect } from 'react'
import { useProgressStore } from '@/stores/progressStore'
import { useUser } from '@/hooks/useUserContext'

export const useProgressBootstrap = () => {
  const { authUser, userData, loading: userLoading } = useUser()
  const { initializeUserProgress, resetProgress, refreshRevisionQuestions, progressDataInitialized } = useProgressStore()

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
      refreshRevisionQuestions(authUser.uid)
    }
  }, [authUser, progressDataInitialized, refreshRevisionQuestions])
}
