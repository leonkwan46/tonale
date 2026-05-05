import { DEVICE, type DeviceType } from '@/constants/device'
import { useMemo } from 'react'

import { useBreakpoint, type Breakpoint } from './useBreakpoint'
import { useWindowDimensions } from './useWindowDimensions'

export interface DeviceInfo {
  isTablet: boolean
  isPhone: boolean
  width: number
  height: number
  deviceType: DeviceType
  breakpoint: Breakpoint
}

export const useDevice = (): DeviceInfo => {
  const { width, height } = useWindowDimensions()
  const breakpoint = useBreakpoint()

  return useMemo(() => {
    const isTablet = width >= 768
    return {
      isTablet,
      isPhone: !isTablet,
      width,
      height,
      deviceType: isTablet ? DEVICE.TABLET : DEVICE.PHONE,
      breakpoint
    }
  }, [width, height, breakpoint])
}

export const useResponsiveValue = <T,>(phoneValue: T, tabletValue: T): T => {
  const { isTablet } = useDevice()
  return isTablet ? tabletValue : phoneValue
}
