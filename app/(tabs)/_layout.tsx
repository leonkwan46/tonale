import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { Tabs } from 'expo-router'
import React from 'react'

import { useUser } from '@/hooks'
import { CustomTabBar } from '@/sharedComponents'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

const ErrorContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background,
  padding: 20
}))

const ErrorText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: 18,
  textAlign: 'center',
  marginBottom: 10,
  fontFamily: getSourGummyFontFamily('400')
}))

const ErrorSubtext = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: 14,
  textAlign: 'center',
  opacity: 0.7,
  fontFamily: getSourGummyFontFamily('400')
}))

export default function TabLayout() {
  const theme = useTheme()
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="theory" />
      <Tabs.Screen name="aural" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}
