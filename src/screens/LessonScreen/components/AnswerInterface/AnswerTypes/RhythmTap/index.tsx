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

// Pre-load clap sound at module level for bundler resolution
const CLAP_SOUND = require('../../../../../../../assets/sounds/clap.mp3')

type ButtonState = 'default' | 'correct' | 'incorrect'

interface RhythmTapProps {
  onTapSubmit: (timestamps: number[]) => void
  disabled?: boolean
  shouldStartMetronome?: boolean
  rhythmDuration?: number
  buttonState?: ButtonState
  tempo?: number
}

export const RhythmTap: React.FC<RhythmTapProps> = ({
  onTapSubmit,
  disabled = false,
  shouldStartMetronome = false,
  rhythmDuration = 0,
  buttonState = 'default',
  tempo = 120
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
      
      // Clean up the player after it finishes playing
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

  useEffect(() => {
    if (shouldStartMetronome) {
      setMetronomeEnabled(true)
      startMetronome()
    } else {
      setMetronomeEnabled(false)
      stopMetronome()
    }
  }, [shouldStartMetronome, startMetronome, stopMetronome])

  useEffect(() => {
    if (disabled) {
      if (metronomeEnabled) {
        setMetronomeEnabled(false)
        stopMetronome()
      }
      setTapTimestamps([])
      tapTimestampsRef.current = []
      setIsRecording(false)
      setIsTimeWindowExpired(false)
      startTimeRef.current = null
      hasSubmittedRef.current = false
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current)
        autoSubmitTimeoutRef.current = null
      }
    }
  }, [disabled, metronomeEnabled, stopMetronome])

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
      startTimeRef.current = currentTime
      const initialTimestamps = [0]
      tapTimestampsRef.current = initialTimestamps
      setTapTimestamps(initialTimestamps)
      
      if (!metronomeEnabled) {
        setMetronomeEnabled(true)
        startMetronome()
      }

      if (rhythmDuration > 0) {
        if (autoSubmitTimeoutRef.current) {
          clearTimeout(autoSubmitTimeoutRef.current)
        }
        
        autoSubmitTimeoutRef.current = setTimeout(() => {
          if (!hasSubmittedRef.current) {
            hasSubmittedRef.current = true
            setIsTimeWindowExpired(true)
            
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
          }
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
  }, [disabled, isRecording, tapTimestamps.length, isTimeWindowExpired, metronomeEnabled, startMetronome, stopMetronome, playClapSound, rhythmDuration, onTapSubmit])

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
