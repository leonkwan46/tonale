import { updateUserData } from '@/config/firebase/functions'
import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { useUser } from '@/hooks'
import { AvatarPreview } from '@/screens/OnboardingScreen/components/AvatarPreview'
import { GenderSelection } from '@/screens/OnboardingScreen/components/GenderSelection'
import { Icon } from '@/sharedComponents/Icon'
import { Button3D } from '@/sharedComponents/Button3D'
import { getUserFacingErrorMessage } from '@/utils/errorMessages'
import { GENDER, INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { SettingItemHeader } from '../../../../components/SettingItemHeader'
import {
  ErrorContainer,
  ErrorText,
  PrimaryButtonText,
  SaveButtonContent,
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
  const scrollViewRef = useRef<ScrollView>(null)
  
  const currentGender = userData?.gender || GENDER.MALE
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
      setError(
        getUserFacingErrorMessage(
          err,
          'Couldn’t update your gender. Please try again.'
        )
      )
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
        <ScrollContentContainer>
          <AvatarPreview 
            selectedGender={selectedGender || GENDER.MALE} 
            selectedInstrument={initialInstrument}
          />
          {error ? (
            <ErrorContainer>
              <Icon name="alert-circle" sizeVariant="xs" colorVariant="error" />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <GenderSelection
            selectedGender={selectedGender}
            onSelect={setSelectedGender}
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
      </ScrollView>
    </ScreenContainer>
  )
}
