import { updateUserData } from '@/config/firebase/functions'
import { INSTRUMENT, type UserGender, type UserInstrument, type UserProfile } from '@types'
import { useRouter } from 'expo-router'
import * as React from 'react'
import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDevice } from '../../../hooks/useDevice'
import { AvatarPreview } from '../components/AvatarPreview'
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
  const { isTablet } = useDevice()
  const scrollViewRef = useRef<ScrollView>(null)
  const [selectedGender, setSelectedGender] = useState<UserGender | null>('male')
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(null)
  const [customInstrument, setCustomInstrument] = useState<string>('')
  const [isCompleting, setIsCompleting] = useState(false)

  const handleScrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

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
      ref={scrollViewRef}
      isTablet={isTablet}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
      contentContainerStyle={{ 
        alignItems: 'center',
        padding: isTablet ? scale(8) : scale(10),
        gap: isTablet ? scale(16) : scale(32)
      }}
    >
      <OnboardingHeader isTablet={isTablet} />

      <AvatarPreview 
        selectedGender={selectedGender} 
        selectedInstrument={selectedInstrument}
        isTablet={isTablet}
      />

      <GenderSelection
        selectedGender={selectedGender}
        onSelect={setSelectedGender}
        isTablet={isTablet}
      />

      <InstrumentSelection
        selectedInstrument={selectedInstrument}
        onSelect={setSelectedInstrument}
        customInstrument={customInstrument}
        onCustomInstrumentChange={setCustomInstrument}
        onScrollToBottom={handleScrollToBottom}
        isTablet={isTablet}
      />

      <OnboardingButton
        isEnabled={canCompleteOnboarding}
        isCompleting={isCompleting}
        onPress={handleCompleteOnboarding}
        isTablet={isTablet}
      />
    </ContentContainer>
  )
}

