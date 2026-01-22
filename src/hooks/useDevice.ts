import { DEVICE, type DeviceType } from '@/constants/device'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'

export interface DeviceInfo {
  isTablet: boolean
  isPhone: boolean
  width: number
  height: number
  deviceType: DeviceType
}

export const useDevice = (): DeviceInfo => {
  const dimensions = Dimensions.get('window')
  
  const deviceInfo = useMemo(() => {
    const { width, height } = dimensions
    const isTablet = width >= 768
    
    return {
      isTablet,
      isPhone: !isTablet,
      width,
      height,
      deviceType: isTablet ? DEVICE.TABLET : DEVICE.PHONE
    }
  }, [dimensions])
  
  return deviceInfo
}

// Helper hook specifically for responsive values
export const useResponsiveValue = <T,>(phoneValue: T, tabletValue: T): T => {
  const { isTablet } = useDevice()
  return isTablet ? tabletValue : phoneValue
}
