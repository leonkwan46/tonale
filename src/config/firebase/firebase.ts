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

const isEmulatorAvailable = async (url: string): Promise<boolean> => {
  try {
    const response = await withTimeout(fetch(url), 1500)
    return response.ok
  } catch {
    return false
  }
}

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

  connectAuthEmulator(auth, `http://${host}:9099`)
  connectFunctionsEmulator(functions, host, 5001)
  connectFirestoreEmulator(db, host, 8080)

  void (async () => {
    const localSetupHint =
      'Ensure **tonale-api** (https://github.com/leonkwan46/tonale-api/pull/1) is cloned and running locally.'

    const checks = await Promise.all([
      isEmulatorAvailable(`http://${host}:9099/`),
      isEmulatorAvailable(`http://${host}:5001/`),
      isEmulatorAvailable(`http://${host}:8080/`)
    ])

    if (checks.some((isAvailable) => !isAvailable)) {
      console.warn(`[Firebase] One or more local emulators are not running. ${localSetupHint}`)
    }
  })()
}
