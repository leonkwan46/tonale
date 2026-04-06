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

import { getFirebaseConfig, getFirebaseFunctionsRegion } from '../environment'

export const app = initializeApp(getFirebaseConfig())
const db = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const functions = getFunctions(app, getFirebaseFunctionsRegion())

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
    await withTimeout(fetch(url), 1500)
    return true
  } catch {
    return false
  }
}

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
  connectFirestoreEmulator(db, host, 8080)
  connectFunctionsEmulator(functions, host, 5001)

  void (async () => {
    const localSetupHint =
      'Ensure **tonale-api** (https://github.com/leonkwan46/tonale-api/pull/1) is cloned and running locally.'

    const checks = await Promise.all([
      isEmulatorAvailable(`http://${host}:9099/`),
      isEmulatorAvailable(`http://${host}:8080/`),
      isEmulatorAvailable(`http://${host}:5001/`)
    ])

    const missingEmulators = ['Auth', 'Firestore', 'Functions'].filter((_, i) => !checks[i])
    if (missingEmulators.length > 0) {
      missingEmulators.forEach((emulator) => {
        console.warn(
          `[Firebase] Local emulator not running: ${emulator}. ${localSetupHint}`
        )
      })
    } else {
      console.log('[Firebase] All local emulators are running ✅')
    }
  })()
}
