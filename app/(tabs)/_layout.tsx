import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'

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
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].surface,
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          paddingVertical: 8,
          paddingHorizontal: 16,
          height: Platform.select({
            ios: 88, // Accounts for home indicator
            android: 70
          }),
          elevation: 8, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 0.1,
          shadowRadius: 8
        }
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
          title: 'Theory',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="book" color={color} />
        }}
      />
      <Tabs.Screen
        name="aural"
        options={{
          title: 'Aural',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="musical-notes" color={color} />
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
