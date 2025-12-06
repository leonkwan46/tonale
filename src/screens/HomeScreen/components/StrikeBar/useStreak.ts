import { updateUserData } from '@/config/firebase/functions'
import { STREAK_LOCAL_KEY } from '@/constants/cache'
import { useUser } from '@/hooks/useUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserProfile } from '@types'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
const DEFAULT_STREAK = 1

interface LocalStreakData {
  streakDay: number
  lastUpdateDate: string
  userId: string
}

let currentStreakUserId: string | null = null

const getDateString = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

const parseDateString = (dateStr: string): Date => {
  // Parse format: "YYYY-M-D" where M is 0-11 (month index)
  const parts = dateStr.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)
  return new Date(year, month, day)
}

const getMidnightDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
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
  profile: UserProfile | null,
  fetchProfile: () => Promise<void>
): Promise<void> => {
  try {
    if (!needsCloudSync(profile, newStreakDay, newLastUpdateDate)) {
      return
    }

    await updateUserData({ streakDay: newStreakDay, lastLoginDate: newLastUpdateDate })
    await fetchProfile()
  } catch (error) {
    console.error('Error syncing streak to cloud:', error)
  }
}

const calculateNewStreak = (
  lastStoredDate: string | null,
  currentStreak: number,
  todayDateStr: string,
  todayDay: Date
): { streak: number; shouldUpdate: boolean } => {
  if (!lastStoredDate) {
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }

  if (lastStoredDate === todayDateStr) {
    return { streak: currentStreak, shouldUpdate: false }
  }

  const lastStoredDay = getMidnightDate(parseDateString(lastStoredDate))
  const daysSinceLastStored = getDaysDifference(todayDay, lastStoredDay)

  if (daysSinceLastStored === 1) {
    // Exactly 1 day has passed (yesterday), continue streak
    return { streak: currentStreak + 1, shouldUpdate: true }
  }

  if (daysSinceLastStored > 1) {
    // More than 1 day has passed, reset streak
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }

  // Future date or same day (shouldn't happen, but handle gracefully)
  return { streak: currentStreak, shouldUpdate: false }
}

const calculateStreak = async (
  user: User,
  profile: UserProfile | null,
  fetchProfile: () => Promise<void>
): Promise<number> => {
  const userId = user.uid
  const todayDay = getMidnightDate(new Date())
  const todayDateStr = getDateString(todayDay)

  const localStreak = await getLocalStreak(userId)
  const currentStreak = localStreak?.streakDay ?? profile?.streakDay ?? DEFAULT_STREAK
  const lastStoredDate = localStreak?.lastUpdateDate ?? profile?.lastLoginDate ?? null

  const { streak: newStreak, shouldUpdate } = calculateNewStreak(
    lastStoredDate,
    currentStreak,
    todayDateStr,
    todayDay
  )

  if (shouldUpdate) {
    await setLocalStreak(userId, newStreak, todayDateStr)
    syncToCloud(userId, newStreak, todayDateStr, profile, fetchProfile).catch(
      error => console.error('Background streak sync failed:', error)
    )
  }

  return newStreak
}

export const useStreak = (user: User | null): number => {
  const { profile, fetchProfile } = useUser()
  const [currentDay, setCurrentDay] = useState<number>(DEFAULT_STREAK)

  useEffect(() => {
    const updateStreak = async () => {
      await handleUserSwitch(user?.uid ?? null)
      
      if (!user?.uid) {
        setCurrentDay(DEFAULT_STREAK)
        return
      }

      const streak = await calculateStreak(user, profile, fetchProfile)
      setCurrentDay(streak)
    }

    void updateStreak()
  }, [user, profile, fetchProfile])

  return currentDay
}
