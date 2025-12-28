import { updateUserData } from '@/config/firebase/functions'
import { INSTRUMENT, type UserGender, type UserInstrument, type UserProfile } from '@types'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { useState } from 'react'
import { scale } from 'react-native-size-matters'
import { AvatarPreview } from '../components/AvatarPreview'
import { CustomInstrumentInput } from '../components/CustomInstrumentInput'
import { GenderSelection } from '../components/GenderSelection'
import { InstrumentSelection } from '../components/InstrumentSelection'
import { OnboardingButton } from '../components/OnboardingButton'
import { OnboardingHeader } from '../components/OnboardingHeader'
import { ContentContainer } from './OnboardingBody.styles'

interface OnboardingBodyProps {
  user: { uid: string } | null
  setProfile: (profile: UserProfile) => void
}

export const OnboardingBody: React.FC<OnboardingBodyProps> = ({
  user,
  setProfile
}) => {
  const router = useRouter()
  const [selectedGender, setSelectedGender] = useState<UserGender | null>('male')
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(null)
  const [customInstrument, setCustomInstrument] = useState<string>('')
  const [isCompleting, setIsCompleting] = useState(false)

  const canCompleteOnboarding = selectedGender !== null && 
    selectedInstrument !== null && 
    (selectedInstrument !== INSTRUMENT.OTHER || customInstrument.trim().length > 0) &&
    !isCompleting

  const handleCompleteOnboarding = async () => {
    if (!selectedGender || !selectedInstrument || !user) {
      return
    }

    setIsCompleting(true)

    try {
      const instrumentValue = selectedInstrument === INSTRUMENT.OTHER 
        ? customInstrument.trim().toLowerCase() 
        : selectedInstrument

      const result = await updateUserData({
        onboardingCompleted: true,
        gender: selectedGender,
        instrument: instrumentValue
      })

      // Use profile data from updateUserData response to avoid extra getUserData call
      if (result.data.success && result.data.data) {
        setProfile(result.data.data)
      }
      router.replace('/(tabs)')
    } catch {
      setIsCompleting(false)
    }
  }

  return (
    <ContentContainer 
      contentContainerStyle={{ 
        alignItems: 'center',
        paddingBottom: scale(20)
      }}
    >
      <OnboardingHeader />

      <AvatarPreview 
        selectedGender={selectedGender} 
        selectedInstrument={selectedInstrument}
      />

      <GenderSelection
        selectedGender={selectedGender}
        onSelect={setSelectedGender}
      />

      <InstrumentSelection
        selectedInstrument={selectedInstrument}
        onSelect={(instrument) => {
          setSelectedInstrument(instrument)
          if (instrument !== INSTRUMENT.OTHER) {
            setCustomInstrument('')
          }
        }}
      />

      {selectedInstrument === INSTRUMENT.OTHER && (
        <CustomInstrumentInput
          value={customInstrument}
          onChangeText={setCustomInstrument}
        />
      )}

      <OnboardingButton
        isEnabled={canCompleteOnboarding}
        isCompleting={isCompleting}
        onPress={handleCompleteOnboarding}
      />
    </ContentContainer>
  )
}

