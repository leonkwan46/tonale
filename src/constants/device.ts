export const DEVICE = {
  TABLET: 'tablet',
  PHONE: 'phone'
} as const

export type DeviceType = typeof DEVICE[keyof typeof DEVICE]
