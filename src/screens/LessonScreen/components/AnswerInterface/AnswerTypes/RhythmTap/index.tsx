import { useDevice, useMetronome } from '@/hooks'
import { Button3D } from '@/sharedComponents/Button3D'
import type { ButtonColor } from '@/sharedComponents/Button3D/Button3D.styles'
import type { QuestionInterface } from '@/types/lesson'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { Container, TapButtonText } from './RhythmTap.styles'

const CLAP_SOUND = require('../../../../../../../assets/sounds/clap.mp3')

interface RhythmTapProps {
  onTapSubmit: (timestamps: number[]) => void
  disabled?: boolean
  rhythmDuration?: number
  buttonState?: 'default' | 'correct' | 'incorrect'
  tempo?: number
  questionInterface?: QuestionInterface
  onRecordingChange?: (isRecording: boolean) => void
  onPlaybackFinishRef?: React.MutableRefObject<(() => void) | null>
}

export const RhythmTap: React.FC<RhythmTapProps> = ({
  onTapSubmit,
  disabled = false,
  rhythmDuration = 0,
  buttonState = 'default',
  tempo = 120,
  questionInterface,
  onRecordingChange,
  onPlaybackFinishRef
}) => {
  const { isTablet } = useDevice()
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [metronomeEnabled, setMetronomeEnabled] = useState(false)
  const [isTimeWindowExpired, setIsTimeWindowExpired] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const autoSubmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasSubmittedRef = useRef<boolean>(false)
  const tapTimestampsRef = useRef<number[]>([])

  // Map button state to ButtonColor
  const getButtonColor = (state: 'default' | 'correct' | 'incorrect'): ButtonColor => {
    switch (state) {
      case 'correct':
        return 'green'
      case 'incorrect':
        return 'red'
      default:
        return 'blue'
    }
  }

  const playClapSound = useCallback(() => {
    try {
      const player = createAudioPlayer(CLAP_SOUND)
      player.volume = 0.8
      void player.play()
      
      setupAutoCleanup(player)
    } catch (error) {
      console.warn('Could not play clap sound:', error)
    }
  }, [])
  
  const { start: startMetronome, stop: stopMetronome } = useMetronome({
    enabled: false,
    volume: 0.4,
    bpm: tempo
  })

  const isPulseExercise = questionInterface?.audioFile && !questionInterface?.rhythm

  const submitAnswer = useCallback(() => {
    if (hasSubmittedRef.current) return
    
    hasSubmittedRef.current = true
    setIsTimeWindowExpired(true)
    setIsRecording(false)
    onRecordingChange?.(false)
    
    if (metronomeEnabled) {
      setMetronomeEnabled(false)
      stopMetronome()
    }
    
    const finalTimestamps = tapTimestampsRef.current.length > 0 
      ? tapTimestampsRef.current 
      : [0]
    
    setTimeout(() => {
      onTapSubmit(finalTimestamps)
    }, 0)
  }, [metronomeEnabled, onRecordingChange, onTapSubmit, stopMetronome])

  useEffect(() => {
    if (isPulseExercise && onPlaybackFinishRef) {
      onPlaybackFinishRef.current = submitAnswer
      return () => {
        if (onPlaybackFinishRef) {
          onPlaybackFinishRef.current = null
        }
      }
    }
  }, [isPulseExercise, onPlaybackFinishRef, submitAnswer])

  useEffect(() => {
    if (disabled) {
      if (metronomeEnabled) {
        setMetronomeEnabled(false)
        stopMetronome()
      }
      setTapTimestamps([])
      tapTimestampsRef.current = []
      setIsRecording(false)
      onRecordingChange?.(false)
      setIsTimeWindowExpired(false)
      startTimeRef.current = null
      hasSubmittedRef.current = false
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
        autoSubmitTimeoutRef.current = null
      }
    }
  }, [disabled, metronomeEnabled, stopMetronome, onRecordingChange])

  useEffect(() => {
    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
      }
    }
  }, [])

  const handleTapIn = useCallback(() => {
    if (disabled || isTimeWindowExpired || hasSubmittedRef.current) return
    if (!isRecording && tapTimestamps.length > 0) return

    const currentTime = Date.now()
    
    if (!isRecording) {
      setIsRecording(true)
      onRecordingChange?.(true)
      startTimeRef.current = currentTime
      const initialTimestamps = [0]
      tapTimestampsRef.current = initialTimestamps
      setTapTimestamps(initialTimestamps)
      
      if (!metronomeEnabled && !isPulseExercise) {
        setMetronomeEnabled(true)
        startMetronome(currentTime)
      }

      if (rhythmDuration > 0 && !isPulseExercise) {
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
        }
        
        autoSubmitTimeoutRef.current = setTimeout(() => {
          submitAnswer()
        }, rhythmDuration)
      }
    } else if (!isTimeWindowExpired) {
      const relativeTime = (currentTime - (startTimeRef.current || currentTime)) / 1000
      setTapTimestamps(prev => {
        const updated = [...prev, relativeTime]
        tapTimestampsRef.current = updated
        return updated
      })
    }

    playClapSound()
  }, [disabled, isRecording, tapTimestamps.length, isTimeWindowExpired, metronomeEnabled, isPulseExercise, startMetronome, playClapSound, rhythmDuration, submitAnswer, onRecordingChange])

  const isButtonDisabled = disabled || isTimeWindowExpired || hasSubmittedRef.current

  // Button dimensions
  const buttonHeight = isTablet ? scale(120) : scale(160)
  const buttonWidth = isTablet ? scale(240) : scale(280)

  return (
    <Container>
      <Button3D
        onPress={handleTapIn}
        disabled={isButtonDisabled}
        color={getButtonColor(buttonState)}
        width={buttonWidth}
        height={buttonHeight}
      >
        {() => (
          <TapButtonText isTablet={isTablet}>
            Tap
          </TapButtonText>
        )}
      </Button3D>
    </Container>
  )
}
