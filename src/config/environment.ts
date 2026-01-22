import Constants from 'expo-constants'

export interface Environment {
  environment: 'development' | 'staging' | 'production'
  apiUrl: string
  firebaseConfig: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
}

export const getEnvironment = (): Environment => {
  const extra = Constants.expoConfig?.extra as Environment | undefined
  
  if (!extra) {
    return {
      environment: 'development',
      apiUrl: 'http://localhost:3000',
      firebaseConfig: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || ''
      }
    }
  }
  
  return extra
}

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

export const getFirebaseConfig = () => {
  return getEnvironment().firebaseConfig
}
