/**
 * Type declarations for react-native-permissions
 * This module is optional and may not be installed
 */
declare module 'react-native-permissions' {
  export type Permission = string
  export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'limited' | 'unavailable'

  export interface Permissions {
    IOS: {
      MICROPHONE: Permission
      [key: string]: Permission
    }
    ANDROID: {
      RECORD_AUDIO: Permission
      [key: string]: Permission
    }
  }

  export const PERMISSIONS: Permissions

  export function check(permission: Permission): Promise<PermissionStatus>
  export function request(permission: Permission): Promise<PermissionStatus>
  export function openSettings(): Promise<void>
}
