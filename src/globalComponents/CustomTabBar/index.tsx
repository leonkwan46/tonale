import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@emotion/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

import { Ionicons } from '@expo/vector-icons'
import { TAB_CONFIG, TabBarContainer, TabButton, TabIcon, TabLabel } from './CustomTabBar.styles'
import { isFeatureEnabled, FEATURES } from '@/config/featureFlags'

type IoniconsName = keyof typeof Ionicons.glyphMap

const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case 'index':
      return 'home'
    case 'theory':
      return 'book'
    case 'aural':
      return 'musical-notes'
    case 'settings':
    case 'settings/index':
      return 'settings'
    default:
      return 'home'
  }
}

const getTabLabel = (routeName: string) => {
  switch (routeName) {
    case 'index':
      return 'Home'
    case 'theory':
      return 'Theory'
    case 'aural':
      return 'Aural'
    case 'settings':
    case 'settings/index':
      return 'Settings'
    default:
      return 'Home'
  }
}

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const config = theme.device.isTablet ? TAB_CONFIG.TABLET : TAB_CONFIG.PHONE
  const isAuralEnabled = isFeatureEnabled(FEATURES.ENABLE_AURAL_LESSONS)

  return (
    <TabBarContainer 
      bottomInset={insets.bottom} 
      config={config}
    >
      {state.routes
        .filter((route) => {
          // Filter out aural route if feature is disabled
          if (route.name === 'aural' && !isAuralEnabled) {
            return false
          }
          return true
        })
        .map((route) => {
        const { options } = descriptors[route.key]
        const focusedRoute = state.routes[state.index]
        const isFocused = route.key === focusedRoute?.key

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const label = options.title || getTabLabel(route.name)
        const iconName: IoniconsName = getTabIcon(route.name) as IoniconsName

        return (
          <TabButton
            key={route.key}
            testID={`tab-${route.name}`}
            onPress={onPress}
            activeOpacity={0.7}
            config={config}
          >
            <TabIcon
              name={iconName}
              size={theme.device.isTablet ? config.iconSize : scale(config.iconSize)}
              focused={isFocused}
              config={config}
            />
            <TabLabel 
              focused={isFocused} 
              config={config}
            >
              {label}
            </TabLabel>
          </TabButton>
        )
      })}
    </TabBarContainer>
  )
}
