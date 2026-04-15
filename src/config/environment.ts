export interface FirebaseClientConfig {
  apiKey: string | undefined
  authDomain: string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
}

export interface Environment {
  environment: 'development' | 'staging' | 'production'
  apiUrl: string
  firebaseConfig: FirebaseClientConfig
}

const resolveAppEnvironment = (): Environment['environment'] => {
  const raw = process.env.EXPO_PUBLIC_APP_ENVIRONMENT
  if (raw === 'staging' || raw === 'production' || raw === 'development') {
    return raw
  }
  return 'development'
}

export const getSplashEnvironmentLabel = (): string | null => {
  const env = resolveAppEnvironment()
  if (env === 'production') return null
  if (env === 'staging') return 'Staging'
  return 'Development'
}

export const getEnvironment = (): Environment => ({
  environment: resolveAppEnvironment(),
  apiUrl: 'http://localhost:3000',
  firebaseConfig: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
  }
})

export const isDevelopment = (): boolean => {
  return getEnvironment().environment === 'development'
}

export const isStaging = (): boolean => {
  return getEnvironment().environment === 'staging'
}

export const isProduction = (): boolean => {
  return getEnvironment().environment === 'production'
}

export const getApiUrl = (): string => {
  return getEnvironment().apiUrl
}

export const getFirebaseConfig = (): FirebaseClientConfig => {
  return getEnvironment().firebaseConfig
}

export const inferFirebaseFunctionsRegionFromDevice = (): 'europe-west2' | 'asia-southeast1' => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (tz?.startsWith('Asia/')) return 'asia-southeast1'
  return 'europe-west2'
}

export const getFirebaseFunctionsRegion = (): string => {
  const raw = process.env.EXPO_PUBLIC_FIREBASE_FUNCTIONS_REGION?.trim()
  if (raw) return raw
  return inferFirebaseFunctionsRegionFromDevice()
}
