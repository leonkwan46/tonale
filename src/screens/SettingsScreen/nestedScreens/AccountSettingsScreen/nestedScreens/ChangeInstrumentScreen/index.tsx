import { updateUserData } from '@/config/firebase/functions'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { AvatarPreview } from '@/screens/OnboardingScreen/components/AvatarPreview'
import { InstrumentSelection } from '@/screens/OnboardingScreen/components/InstrumentSelection'
import { Icon } from '@/sharedComponents/Icon'
import { Button3D } from '@/sharedComponents/Button3D'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import { GENDER, INSTRUMENT, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  ErrorContainer,
  ErrorText,
  PrimaryButtonText,
  SaveButtonContent,
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
      setError(
        getUserFacingErrorMessage(
          err,
          'Couldn’t update your instrument. Please try again.'
        )
      )
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
            selectedGender={userData?.gender || GENDER.MALE} 
            selectedInstrument={selectedInstrument}
          />
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

          <Button3D
            disabled={!canSave}
            onPress={handleSave}
            color="blue"
            layoutType="row"
            fullWidth
          >
            {() => (
              <SaveButtonContent>
                <PrimaryButtonText>Save</PrimaryButtonText>
              </SaveButtonContent>
            )}
          </Button3D>
        </ScrollContentContainer>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}
