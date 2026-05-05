import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { FEATURES, isFeatureEnabled } from '@/config/featureFlags'
import { CustomTabBar } from '@/globalComponents/CustomTabBar'
import { useUserStore } from '@/stores/userStore'

const TabLayout = () => {
  const authUser = useUserStore(s => s.authUser)

  if (!authUser) return <Redirect href="/(auth)" />

  const isAuralEnabled = isFeatureEnabled(FEATURES.ENABLE_AURAL_LESSONS)

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="theory" />
      <Tabs.Screen 
        name="aural" 
        options={{
          href: isAuralEnabled ? '/aural' : null
        }}
      />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}

export default TabLayout
