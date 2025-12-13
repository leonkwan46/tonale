import { useDevice } from '@/hooks'
import { Ionicons } from '@expo/vector-icons'
import type { QuestionInterface } from '@types'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { QUESTION_TYPE } from '../types'
import { AnimationContainer, IconWrapper, PlaybackCard, PlaybackText, PlayButton } from './Playback.styles'
import { RippleAnimation } from './RippleAnimation'

interface PlaybackProps {
  questionInterface: QuestionInterface
  onPlaybackPress?: () => void
  isPlaying?: boolean
}

export const Playback: FC<PlaybackProps> = ({ 
  questionInterface, 
  onPlaybackPress, 
  isPlaying = false
}) => {
  const { isTablet } = useDevice()
  const [ripples, setRipples] = useState<number[]>([])
  const rippleIdRef = useRef(0)
  const timeoutRefsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(rippleId => rippleId !== id))
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setRipples([])
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutRefsRef.current.clear()
      return
    }

    // Support both rhythm and melody for visual animations
    const rhythm = questionInterface.rhythm
    const melody = questionInterface.melody
    
    let durations: number[] = []
    if (rhythm) {
      durations = rhythm
    } else if (melody) {
      durations = melody.map(note => note.duration)
    }
    
    if (!durations.length) return

    const beatTimestamps: number[] = [0]
    let cumulativeTime = 0
    
    for (let i = 0; i < durations.length - 1; i++) {
      cumulativeTime += durations[i]
      beatTimestamps.push(cumulativeTime)
    }

    beatTimestamps.forEach(timestamp => {
      const timeout = setTimeout(() => {
        setRipples(prev => [...prev, rippleIdRef.current++])
        timeoutRefsRef.current.delete(timeout)
      }, timestamp * 1000)
      timeoutRefsRef.current.add(timeout)
    })

    return () => {
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutRefsRef.current.clear()
    }
  }, [isPlaying, questionInterface.rhythm, questionInterface.melody])

  if (questionInterface.type !== QUESTION_TYPE.PLAYBACK && !onPlaybackPress) return null

  return (
    <PlaybackCard isTablet={isTablet}>
      <PlaybackText isTablet={isTablet}>
        Listen to the question
      </PlaybackText>
      <AnimationContainer isTablet={isTablet}>
        {ripples.map(id => (
          <RippleAnimation 
            key={id}
            isTablet={isTablet}
            onComplete={() => removeRipple(id)}
          />
        ))}
      <PlayButton 
        isTablet={isTablet}
          isPlaying={isPlaying}
          onPlaybackPress={onPlaybackPress}
        onPress={onPlaybackPress}
        disabled={isPlaying || !onPlaybackPress}
      >
          <IconWrapper isPlaying={isPlaying}>
        <Ionicons 
          name={isPlaying ? 'pause' : 'play'} 
          size={isTablet ? scale(40) : scale(50)} 
          color="#fff"
        />
          </IconWrapper>
      </PlayButton>
      </AnimationContainer>
    </PlaybackCard>
  )
}
