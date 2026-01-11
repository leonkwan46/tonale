import { updateUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import type { UserData } from '@types'
import { useEffect, useRef, useState } from 'react'

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
const DEFAULT_STREAK = 1

const getMidnightDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const formatDateAsYYYYMMDD = (date: Date): string => {
  const midnight = getMidnightDate(date)
  return `${midnight.getFullYear()}-${midnight.getMonth()}-${midnight.getDate()}`
}

const parseYYYYMMDDToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  const monthIndex = month > 11 ? month - 1 : month
  return new Date(year, monthIndex, day)
}

const calculateDaysBetween = (laterDate: Date, earlierDate: Date): number => {
  return Math.floor((laterDate.getTime() - earlierDate.getTime()) / MILLISECONDS_PER_DAY)
}

const shouldUpdateUserStreak = (
  userData: UserData,
  newStreakDay: number,
  newLastLoginDate: string
): boolean => {
  if (!userData.streakDay || !userData.lastLoginDate) {
    return true
  }
  return userData.streakDay !== newStreakDay || userData.lastLoginDate !== newLastLoginDate
}

const updateUserStreak = async (
  newStreakDay: number,
  newLastLoginDate: string,
  userData: UserData
): Promise<void> => {
  try {
    if (!shouldUpdateUserStreak(userData, newStreakDay, newLastLoginDate)) return
    await updateUserData({ streakDay: newStreakDay, lastLoginDate: newLastLoginDate })
  } catch (error) {
    console.error('Error updating user streak:', error)
  }
}

const calculateStreakFromLastLogin = (
  lastLoginDateString: string | null,
  currentStreakFromProfile: number,
  todayDateString: string,
  todayMidnight: Date
): { streak: number; shouldUpdate: boolean } => {
  if (!lastLoginDateString) {
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }
  if (lastLoginDateString === todayDateString) {
    return { streak: currentStreakFromProfile, shouldUpdate: false }
  }
  const lastLoginDate = parseYYYYMMDDToDate(lastLoginDateString)
  const daysSinceLastLogin = calculateDaysBetween(todayMidnight, lastLoginDate)
  if (daysSinceLastLogin === 1) {
    return { streak: currentStreakFromProfile + 1, shouldUpdate: true }
  }
  if (daysSinceLastLogin > 1) {
    return { streak: DEFAULT_STREAK, shouldUpdate: true }
  }
  return { streak: currentStreakFromProfile, shouldUpdate: false }
}

const calculateUserStreak = (
  userData: UserData | null
): number => {
  const todayMidnight = getMidnightDate(new Date())
  const todayDateString = formatDateAsYYYYMMDD(todayMidnight)
  const currentStreakFromProfile = userData?.streakDay ?? DEFAULT_STREAK
  const lastLoginDateString = userData?.lastLoginDate ?? null
  const { streak: calculatedStreak, shouldUpdate } = calculateStreakFromLastLogin(
    lastLoginDateString,
    currentStreakFromProfile,
    todayDateString,
    todayMidnight
  )
  if (shouldUpdate && userData) {
    updateUserStreak(calculatedStreak, todayDateString, userData).catch(
      error => console.error('Background streak update failed:', error)
    )
  }
  return calculatedStreak
}

type PreviousStreakData = {
  streakDay?: number
  lastLoginDate?: string
}

export const useStreak = (): number => {
  const { authUser, userData } = useUser()
  const [currentStreak, setCurrentStreak] = useState<number>(DEFAULT_STREAK)
  const previousUserIdRef = useRef<string | null>(null)
  const hasInitialProfileLoadRef = useRef<boolean>(false)
  const usedFallbackStreakRef = useRef<boolean>(false)
  const previousProfileStreakRef = useRef<PreviousStreakData | null>(null)
  const userId = authUser?.uid ?? null

  const resetStreakState = () => {
    setCurrentStreak(DEFAULT_STREAK)
    previousUserIdRef.current = null
    hasInitialProfileLoadRef.current = false
    usedFallbackStreakRef.current = false
    previousProfileStreakRef.current = null
  }

  useEffect(() => {
    const isUserPresent = authUser !== null
    const isProfilePresent = userData !== null

    if (!isUserPresent) {
      if (previousUserIdRef.current !== null) {
        resetStreakState()
      }
      return
    }

    const isNewUser = authUser.metadata.creationTime === authUser.metadata.lastSignInTime
    if (!isNewUser && !isProfilePresent) return

    const userIdChanged = previousUserIdRef.current !== userId
    const isProfileFirstLoad = isProfilePresent && !hasInitialProfileLoadRef.current
    const hasProfileStreakChanged = isProfilePresent && previousProfileStreakRef.current && (
      previousProfileStreakRef.current.streakDay !== userData.streakDay ||
      previousProfileStreakRef.current.lastLoginDate !== userData.lastLoginDate
    )
    const shouldRecalculate = userIdChanged || isProfileFirstLoad || hasProfileStreakChanged || (isProfilePresent && usedFallbackStreakRef.current)
      
    if (!shouldRecalculate) return

    if (!isNewUser && !isProfilePresent) {
      usedFallbackStreakRef.current = true
    }
    const calculatedStreak = calculateUserStreak(userData)
    setCurrentStreak(calculatedStreak)
      previousUserIdRef.current = userId
    if (isProfilePresent) {
      hasInitialProfileLoadRef.current = true
      usedFallbackStreakRef.current = false
      previousProfileStreakRef.current = {
        streakDay: userData.streakDay,
        lastLoginDate: userData.lastLoginDate
      }
    }
  }, [userId, userData, authUser])

  return currentStreak
}
