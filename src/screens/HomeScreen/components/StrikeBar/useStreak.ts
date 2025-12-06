import { updateUserData } from '@/config/firebase/functions'
import { STREAK_LOCAL_KEY } from '@/constants/cache'
import { useUser } from '@/hooks/useUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserProfile } from '@types'
import type { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
const DEFAULT_STREAK = 1

interface LocalStreakData {
  streakDay: number
  lastUpdateDate: string
  userId: string
}

let currentStreakUserId: string | null = null

const getMidnightDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const getDateString = (date: Date): string => {
  const midnight = getMidnightDate(date)
  return `${midnight.getFullYear()}-${midnight.getMonth()}-${midnight.getDate()}`
}

const parseDateString = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month, day)
}

const getDaysDifference = (date1: Date, date2: Date): number => {
  return Math.floor((date1.getTime() - date2.getTime()) / MILLISECONDS_PER_DAY)
}

const getLocalStreak = async (userId: string): Promise<LocalStreakData | null> => {
  try {
    const stored = await AsyncStorage.getItem(STREAK_LOCAL_KEY)
    if (!stored) return null
    
    const data: LocalStreakData = JSON.parse(stored)
    return data.userId === userId ? data : null
  } catch (error) {
    console.error('Error getting local streak:', error)
    return null
  }
}

const setLocalStreak = async (userId: string, streakDay: number, lastUpdateDate: string): Promise<void> => {
  try {
    const data: LocalStreakData = { streakDay, lastUpdateDate, userId }
    await AsyncStorage.setItem(STREAK_LOCAL_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error setting local streak:', error)
  }
}

const clearLocalStreak = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STREAK_LOCAL_KEY)
  } catch (error) {
    console.error('Error clearing local streak:', error)
  }
}

const handleUserSwitch = async (userId: string | null): Promise<void> => {
  if (!userId) {
    currentStreakUserId = null
    await clearLocalStreak()
    return
  }

  if (currentStreakUserId && currentStreakUserId !== userId) {
    await clearLocalStreak()
  }
  
  currentStreakUserId = userId
}

const needsCloudSync = (
  profile: UserProfile | null,
  newStreakDay: number,
  newLastUpdateDate: string
): boolean => {
  if (!profile?.streakDay || !profile?.lastLoginDate) {
    return true
  }
  
  return profile.streakDay !== newStreakDay || profile.lastLoginDate !== newLastUpdateDate
}

const syncToCloud = async (
  userId: string,
  newStreakDay: number,
  newLastUpdateDate: string,
  profile: UserProfile | null
): Promise<void> => {
  try {
    if (!profile) {
      return
    }

    if (!needsCloudSync(profile, newStreakDay, newLastUpdateDate)) {
      return
    }

    await updateUserData({ streakDay: newStreakDay, lastLoginDate: newLastUpdateDate })
  } catch (error) {
    console.error('Error syncing streak to cloud:', error)
  }
}

const calculateNewStreak = (
  lastStoredDate: string | null,
  currentStreak: number,
  todayDateStr: string,
  today: Date
): { streak: number; shouldUpdate: boolean } => {
  if (!lastStoredDate) {
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }

  if (lastStoredDate === todayDateStr) {
    return { streak: currentStreak, shouldUpdate: false }
  }

  const lastStoredDateObj = getMidnightDate(parseDateString(lastStoredDate))
  const daysSinceLastStored = getDaysDifference(today, lastStoredDateObj)

  if (daysSinceLastStored === 1) {
    return { streak: currentStreak + 1, shouldUpdate: true }
  }

  if (daysSinceLastStored > 1) {
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }

  return { streak: currentStreak, shouldUpdate: false }
}

const calculateStreak = async (
  user: User,
  profile: UserProfile | null
): Promise<number> => {
  const userId = user.uid
  const today = getMidnightDate(new Date())
  const todayDateStr = getDateString(today)

  const localStreak = await getLocalStreak(userId)
  const currentStreak = localStreak?.streakDay ?? profile?.streakDay ?? DEFAULT_STREAK
  const lastStoredDate = localStreak?.lastUpdateDate ?? profile?.lastLoginDate ?? null

  const { streak: newStreak, shouldUpdate } = calculateNewStreak(
    lastStoredDate,
    currentStreak,
    todayDateStr,
    today
  )

  if (shouldUpdate) {
    await setLocalStreak(userId, newStreak, todayDateStr)
  }

  if (profile) {
    syncToCloud(userId, newStreak, todayDateStr, profile).catch(
      error => console.error('Background streak sync failed:', error)
    )
  }

  return newStreak
}

export const useStreak = (user: User | null): number => {
  const { profile } = useUser()
  const [currentDay, setCurrentDay] = useState<number>(DEFAULT_STREAK)
  const previousUserIdRef = useRef<string | null>(null)
  const hasProfileLoadedRef = useRef<boolean>(false)
  const userId = user?.uid ?? null

  useEffect(() => {
    const hasUser = user !== null
    const hasUserId = userId !== null
    const hasProfile = profile !== null

    if (!hasUser && !hasUserId) {
      if (previousUserIdRef.current !== null) {
        setCurrentDay(DEFAULT_STREAK)
        previousUserIdRef.current = null
        hasProfileLoadedRef.current = false
      }
      return
    }

    if (!hasUser) {
      return
    }

    const userIdChanged = previousUserIdRef.current !== userId
    const profileJustLoaded = hasProfile && !hasProfileLoadedRef.current
    const shouldRecalculate = userIdChanged || profileJustLoaded

    if (!shouldRecalculate) {
      return
    }

    const updateStreak = async () => {
      await handleUserSwitch(userId)

      if (!userId) {
        setCurrentDay(DEFAULT_STREAK)
        previousUserIdRef.current = null
        hasProfileLoadedRef.current = false
        return
      }

      const streak = await calculateStreak(user, profile)
      setCurrentDay(streak)

      previousUserIdRef.current = userId
      if (hasProfile) {
        hasProfileLoadedRef.current = true
      }
    }

    void updateStreak()
  }, [userId, profile, user])

  return currentDay
}
