// Feature flag enum-like constants
export const FEATURES = {
  ENABLE_DONATION: 'enableDonation',
  ENABLE_AURAL_LESSONS: 'enableAuralLessons'
} as const

// Export the type for use elsewhere if needed
export type FeatureFlag = typeof FEATURES[keyof typeof FEATURES]

// Feature flags configuration - must include all flags defined above
export const featureFlags: Record<FeatureFlag, boolean> = {
  [FEATURES.ENABLE_DONATION]: false,
  [FEATURES.ENABLE_AURAL_LESSONS]: true
} as const

export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  return featureFlags[flag]
}
