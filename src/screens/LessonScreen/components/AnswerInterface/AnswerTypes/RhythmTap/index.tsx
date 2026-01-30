import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { createAudioPlayer } from 'expo-audio'
import { useMetronome } from '@/hooks'
import { setupAutoCleanup } from '@/utils/audioPlayerUtils'
import type { QuestionInterface } from '@/types/lesson'
import { TapButton, TapButtonText } from './RhythmTap.styles'

const CLAP_SOUND = require('../../../../../../assets/sounds/clap.mp3')

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

/**
 * RhythmTap answer interface component.
 * Records tap timestamps and auto-submits based on exercise type.
 *
 * Features:
 * - Records relative timestamps (first tap = 0)
 * - Detects exercise type (pulse vs rhythm)
 * - Auto-starts metronome for rhythm exercises
 * - Auto-submits after playback (pulse) or duration (rhythm)
 * - 3D button with visual feedback
 * - Clap sound on each tap
 * - Prevents duplicate submissions
 *
 * @param props - Component configuration and callbacks
 */
export const RhythmTap = ({
  onTapSubmit,
  disabled = false,
  rhythmDuration,
  buttonState = 'default',
  tempo = 90,
  questionInterface,
  onRecordingChange,
  onPlaybackFinishRef
}: RhythmTapProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isTimeWindowExpired, setIsTimeWindowExpired] = useState(false)

  const startTimeRef = useRef<number>(0)
  const tapTimestampsRef = useRef<number[]>([])
  const hasSubmittedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { start: startMetronome, stop: stopMetronome } = useMetronome(tempo)

  // Detect exercise type
  const isPulseExercise = Boolean(questionInterface?.audioFile && !questionInterface?.rhythm)
  const isRhythmExercise = Boolean(questionInterface?.rhythm && !questionInterface?.audioFile)

  // Play clap sound on tap
  const playClapSound = useCallback(() => {
    const player = createAudioPlayer(CLAP_SOUND)
    player.volume = 0.8
    void player.play()
    setupAutoCleanup(player)
  }, [])

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (hasSubmittedRef.current) return

    hasSubmittedRef.current = true
    setIsRecording(false)
    stopMetronome()
    onRecordingChange?.(false)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    onTapSubmit(tapTimestampsRef.current)
  }, [onTapSubmit, stopMetronome, onRecordingChange])

  // Set up playback finish callback for pulse exercises
  useEffect(() => {
    if (isPulseExercise && onPlaybackFinishRef) {
      onPlaybackFinishRef.current = () => {
        if (isRecording && tapTimestampsRef.current.length > 0) {
          handleSubmit()
        }
      }
    }

    return () => {
      if (onPlaybackFinishRef) {
        onPlaybackFinishRef.current = null
      }
    }
  }, [isPulseExercise, isRecording, onPlaybackFinishRef, handleSubmit])

  // Handle tap
  const handleTap = useCallback(() => {
    if (disabled || isTimeWindowExpired) return

    const now = Date.now()

    if (!isRecording) {
      // First tap - start recording
      startTimeRef.current = now
      const firstTimestamp = 0

      tapTimestampsRef.current = [firstTimestamp]
      setIsRecording(true)
      onRecordingChange?.(true)

      playClapSound()

      // Start metronome for rhythm exercises
      if (isRhythmExercise) {
        startMetronome()
      }

      // Set auto-submit timeout for rhythm exercises
      if (isRhythmExercise && rhythmDuration) {
        timeoutRef.current = setTimeout(() => {
          setIsTimeWindowExpired(true)
          handleSubmit()
        }, rhythmDuration)
      }
    } else {
      // Subsequent taps - record relative timestamp
      const relativeTimestamp = (now - startTimeRef.current) / 1000

      tapTimestampsRef.current = [...tapTimestampsRef.current, relativeTimestamp]

      playClapSound()
    }
  }, [
    disabled,
    isTimeWindowExpired,
    isRecording,
    isRhythmExercise,
    rhythmDuration,
    onRecordingChange,
    playClapSound,
    startMetronome,
    handleSubmit
  ])

  // Cleanup on unmount or disable
  useEffect(() => {
    if (disabled) {
      stopMetronome()
      setIsRecording(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [disabled, stopMetronome])

  useEffect(() => {
    return () => {
      stopMetronome()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [stopMetronome])

  return (
    <TouchableOpacity onPress={handleTap} disabled={disabled || isTimeWindowExpired}>
      <TapButton
        state={buttonState}
        isRecording={isRecording}
        disabled={disabled || isTimeWindowExpired}
      >
        <TapButtonText>
          {isRecording ? 'Tap!' : 'Start'}
        </TapButtonText>
      </TapButton>
    </TouchableOpacity>
  )
}
