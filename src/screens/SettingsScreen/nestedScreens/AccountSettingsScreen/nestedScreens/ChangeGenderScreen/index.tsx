import { updateUserData } from '@/config/firebase/functions'
import { useDevice, useUser } from '@/hooks'
import { AvatarPreview } from '@/screens/OnboardingScreen/components/AvatarPreview'
import { GenderSelection } from '@/screens/OnboardingScreen/components/GenderSelection'
import { ScreenContainer } from '@/sharedComponents'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  Card,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
  PrimaryButton,
  PrimaryButtonText,
  ScrollContentContainer
} from './ChangeGenderScreen.styles'

const getInstrumentFromValue = (value: string | undefined): UserInstrument | null => {
  if (!value) return null
  
  const lowerValue = value.toLowerCase()
  if (lowerValue === INSTRUMENT.PIANO) return INSTRUMENT.PIANO
  if (lowerValue === INSTRUMENT.GUITAR) return INSTRUMENT.GUITAR
  if (lowerValue === INSTRUMENT.VIOLIN) return INSTRUMENT.VIOLIN
  if (lowerValue === INSTRUMENT.VOCAL) return INSTRUMENT.VOCAL
  if (lowerValue === INSTRUMENT.OTHER) return INSTRUMENT.OTHER
  
  // If it doesn't match any predefined instrument, treat as "other"
  return INSTRUMENT.OTHER
}

export const ChangeGenderScreen = () => {
  const { userData, setUserData } = useUser()
  const router = useRouter()
  const { isTablet } = useDevice()
  const scrollViewRef = useRef<ScrollView>(null)
  
  const currentGender = userData?.gender || 'male'
  const currentInstrument = userData?.instrument
  const initialInstrument = getInstrumentFromValue(currentInstrument)
  
  const [selectedGender, setSelectedGender] = useState<UserGender | null>(currentGender)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    Keyboard.dismiss()
    setError('')

    if (!selectedGender) {
      setError('Please select a gender')
      return
    }

    // Only update if gender actually changed
    if (selectedGender === currentGender) {
      router.back()
      return
    }

    setLoading(true)
    try {
      const result = await updateUserData({ gender: selectedGender })
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
        router.back()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update gender'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const canSave = selectedGender !== null && !loading

  return (
    <ScreenContainer>
      <SettingItemHeader title="Change Gender" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        <ScrollContentContainer isTablet={isTablet}>
          <AvatarPreview 
          selectedGender={selectedGender || 'male'} 
          selectedInstrument={initialInstrument}
          isTablet={isTablet}
        />
        <Card isTablet={isTablet}>
          {error ? (
            <ErrorContainer isTablet={isTablet}>
              <ErrorIcon name="alert-circle" size={isTablet ? scale(14) : scale(20)} />
              <ErrorText isTablet={isTablet}>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <GenderSelection
            selectedGender={selectedGender}
            onSelect={setSelectedGender}
            isTablet={isTablet}
          />

          <PrimaryButton
            disabled={!canSave}
            isTablet={isTablet}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <PrimaryButtonText isTablet={isTablet}>Save</PrimaryButtonText>
          </PrimaryButton>
        </Card>
        </ScrollContentContainer>
      </ScrollView>
    </ScreenContainer>
  )
}
