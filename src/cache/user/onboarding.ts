import { STORAGE_KEYS, storage } from '../schema'

export const setOnboardingCompleted = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, value)
}

export const getOnboardingCompleted = async (): Promise<boolean | null> => {
  return storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED)
}
