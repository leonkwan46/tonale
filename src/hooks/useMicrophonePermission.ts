import { useCallback, useEffect, useState } from 'react'
import { NativeModules, Platform } from 'react-native'
import type { Permission } from 'react-native-permissions'

type PermissionsModule = typeof import('react-native-permissions')

export const PermissionStatus = {
  GRANTED: 'granted',
  DENIED: 'denied',
  BLOCKED: 'blocked',
  LIMITED: 'limited',
  UNAVAILABLE: 'unavailable',
  NULL: null
} as const

export type PermissionStatusType = typeof PermissionStatus[keyof typeof PermissionStatus]

export interface UseMicrophonePermissionReturn {
  status: PermissionStatusType | null
  isGranted: boolean
  isLoading: boolean
  isModuleAvailable: boolean
  requestPermission: () => Promise<PermissionStatusType>
  checkPermission: () => Promise<PermissionStatusType>
  openAppSettings: () => Promise<void>
}

interface ModuleAvailability {
  module: PermissionsModule | null
  isAvailable: boolean
}

const initializePermissionsModule = (): ModuleAvailability => {
  let permissionsModule: PermissionsModule | null = null
  let isModuleAvailable = false

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    permissionsModule = require('react-native-permissions')
    
    const hasOldArchModule = !!NativeModules.RNPermissions
    let hasNewArchModule = false
    
    try {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const TurboModuleRegistry = require('react-native').TurboModuleRegistry
      if (TurboModuleRegistry) {
        const RNPermissionsModule = TurboModuleRegistry.get('RNPermissionsModule')
        hasNewArchModule = !!RNPermissionsModule
      }
    } catch (error) {
      console.debug('[Permissions] TurboModuleRegistry not available:', error)
    }
    
    const hasJSMethods = permissionsModule && 
      typeof permissionsModule.request === 'function' && 
      typeof permissionsModule.check === 'function' &&
      permissionsModule.PERMISSIONS
    
    const hasNativeModule = hasOldArchModule || hasNewArchModule
    
    if (hasJSMethods && hasNativeModule) {
      isModuleAvailable = true
    } else if (hasJSMethods && !hasNativeModule) {
      console.warn('[Permissions] JS module found but native module not linked. Rebuild native projects.')
    } else {
      console.warn('[Permissions] Module not properly loaded')
    }
  } catch (error) {
    console.warn('[Permissions] Module not available. Rebuild native projects to enable.', error)
  }

  return { module: permissionsModule, isAvailable: isModuleAvailable }
}

const { module: permissionsModule, isAvailable: isModuleAvailable } = initializePermissionsModule()

const getMicrophonePermissionType = (module: PermissionsModule | null): Permission | null => {
  if (!module || !module.PERMISSIONS) return null
  
  try {
    if (Platform.OS === 'ios') {
      return module.PERMISSIONS.IOS?.MICROPHONE || null
    }
    return module.PERMISSIONS.ANDROID?.RECORD_AUDIO || null
  } catch (error) {
    console.error('[Permissions] Error getting permission type:', error)
    return null
  }
}

const isNativeModuleError = (error: unknown): boolean => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  return errorMessage.includes('TurboModuleRegistry') || errorMessage.includes('RNPermissionsModule')
}

const handlePermissionError = (error: unknown, operation: string): PermissionStatusType => {
  console.error(`[Permissions] Error ${operation} microphone permission:`, error)
  
  if (isNativeModuleError(error)) {
    console.error('[Permissions] Native module not linked. Rebuild required.')
    return PermissionStatus.UNAVAILABLE
  }
  
  return PermissionStatus.DENIED
}

const executePermissionOperation = async (
  operation: (permissionType: Permission) => Promise<string>,
  permissionType: Permission | null,
  setStatus: (status: PermissionStatusType) => void,
  setIsLoading: (loading: boolean) => void,
  operationName: string
): Promise<PermissionStatusType> => {
  if (!isModuleAvailable || !permissionsModule) {
    setStatus(PermissionStatus.UNAVAILABLE)
    setIsLoading(false)
    return PermissionStatus.UNAVAILABLE
  }

  if (!permissionType) {
    console.warn(`[Permissions] Cannot ${operationName}: permission type is null`)
    setStatus(PermissionStatus.UNAVAILABLE)
    setIsLoading(false)
    return PermissionStatus.UNAVAILABLE
  }

  try {
    setIsLoading(true)
    const permissionStatus = await operation(permissionType)
    const normalizedStatus = permissionStatus as PermissionStatusType
    setStatus(normalizedStatus)
    return normalizedStatus
  } catch (error) {
    const errorStatus = handlePermissionError(error, operationName)
    setStatus(errorStatus)
    return errorStatus
  } finally {
    setIsLoading(false)
  }
}

export const useMicrophonePermission = (): UseMicrophonePermissionReturn => {
  const [status, setStatus] = useState<PermissionStatusType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkPermission = useCallback(async (): Promise<PermissionStatusType> => {
    if (!permissionsModule) {
      setStatus(PermissionStatus.UNAVAILABLE)
      setIsLoading(false)
      return PermissionStatus.UNAVAILABLE
    }
    
    const permissionType = getMicrophonePermissionType(permissionsModule)
    return executePermissionOperation(
      (type) => permissionsModule.check(type),
      permissionType,
      setStatus,
      setIsLoading,
      'check'
    )
  }, [setStatus, setIsLoading])

  const requestPermission = useCallback(async (): Promise<PermissionStatusType> => {
    if (!permissionsModule) {
      setStatus(PermissionStatus.UNAVAILABLE)
      setIsLoading(false)
      return PermissionStatus.UNAVAILABLE
    }
    
    const permissionType = getMicrophonePermissionType(permissionsModule)
    return executePermissionOperation(
      (type) => permissionsModule.request(type),
      permissionType,
      setStatus,
      setIsLoading,
      'request'
    )
  }, [setStatus, setIsLoading])

  const openAppSettings = useCallback(async (): Promise<void> => {
    if (!isModuleAvailable || !permissionsModule) {
      console.warn('[Permissions] Cannot open settings: module not available')
      return
    }

    try {
      await permissionsModule.openSettings()
    } catch (error) {
      console.error('[Permissions] Error opening app settings:', error)
    }
  }, [])

  useEffect(() => {
    if (isModuleAvailable) {
      void checkPermission()
    } else {
      setIsLoading(false)
      setStatus(PermissionStatus.UNAVAILABLE)
    }
  }, [checkPermission])

  const isGranted = status === PermissionStatus.GRANTED

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
