import type { AppTheme } from '@/constants/theme'
import styled from '@emotion/native'
import { Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const LevelNodeContainer = styled.TouchableOpacity<{ 
  position: { x: number; y: number }
  status: string
}>(({ theme, position, status }: { 
  theme: AppTheme
  position: { x: number; y: number }
  status: string 
}) => ({
  position: 'absolute',
  left: (position.x * screenWidth) - 40,
  top: position.y,
  width: 80,
  height: 80,
  borderRadius: 40,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  backgroundColor: (() => {
    switch (status) {
      case 'locked': return theme.colors.secondary
      case 'unlocked': return theme.colors.primary
      case 'completed': return theme.colors.success
      default: return theme.colors.secondary
    }
  })()
}))

export const LevelNodeInner = styled.View({
  alignItems: 'center',
  justifyContent: 'center'
})

export const LevelIcon = styled.Text<{ status: string }>(
  ({ theme, status }: { theme: AppTheme; status: string }) => ({
    fontSize: theme.typography.xl,
    color: status === 'locked' ? theme.colors.icon : '#FFFFFF',
    marginBottom: 4
  })
)

export const StarsContainer = styled.View({
  flexDirection: 'row',
  gap: 2
})

export const Star = styled.Text<{ filled: boolean }>(
  ({ theme, filled }: { theme: AppTheme; filled: boolean }) => ({
    fontSize: theme.typography.xs,
    color: filled ? theme.colors.gold : 'rgba(255, 255, 255, 0.3)'
  })
)

export const LevelLabel = styled.Text<{ status: string }>(
  ({ theme, status }: { theme: AppTheme; status: string }) => ({
    fontSize: theme.typography.xs,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.text,
    textAlign: 'center' as const,
    width: 100,
    opacity: status === 'locked' ? 0.5 : 1,
    zIndex: 6
  })
)

