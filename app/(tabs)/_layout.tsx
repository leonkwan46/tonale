import styled from '@emotion/native'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useUser } from '@/hooks'
import { CustomTabBar } from '@/sharedComponents'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { backgroundColor: string }) => props.backgroundColor};
  padding: 20px;
`

const ErrorText = styled.Text`
  color: ${(props: { textColor: string }) => props.textColor};
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  font-family: "${getSourGummyFontFamily('400')}";
`

const ErrorSubtext = styled.Text`
  color: ${(props: { textColor: string }) => props.textColor};
  font-size: 14px;
  text-align: center;
  opacity: 0.7;
  font-family: "${getSourGummyFontFamily('400')}";
`

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { user, loading } = useUser()
  
  // Show loading state
  if (loading) {
    return (
      <ErrorContainer backgroundColor={Colors[colorScheme ?? 'light'].background}>
        <ErrorText textColor={Colors[colorScheme ?? 'light'].text}>
          Loading...
        </ErrorText>
      </ErrorContainer>
    )
  }
  
  // Show error for unauthenticated access
  if (!user) {
    return (
      <ErrorContainer backgroundColor={Colors[colorScheme ?? 'light'].background}>
        <ErrorText textColor={Colors[colorScheme ?? 'light'].text}>
          Access Denied
        </ErrorText>
        <ErrorSubtext textColor={Colors[colorScheme ?? 'light'].text}>
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
