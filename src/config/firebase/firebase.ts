import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, initializeAuth, type Persistence } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { Platform } from 'react-native'

// getReactNativePersistence exists at runtime but may not be in TypeScript definitions
// eslint-disable-next-line @typescript-eslint/no-require-imports
const firebaseAuth = require('firebase/auth') as typeof import('firebase/auth') & {
  getReactNativePersistence: (storage: typeof ReactNativeAsyncStorage) => Persistence
}
const getReactNativePersistence = firebaseAuth.getReactNativePersistence

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

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'
  
  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
  connectFunctionsEmulator(functions, host, 5001)
  connectFirestoreEmulator(db, host, 8080)
}
