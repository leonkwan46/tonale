import { sendEmailVerificationToUser, updateUserDisplayName } from '@/config/firebase/auth'
import { updateUserData } from '@/config/firebase/functions'
import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import { Typography } from '@/compLib/Typography'
import { KeyboardAwareScrollView } from '@/globalComponents/KeyboardAwareScrollView'
import { INSTRUMENT, type UserData, type UserGender, type UserInstrument } from '@types'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { InteractionManager } from 'react-native'
import type { ScrollView } from 'react-native'
import { AvatarPreview } from '../components/AvatarPreview'
import { GenderSelection } from '../components/GenderSelection'
import { InstrumentSelection } from '../components/InstrumentSelection'
import { NameInput } from '../components/NameInput'
import { OnboardingButton } from '../components/OnboardingButton'
import { OnboardingHeader } from '../components/OnboardingHeader'
import { ErrorText, ScrollContentContainer, VerificationModalContent } from './OnboardingBody.styles'

interface OnboardingBodyProps {
  authUser: { uid: string; email: string | null } | null
  setUserData: (userData: UserData) => void
}

export const OnboardingBody = ({
  authUser,
  setUserData
}: OnboardingBodyProps) => {
  const router = useRouter()
  const scrollViewRef = useRef<ScrollView>(null)
  const [selectedGender, setSelectedGender] = useState<UserGender | null>(null)
  const [name, setName] = useState<string>('')
  const [selectedInstrument, setSelectedInstrument] = useState<UserInstrument | null>(null)
  const [customInstrument, setCustomInstrument] = useState<string>('')
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  const handleScrollToBottom = () => {
    InteractionManager.runAfterInteractions(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    })
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
      setShowVerificationModal(true)
    } catch {
      setIsCompleting(false)
      setError('Something went wrong. Please try again.')
    }
  }

  const handleVerificationContinue = () => {
    router.replace('/(tabs)')
  }

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
    >
      <ScrollContentContainer>
        <OnboardingHeader />
      </ScrollContentContainer>

      <AvatarPreview
        selectedGender={selectedGender}
        selectedInstrument={selectedInstrument}
      />

      <ScrollContentContainer>
        <GenderSelection
          selectedGender={selectedGender}
          onSelect={setSelectedGender}
        />

        <NameInput
          name={name}
          onNameChange={setName}
        />

        <InstrumentSelection
          selectedInstrument={selectedInstrument}
          onSelect={setSelectedInstrument}
          customInstrument={customInstrument}
          onCustomInstrumentChange={setCustomInstrument}
          onScrollToBottom={handleScrollToBottom}
        />

        <OnboardingButton
          isEnabled={canCompleteOnboarding}
          isCompleting={isCompleting}
          onPress={handleCompleteOnboarding}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </ScrollContentContainer>

      <Modal
        visible={showVerificationModal}
        onRequestClose={handleVerificationContinue}
      >
        <VerificationModalContent>
          <Typography size="md" align="center" weight="semibold">
            Check your inbox!
          </Typography>
          <Typography size="sm" align="center">
            {`We've sent a verification email to ${authUser?.email ?? 'your email'}. Check your inbox to confirm your account.`}
          </Typography>
          <Button
            variant="filled"
            size="md"
            label="Got it!"
            onPress={handleVerificationContinue}
          />
        </VerificationModalContent>
      </Modal>
    </KeyboardAwareScrollView>
  )
}
