import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { connectAuthEmulator, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { app } from './firebase'

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

// Connect to Auth emulator in development
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}
