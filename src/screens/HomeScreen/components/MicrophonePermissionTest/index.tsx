import { useMicrophonePermission } from '@/hooks'
import * as React from 'react'
import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import {
  ButtonContainer,
  ButtonDepth,
  PermissionCardContainer,
  PermissionCardContent,
  StatusText,
  TestButton,
  TestButtonText
} from './MicrophonePermissionTest.styles'

export const MicrophonePermissionTest: React.FC = () => {
  const {
    status,
    isGranted,
    isLoading,
    isModuleAvailable,
    requestPermission,
    checkPermission,
    openAppSettings
  } = useMicrophonePermission()
  const [requestButtonPressed, setRequestButtonPressed] = useState(false)
  const [settingsButtonPressed, setSettingsButtonPressed] = useState(false)
  const [refreshButtonPressed, setRefreshButtonPressed] = useState(false)

  const getStatusText = (): string => {
    if (!isModuleAvailable) {
      return '⚠️ Native module not available. Rebuild native projects to enable permissions.'
    }
    if (isLoading) return 'Checking permission...'
    if (!status) return 'Status: Unknown'
    
    switch (status) {
      case 'granted':
        return '✅ Microphone permission granted'
      case 'denied':
        return '❌ Microphone permission denied'
      case 'blocked':
        return '🚫 Microphone permission blocked. Please enable in settings.'
      case 'limited':
        return '⚠️ Microphone permission limited'
      case 'unavailable':
        return '⚠️ Microphone unavailable on this device'
      default:
        return `Status: ${status}`
    }
  }

  const handleRequestPermission = async () => {
    if (!isModuleAvailable) {
      Alert.alert(
        'Permission Module Not Available',
        'The native permissions module is not linked. Please rebuild the app:\n\n' +
        (Platform.OS === 'ios' 
          ? 'Run: npx expo run:ios' 
          : 'Run: npx expo run:android')
      )
      return
    }
    
    try {
      const newStatus = await requestPermission()
      
      // Show user feedback
      if (newStatus === 'granted') {
        Alert.alert('Success', 'Microphone permission granted!')
      } else if (newStatus === 'denied') {
        Alert.alert(
          'Permission Denied',
          'Microphone permission was denied. You can enable it in Settings.'
        )
      } else if (newStatus === 'blocked') {
        Alert.alert(
          'Permission Blocked',
          'Microphone permission is blocked. Please enable it in your device Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openAppSettings }
          ]
        )
      } else if (newStatus !== 'unavailable') {
        Alert.alert('Permission Status', `Permission status: ${newStatus}`)
      }
    } catch (error) {
      console.error('[MicrophonePermissionTest] Error requesting permission:', error)
      Alert.alert('Error', `Failed to request permission: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleCheckPermission = async () => {
    if (!isModuleAvailable) {
      return
    }
    await checkPermission()
  }

  const handleOpenSettings = async () => {
    await openAppSettings()
  }

  return (
    <PermissionCardContainer>
      <PermissionCardContent>
        <StatusText>{getStatusText()}</StatusText>
        
        <ButtonContainer isPressed={requestButtonPressed}>
          <ButtonDepth />
          <TestButton
            onPress={handleRequestPermission}
            onPressIn={() => setRequestButtonPressed(true)}
            onPressOut={() => setRequestButtonPressed(false)}
            disabled={isLoading || isGranted}
          >
            <TestButtonText>
              {isGranted ? 'Permission Granted' : 'Request Permission'}
            </TestButtonText>
          </TestButton>
        </ButtonContainer>

        {status === 'blocked' && (
          <ButtonContainer isPressed={settingsButtonPressed}>
            <ButtonDepth />
            <TestButton
              onPress={handleOpenSettings}
              onPressIn={() => setSettingsButtonPressed(true)}
              onPressOut={() => setSettingsButtonPressed(false)}
            >
              <TestButtonText>Open Settings</TestButtonText>
            </TestButton>
          </ButtonContainer>
        )}

        <ButtonContainer isPressed={refreshButtonPressed}>
          <ButtonDepth />
          <TestButton
            onPress={handleCheckPermission}
            onPressIn={() => setRefreshButtonPressed(true)}
            onPressOut={() => setRefreshButtonPressed(false)}
            disabled={isLoading}
          >
            <TestButtonText>Refresh Status</TestButtonText>
          </TestButton>
        </ButtonContainer>
      </PermissionCardContent>
    </PermissionCardContainer>
  )
}

