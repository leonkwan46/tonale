import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { app } from './firebase'

export const auth = getAuth(app)

// Connect to Auth emulator in development
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}
