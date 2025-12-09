import { useLastLesson, useProgress, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useCallback, useState } from 'react'
import { GreetingBanner } from './components/GreetingBanner'
import { HomeScreenBackground } from './components/HomeScreenBackground'
import { LessonCard } from './components/LessonCard'
import { StrikeBar } from './components/StrikeBar'

export function HomeScreen() {
  const { user, profile, loading, fetchProfile } = useUser()
  const { refresh: refreshLesson } = useLastLesson()
  const { refreshProgress } = useProgress()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await Promise.all([
        fetchProfile(),
        refreshProgress(),
        refreshLesson()
      ])
    } catch (error) {
      console.error('Failed to refresh:', error)
    } finally {
      setRefreshing(false)
    }
  }, [fetchProfile, refreshLesson, refreshProgress])

  return (
    <ScreenContainer>
      <HomeScreenBackground refreshing={refreshing} onRefresh={handleRefresh}>
        <GreetingBanner user={user} profile={profile} loading={loading} />
        <StrikeBar />
        <LessonCard />
      </HomeScreenBackground>
    </ScreenContainer>
  )
}
