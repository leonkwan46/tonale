import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, useColorScheme, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styled from '@emotion/native'

import { Colors } from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'

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
`

const ErrorSubtext = styled.Text`
  color: ${(props: { textColor: string }) => props.textColor};
  font-size: 14px;
  text-align: center;
  opacity: 0.7;
`

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { user, loading } = useAuth()
  
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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute'
          },
          default: {}
        })
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="library" color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="settings" color={color} />
        }}
      />
    </Tabs>
  )
}
