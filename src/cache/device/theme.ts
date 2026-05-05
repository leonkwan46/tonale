import { STORAGE_KEYS, storage } from '../schema'

export const getThemeMode = async (): Promise<boolean | null> => {
  return storage.getItem(STORAGE_KEYS.THEME_MODE)
}

export const setThemeMode = async (value: boolean): Promise<void> => {
  await storage.setItem(STORAGE_KEYS.THEME_MODE, value)
}