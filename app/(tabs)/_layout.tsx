import styled from '@emotion/native'
import { Tabs } from 'expo-router'
import React from 'react'

import { FEATURES, isFeatureEnabled } from '@/config/featureFlags'
import { useUser } from '@/hooks'
import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { CustomTabBar } from '../../src/globalComponents/CustomTabBar'

const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background,
  padding: theme.spacing.lg
}))

const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.lg,
  textAlign: 'center',
  marginBottom: theme.spacing.sm,
  fontFamily: getSourGummyFontFamily('400')
}))

const ErrorSubtext = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.sm,
  textAlign: 'center',
  opacity: 0.7,
  fontFamily: getSourGummyFontFamily('400')
}))

export default function TabLayout() {
  const { authUser, loading } = useUser()
  
  if (loading) {
    return (
      <ErrorContainer>
        <ErrorText>
          Loading...
        </ErrorText>
      </ErrorContainer>
    )
  }
  
  if (!authUser) {
    return (
      <ErrorContainer>
        <ErrorText>
          Access Denied
        </ErrorText>
        <ErrorSubtext>
          You must be authenticated to access this area
        </ErrorSubtext>
      </ErrorContainer>
    )
  }

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
