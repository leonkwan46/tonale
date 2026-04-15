import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StorageKey } from './keys'

type Logger = Pick<Console, 'warn'>

const defaultLogger: Logger = console

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

const safeParse = <T>(raw: string): T | null => {
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export interface TypedStorageOptions {
  logger?: Logger
}

export const createTypedStorage = <ValueMap extends Record<StorageKey, unknown>>(
  options: TypedStorageOptions = {}
) => {
  const logger = options.logger ?? defaultLogger

  const getItem = async <K extends keyof ValueMap>(key: K): Promise<ValueMap[K] | null> => {
    try {
      const raw = await AsyncStorage.getItem(String(key))
      if (raw == null) return null
      return safeParse<ValueMap[K]>(raw)
    } catch (error) {
      logger.warn('[storage.getItem] failed', { key, error })
      return null
    }
  }

  const setItem = async <K extends keyof ValueMap>(key: K, value: ValueMap[K]): Promise<void> => {
    try {
      const raw = JSON.stringify(value as unknown as Json)
      await AsyncStorage.setItem(String(key), raw)
    } catch (error) {
      logger.warn('[storage.setItem] failed', { key, error })
    }
  }

  const removeItem = async (key: StorageKey | string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(String(key))
    } catch (error) {
      logger.warn('[storage.removeItem] failed', { key, error })
    }
  }

  const removeItems = async (keys: (StorageKey | string)[]): Promise<void> => {
    await Promise.all(keys.map(removeItem))
  }

  return { getItem, setItem, removeItem, removeItems }
}

