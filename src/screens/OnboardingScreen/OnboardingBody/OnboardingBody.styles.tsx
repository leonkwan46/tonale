import { scale } from 'react-native-size-matters'

export const ContentContainerStyle = ({ isTablet }: { isTablet: boolean }) => ({
  alignItems: 'center' as const,
  padding: isTablet ? scale(8) : scale(10),
  gap: isTablet ? scale(16) : scale(32)
})
