import { sendEmailVerificationToUser, updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { useDevice } from '@/hooks'
import { KeyboardAwareScrollView } from '@/sharedComponents'
import { INSTRUMENT, type UserData, type UserGender, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import type { ScrollView } from 'react-native'
import { AvatarPreview } from '../components/AvatarPreview'
import { GenderSelection } from '../components/GenderSelection'
import { InstrumentSelection } from '../components/InstrumentSelection'
import { NameInput } from '../components/NameInput'
import { OnboardingButton } from '../components/OnboardingButton'
import { OnboardingHeader } from '../components/OnboardingHeader'
import { ContentContainerStyle } from './OnboardingBody.styles'

interface OnboardingBodyProps {
  authUser: { uid: string } | null
  setUserData: (userData: UserData) => void
}

export const OnboardingBody = ({
  authUser,
  setUserData
}: OnboardingBodyProps) => {
  const router = useRouter()
  const { isTablet } = useDevice()
  const scrollViewRef = useRef<ScrollView>(null)
  const [selectedGender, setSelectedGender] = useState<UserGender | null>('male')
  const [name, setName] = useState<string>('')
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(null)
  const [customInstrument, setCustomInstrument] = useState<string>('')
  const [isCompleting, setIsCompleting] = useState(false)

  const handleScrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const canCompleteOnboarding = selectedGender !== null && 
    name.trim().length > 0 &&
    selectedInstrument !== null && 
    (selectedInstrument !== INSTRUMENT.OTHER || customInstrument.trim().length > 0) &&
    !isCompleting

  const handleCompleteOnboarding = async () => {
    if (!selectedGender || !name.trim() || !selectedInstrument || !authUser) {
      return
    }

    setIsCompleting(true)

    try {
      const trimmedName = name.trim()
      const instrumentValue = selectedInstrument === INSTRUMENT.OTHER 
        ? customInstrument.trim().toLowerCase() 
        : selectedInstrument

      const [result] = await Promise.all([
        updateUserData({
          onboardingCompleted: true,
          gender: selectedGender,
          name: trimmedName,
          instrument: instrumentValue
        }),
        updateUserDisplayName(trimmedName),
        sendEmailVerificationToUser()
      ])

      // Use userData from updateUserData response to avoid extra getUserData call
      if (result.data.success && result.data.data) {
        setUserData(result.data.data)
      }
      router.replace('/(tabs)')
    } catch {
      setIsCompleting(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
      contentContainerStyle={ContentContainerStyle({ isTablet })}
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

      <NameInput
        name={name}
        onNameChange={setName}
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
    </KeyboardAwareScrollView>
  )
}

