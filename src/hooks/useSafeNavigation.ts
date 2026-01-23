import type { Href } from 'expo-router'
import { useRouter, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'

export const useSafeNavigation = () => {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setIsNavigating(false)
    }, [])
  )

  const navigate = useCallback(
    (path: Href) => {
      if (isNavigating) return
      setIsNavigating(true)
      router.push(path)
    },
    [isNavigating, router]
  )

  const navigateReplace = useCallback(
    (path: Href) => {
      if (isNavigating) return
      setIsNavigating(true)
      router.replace(path)
    },
    [isNavigating, router]
  )

  const navigateBack = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.back()
  }, [isNavigating, router])

  return {
    isNavigating,
    navigate,
    navigateReplace,
    navigateBack,
    setIsNavigating
  }
}
