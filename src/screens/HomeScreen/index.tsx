import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useLastLesson } from '@/hooks'
import { useProgressStore } from '@/stores/progressStore'
import { useUserStore } from '@/stores/userStore'
import { useCallback, useState } from 'react'
import { GreetingBanner } from './components/GreetingBanner'
import { HomeScreenBackground } from './components/HomeScreenBackground'
import { LessonCard } from './components/LessonCard'
import { RevisionCard } from './components/RevisionCard'
import { StrikeBar } from './components/StrikeBar'

export const HomeScreen = () => {
  const authUser = useUserStore(s => s.authUser)
  const userData = useUserStore(s => s.userData)
  const loading = useUserStore(s => s.loading)
  const refreshProfile = useUserStore(s => s.fetchUserData)
  const { refresh: refreshLesson } = useLastLesson()
  const refreshProgress = useProgressStore(s => s.refreshProgress)
  const refreshRevisionQuestions = useProgressStore(s => s.refreshRevisionQuestions)
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
    <ScreenContainer includeTopPadding={false}>
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
