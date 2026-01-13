import { useLastLesson, useProgress, useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { useCallback, useState } from 'react'
import { GreetingBanner } from './components/GreetingBanner'
import { HomeScreenBackground } from './components/HomeScreenBackground'
import { LessonCard } from './components/LessonCard'
import { RevisionCard } from './components/RevisionCard'
import { StrikeBar } from './components/StrikeBar'

export function HomeScreen() {
  const { authUser, userData, loading, fetchUserData: refreshProfile } = useUser()
  const { refresh: refreshLesson } = useLastLesson()
  const { refreshProgress, refreshRevisionQuestions } = useProgress()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await Promise.all([
        refreshProfile(),
        refreshProgress(),
        refreshRevisionQuestions(),
        refreshLesson()
      ])
    } catch (error) {
      console.error('Failed to refresh:', error)
    } finally {
      setRefreshing(false)
    }
  }, [refreshProfile, refreshLesson, refreshProgress, refreshRevisionQuestions])

  return (
    <ScreenContainer>
      <HomeScreenBackground 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
        gender={userData?.gender}
        instrument={userData?.instrument}
      >
        <GreetingBanner authUser={authUser} userData={userData} loading={loading} />
        <StrikeBar />
        <LessonCard />
        <RevisionCard />
      </HomeScreenBackground>
    </ScreenContainer>
  )
}
