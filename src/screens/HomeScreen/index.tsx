import { forceRefreshProgress } from '@/utils/userProgress'
import { useLastLesson, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useCallback, useState } from 'react'
import { GreetingBanner } from './components/GreetingBanner'
import { HomeScreenBackground } from './components/HomeScreenBackground'
import { LessonCard } from './components/LessonCard'
import { StrikeBar } from './components/StrikeBar'

export function HomeScreen() {
  const { user, profile, loading } = useUser()
  const { refresh: refreshLesson } = useLastLesson()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await forceRefreshProgress()
      await refreshLesson()
    } catch (error) {
      console.error('Failed to refresh progress:', error)
    } finally {
      setRefreshing(false)
    }
  }, [refreshLesson])

  return (
    <ScreenContainer>
      <HomeScreenBackground refreshing={refreshing} onRefresh={handleRefresh}>
        <GreetingBanner user={user} profile={profile} loading={loading} />
        <StrikeBar user={user} />
        <LessonCard />
      </HomeScreenBackground>
    </ScreenContainer>
  )
}
