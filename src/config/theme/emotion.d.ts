import '@emotion/react'
import type { AppTheme } from './theme'
import type { DeviceInfo } from '@/hooks/useDevice'

declare module '@emotion/react' {
  export interface Theme extends AppTheme {
    device: DeviceInfo
  }
}
