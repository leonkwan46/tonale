import { STORAGE_KEYS, storage } from './storage'

export const getThemeMode = async (): Promise<boolean | null> => {
  return await storage.getItem(STORAGE_KEYS.THEME_MODE)
}

export const setThemeMode = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.THEME_MODE, value)
}

export const getDonationAnimationPlayed = async (): Promise<boolean | null> => {
  return await storage.getItem(STORAGE_KEYS.DONATION_ANIMATION_PLAYED)
}

export const setDonationAnimationPlayed = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.DONATION_ANIMATION_PLAYED, value)
}

