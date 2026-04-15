import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { FEATURES, isFeatureEnabled } from '@/config/featureFlags'
import { useUser } from '@/hooks'
import { CustomTabBar } from '../../src/globalComponents/CustomTabBar'
import { LoadingContainer, LoadingText } from './_layout.styles'

const TabLayout = () => {
  const { authUser, loading } = useUser()

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    )
  }
  
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
