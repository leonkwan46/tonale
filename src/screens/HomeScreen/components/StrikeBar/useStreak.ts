import { updateUserData } from '@/config/firebase/functions'
import { STREAK_LOCAL_KEY } from '@/constants/cache'
import { useUser } from '@/hooks/useUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserProfile } from '@types'
import type { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

interface LocalStreakData {
  streakDay: number
  lastLoginDate: string
  userId: string
}

let currentStreakUserId: string | null = null

const getDateString = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
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

const setLocalStreak = async (userId: string, streakDay: number, lastLoginDate: string): Promise<void> => {
  try {
    const data: LocalStreakData = { streakDay, lastLoginDate, userId }
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
  newLastLoginDate: string
): boolean => {
  if (!profile?.streakDay || !profile?.lastLoginDate) {
    return true
  }
  
  const isAlreadySynced = 
    profile.streakDay === newStreakDay && 
    profile.lastLoginDate === newLastLoginDate
  
  return !isAlreadySynced
}

const syncToCloud = async (
  userId: string,
  newStreakDay: number,
  newLastLoginDate: string,
  profile: UserProfile | null,
  fetchProfile: () => Promise<void>
): Promise<void> => {
  try {
    if (!needsCloudSync(profile, newStreakDay, newLastLoginDate)) {
      return
    }

    await updateUserData({ streakDay: newStreakDay, lastLoginDate: newLastLoginDate })
    await fetchProfile()
  } catch (error) {
    console.error('Error syncing streak to cloud:', error)
  }
}

const calculateStreakDay = (
  lastStoredDate: string,
  currentStreak: number
): number => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayDateStr = getDateString(yesterday)
  
  return lastStoredDate === yesterdayDateStr ? currentStreak + 1 : 1
}

const calculateStreak = async (
  user: User,
  profile: UserProfile | null,
  fetchProfile: () => Promise<void>
): Promise<number> => {
  const userId = user.uid
  const lastLoginTime = new Date(user.metadata.lastSignInTime!)
  const today = new Date()
  
  const lastLoginDay = getMidnightDate(lastLoginTime)
  const todayDay = getMidnightDate(today)
  const daysSinceLastLogin = getDaysDifference(todayDay, lastLoginDay)
  const lastLoginDateStr = getDateString(lastLoginDay)

  const localStreak = await getLocalStreak(userId)
  const currentStreak = localStreak?.streakDay ?? profile?.streakDay ?? 1
  const lastStoredDate = localStreak?.lastLoginDate ?? profile?.lastLoginDate ?? null

  let newStreak: number
  let needsUpdate = false

  if (!lastStoredDate) {
    newStreak = 1
    needsUpdate = true
  } else if (daysSinceLastLogin > 1) {
    newStreak = 1
    needsUpdate = true
  } else if (lastStoredDate !== lastLoginDateStr) {
    newStreak = calculateStreakDay(lastStoredDate, currentStreak)
    needsUpdate = true
  } else {
    return currentStreak
  }

  if (needsUpdate) {
    await setLocalStreak(userId, newStreak, lastLoginDateStr)
    syncToCloud(userId, newStreak, lastLoginDateStr, profile, fetchProfile).catch(
      error => console.error('Background streak sync failed:', error)
    )
  }

  return newStreak
}

export const useStreak = (user: User | null): number => {
  const { profile, fetchProfile } = useUser()
  const [currentDay, setCurrentDay] = useState<number>(1)

  useEffect(() => {
    const updateStreak = async () => {
      await handleUserSwitch(user?.uid ?? null)
      
      if (!user?.uid || !user?.metadata?.lastSignInTime) {
        setCurrentDay(1)
        return
      }

      const streak = await calculateStreak(user, profile, fetchProfile)
      setCurrentDay(streak)
    }

    void updateStreak()
  }, [user, profile, fetchProfile])

  return currentDay
}
