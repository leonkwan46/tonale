import { updateUserData } from '@/config/firebase/functions'
import { useUser } from '@/hooks'
import { ScreenContainer } from '@/sharedComponents'
import { GridSelection } from '@/sharedComponents/GridSelection'
import { Ionicons } from '@expo/vector-icons'
import type { UserGender, UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { scale } from 'react-native-size-matters'
import {
  ContentContainer,
  ErrorContainer,
  ErrorText,
  PrimaryButton,
  PrimaryButtonText,
  ScrollContainer,
  SectionContainer,
  SectionTitle,
  Subtitle,
  Title
} from './OnboardingScreen.styles'

const GENDER_OPTIONS: UserGender[] = ['male', 'female']
const INSTRUMENT_OPTIONS: UserInstrument[] = [
  'piano',
  'guitar',
  'violin',
  'drums',
  'flute',
  'saxophone',
  'trumpet',
  'cello',
  'other'
]

const getDisplayLabel = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function OnboardingScreen() {
  const router = useRouter()
  const { user, profile, loading: userLoading, setProfile } = useUser()
  const [selectedGender, setSelectedGender] = useState<UserGender | null>(null)
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(null)
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (userLoading) return
    if (!user) {
      router.replace('/(auth)')
      return
    }
    if (profile?.onboardingCompleted === true) {
      router.replace('/(tabs)')
    }
  }, [user, profile, userLoading, router])

  const handleCompleteOnboarding = async () => {
    if (!selectedGender || !selectedInstrument || !user) {
      return
    }

    setIsCompleting(true)
    setError('')

    try {
      const result = await updateUserData({
        onboardingCompleted: true,
        gender: selectedGender,
        instrument: selectedInstrument
      })

      // Use profile data from updateUserData response to avoid extra getUserData call
      if (result.data.success && result.data.data) {
        setProfile(result.data.data)
      }
      router.replace('/(tabs)')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete onboarding'
      setError(errorMessage)
      setIsCompleting(false)
    }
  }

  if (userLoading) {
    return (
      <ScreenContainer>
        <ContentContainer>
          <ActivityIndicator size="large" />
        </ContentContainer>
      </ScreenContainer>
    )
  }

  if (!user || profile?.onboardingCompleted === true) {
    return null
  }

  const canContinue = selectedGender !== null && selectedInstrument !== null && !isCompleting

  return (
    <ScreenContainer>
      <ScrollContainer
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ContentContainer>
          <Title>Welcome to Tonale!</Title>
          <Subtitle>Tell us a bit about yourself to get started</Subtitle>

          {error ? (
            <ErrorContainer>
              <Ionicons name="alert-circle" size={20} color="#ff4757" />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          ) : null}

          <SectionContainer>
            <SectionTitle>Gender</SectionTitle>
            <GridSelection
              options={GENDER_OPTIONS}
              selectedOption={selectedGender}
              onSelect={setSelectedGender}
              getDisplayLabel={getDisplayLabel}
              testID="gender-selection"
            />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Instrument</SectionTitle>
            <GridSelection
              options={INSTRUMENT_OPTIONS}
              selectedOption={selectedInstrument}
              onSelect={setSelectedInstrument}
              getDisplayLabel={getDisplayLabel}
              testID="instrument-selection"
            />
          </SectionContainer>

          <PrimaryButton
            opacity={canContinue ? 1 : 0.7}
            disabled={!canContinue}
            onPress={handleCompleteOnboarding}
            testID="complete-onboarding-button"
          >
            {isCompleting ? (
              <>
                <ActivityIndicator size="small" color="#000" />
                <PrimaryButtonText style={{ marginLeft: scale(8) }}>
                  Completing...
                </PrimaryButtonText>
              </>
            ) : (
              <PrimaryButtonText>Continue</PrimaryButtonText>
            )}
          </PrimaryButton>
        </ContentContainer>
      </ScrollContainer>
    </ScreenContainer>
  )
}

