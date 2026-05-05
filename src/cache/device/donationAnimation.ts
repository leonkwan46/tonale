import { STORAGE_KEYS, storage } from '../schema'

export const getDonationAnimationPlayed = async (): Promise<boolean | null> => {
  return storage.getItem(STORAGE_KEYS.DONATION_ANIMATION_PLAYED)
}

export const setDonationAnimationPlayed = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.DONATION_ANIMATION_PLAYED, value)
}
