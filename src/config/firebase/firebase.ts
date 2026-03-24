import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { Platform } from 'react-native'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
}
export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app)
export const functions = getFunctions(app)

const withTimeout = async <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed out after ${ms}ms`))
      }, ms)
    })
  ])
}

const warnIfEmulatorUnavailable = async (name: string, url: string) => {
  try {
    const response = await withTimeout(fetch(url), 1500)
    if (!response.ok) {
      console.warn(`[Firebase] ${name} emulator may be unavailable. Check local emulator startup.`)
    }
  } catch {
    console.warn(`[Firebase] ${name} emulator is not running. Start Firebase emulators for local development.`)
  }
}

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

  connectAuthEmulator(auth, `http://${host}:9099`)
  connectFunctionsEmulator(functions, host, 5001)
  connectFirestoreEmulator(db, host, 8080)

  void Promise.all([
    warnIfEmulatorUnavailable('Auth', `http://${host}:9099/`),
    warnIfEmulatorUnavailable('Functions', `http://${host}:5001/`),
    warnIfEmulatorUnavailable('Firestore', `http://${host}:8080/`)
  ])
}
