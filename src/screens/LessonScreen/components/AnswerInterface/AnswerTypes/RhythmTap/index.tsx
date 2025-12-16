import { useDevice, useMetronome } from '@/hooks'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import { createAudioPlayer } from 'expo-audio'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Container,
  TapButtonContainer,
  TapButtonContent,
  TapButtonDepth,
  TapButtonText
} from './RhythmTap.styles'

const CLAP_SOUND = require('../../../../../../../assets/sounds/clap.mp3')

type ButtonState = 'default' | 'correct' | 'incorrect'

interface RhythmTapProps {
  onTapSubmit: (timestamps: number[]) => void
  disabled?: boolean
  rhythmDuration?: number
  buttonState?: ButtonState
  tempo?: number
  questionInterface?: { rhythm?: number[]; audioFile?: string }
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
  const [isTapPressed, setIsTapPressed] = useState(false)
  const [isTimeWindowExpired, setIsTimeWindowExpired] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const autoSubmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasSubmittedRef = useRef<boolean>(false)
  const tapTimestampsRef = useRef<number[]>([])

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
  }, [metronomeEnabled, isPulseExercise, onRecordingChange, onTapSubmit, stopMetronome])

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
        startMetronome()
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
  }, [disabled, isRecording, tapTimestamps.length, isTimeWindowExpired, metronomeEnabled, isPulseExercise, startMetronome, stopMetronome, playClapSound, rhythmDuration, submitAnswer, onRecordingChange])

  const isButtonDisabled = disabled || isTimeWindowExpired || hasSubmittedRef.current

  return (
    <Container>
      <TapButtonContainer
        isPressed={isTapPressed}
        isTablet={isTablet}
        onPressIn={() => {
          setIsTapPressed(true)
          handleTapIn()
        }}
        onPressOut={() => setIsTapPressed(false)}
        disabled={isButtonDisabled}
      >
        <TapButtonDepth 
          buttonState={buttonState}
          isActive={isRecording} 
          isDisabled={isButtonDisabled}
          isTablet={isTablet} 
        />
        <TapButtonContent 
          buttonState={buttonState}
          isActive={isRecording} 
          isDisabled={isButtonDisabled}
          isTablet={isTablet}
        >
          <TapButtonText isTablet={isTablet}>
            Tap
          </TapButtonText>
        </TapButtonContent>
      </TapButtonContainer>
    </Container>
  )
}
