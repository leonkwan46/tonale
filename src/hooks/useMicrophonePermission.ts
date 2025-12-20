import { useEffect, useState } from 'react'
import { NativeModules, Platform } from 'react-native'
import type { Permission } from 'react-native-permissions'

let permissionsModule: typeof import('react-native-permissions') | null = null
let isModuleAvailable = false

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  permissionsModule = require('react-native-permissions')
  if (permissionsModule && (NativeModules.RNPermissions || permissionsModule.PERMISSIONS)) {
    isModuleAvailable = true
  } else {
    console.warn('[Permissions] JS module found but native module not linked. Rebuild native projects.')
    isModuleAvailable = false
  }
} catch {
  console.warn('[Permissions] Module not available. Rebuild native projects to enable.')
  isModuleAvailable = false
}

const getMicrophonePermissionType = (): Permission | null => {
  if (!permissionsModule) return null
  return Platform.OS === 'ios'
    ? permissionsModule.PERMISSIONS.IOS.MICROPHONE
    : permissionsModule.PERMISSIONS.ANDROID.RECORD_AUDIO
}

export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'limited' | 'unavailable' | null

export interface UseMicrophonePermissionReturn {
  status: PermissionStatus | null
  isGranted: boolean
  isLoading: boolean
  isModuleAvailable: boolean
  requestPermission: () => Promise<PermissionStatus>
  checkPermission: () => Promise<PermissionStatus>
  openAppSettings: () => Promise<void>
}

/**
 * Hook for managing microphone permissions on iOS and Android
 * 
 * @example
 * ```tsx
 * const { status, isGranted, requestPermission } = useMicrophonePermission()
 * 
 * const handleRecord = async () => {
 *   if (!isGranted) {
 *     const newStatus = await requestPermission()
 *     if (newStatus !== 'granted') {
 *       // Handle permission denied
 *       return
 *     }
 *   }
 *   // Proceed with recording
 * }
 * ```
 */
export const useMicrophonePermission = (): UseMicrophonePermissionReturn => {
  const [status, setStatus] = useState<PermissionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkPermission = async (): Promise<PermissionStatus> => {
    if (!isModuleAvailable || !permissionsModule) {
      const unavailableStatus: PermissionStatus = 'unavailable'
      setStatus(unavailableStatus)
      setIsLoading(false)
      return unavailableStatus
    }

    const permissionType = getMicrophonePermissionType()
    if (!permissionType) {
      const unavailableStatus: PermissionStatus = 'unavailable'
      setStatus(unavailableStatus)
      setIsLoading(false)
      return unavailableStatus
    }

    try {
      setIsLoading(true)
      const permissionStatus = await permissionsModule.check(permissionType)
      const normalizedStatus = permissionStatus as PermissionStatus
      setStatus(normalizedStatus)
      return normalizedStatus
    } catch (error) {
      console.error('[Permissions] Error checking microphone permission:', error)
      const deniedStatus: PermissionStatus = 'denied'
      setStatus(deniedStatus)
      return deniedStatus
    } finally {
      setIsLoading(false)
    }
  }

  const requestPermission = async (): Promise<PermissionStatus> => {
    if (!isModuleAvailable || !permissionsModule) {
      const unavailableStatus: PermissionStatus = 'unavailable'
      setStatus(unavailableStatus)
      setIsLoading(false)
      return unavailableStatus
    }

    const permissionType = getMicrophonePermissionType()
    if (!permissionType) {
      const unavailableStatus: PermissionStatus = 'unavailable'
      setStatus(unavailableStatus)
      setIsLoading(false)
      return unavailableStatus
    }

    try {
      setIsLoading(true)
      const permissionStatus = await permissionsModule.request(permissionType)
      const normalizedStatus = permissionStatus as PermissionStatus
      setStatus(normalizedStatus)
      return normalizedStatus
    } catch (error) {
      console.error('[Permissions] Error requesting microphone permission:', error)
      const deniedStatus: PermissionStatus = 'denied'
      setStatus(deniedStatus)
      return deniedStatus
    } finally {
      setIsLoading(false)
    }
  }

  const openAppSettings = async (): Promise<void> => {
    if (!isModuleAvailable || !permissionsModule) {
      console.warn('[Permissions] Cannot open settings: module not available')
      return
    }

    try {
      await permissionsModule.openSettings()
    } catch (error) {
      console.error('[Permissions] Error opening app settings:', error)
    }
  }

  useEffect(() => {
    if (isModuleAvailable) {
      void checkPermission()
    } else {
      setIsLoading(false)
      setStatus('unavailable')
    }
  }, [])

  const isGranted = status === 'granted'

  return {
    status,
    isGranted,
    isLoading,
    isModuleAvailable,
    requestPermission,
    checkPermission,
    openAppSettings
  }
}

