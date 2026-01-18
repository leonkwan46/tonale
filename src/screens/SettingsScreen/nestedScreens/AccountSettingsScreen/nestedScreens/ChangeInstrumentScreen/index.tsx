import { updateUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { Icon } from '@/sharedComponents/Icon/Icon'
import { AvatarPreview } from '@/screens/OnboardingScreen/components/AvatarPreview'
import { InstrumentSelection } from '@/screens/OnboardingScreen/components/InstrumentSelection'
import { KeyboardAwareScrollView, ScreenContainer } from '@/sharedComponents'
import { INSTRUMENT, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  Card,
  ErrorContainer,
  ErrorText,
  PrimaryButton,
  PrimaryButtonText,
  ScrollContentContainer
} from './ChangeInstrumentScreen.styles'

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

export const ChangeInstrumentScreen = () => {
  const { userData, setUserData } = useUser()
  const router = useRouter()
  const scrollViewRef = useRef<ScrollView>(null)
  
  const currentInstrument = userData?.instrument
  const initialInstrument = getInstrumentFromValue(currentInstrument)
  // If instrument is "other" or a custom string, show it in the custom input
  // Only show custom value if it's actually a custom instrument (not matching predefined ones)
  const initialCustomInstrument = initialInstrument === INSTRUMENT.OTHER && currentInstrument 
    ? (currentInstrument.toLowerCase() === INSTRUMENT.OTHER ? '' : currentInstrument)
    : ''
  
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(initialInstrument)
  const [customInstrument, setCustomInstrument] = useState<string>(initialCustomInstrument)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleScrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [])

  const handleSave = async () => {
    Keyboard.dismiss()
    setError('')

    if (!selectedInstrument) {
      setError('Please select an instrument')
      return
    }

    if (selectedInstrument === INSTRUMENT.OTHER && !customInstrument.trim()) {
      setError('Please enter your instrument')
      return
    }

    const instrumentValue = selectedInstrument === INSTRUMENT.OTHER 
      ? customInstrument.trim().toLowerCase() 
      : selectedInstrument

    // Only update if instrument actually changed
    if (instrumentValue === currentInstrument) {
      router.back()
      return
    }

    setLoading(true)
    try {
      const result = await updateUserData({ instrument: instrumentValue })
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
        router.back()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update instrument'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const canSave = selectedInstrument !== null && 
    (selectedInstrument !== INSTRUMENT.OTHER || customInstrument.trim().length > 0) &&
    !loading

  return (
    <ScreenContainer>
      <SettingItemHeader title="Change Instrument" />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        <ScrollContentContainer>
          <AvatarPreview 
          selectedGender={userData?.gender || 'male'} 
          selectedInstrument={selectedInstrument}
        />
        <Card>
          {error ? (
            <ErrorContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <InstrumentSelection
            selectedInstrument={selectedInstrument}
            onSelect={setSelectedInstrument}
            customInstrument={customInstrument}
            onCustomInstrumentChange={setCustomInstrument}
            onScrollToBottom={handleScrollToBottom}
          />

          <PrimaryButton
            disabled={!canSave}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <PrimaryButtonText>Save</PrimaryButtonText>
          </PrimaryButton>
        </Card>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}
