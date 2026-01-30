import { useEffect, useState } from 'react'
import { convertDurationsToTimestamps } from '../utils'

interface UsePlaybackRipplesProps {
  isPlaying: boolean
  rhythm?: number[]
}

interface UsePlaybackRipplesReturn {
  ripples: string[]
  removeRipple: (id: string) => void
}

/**
 * Hook for managing visual ripple animations during playback.
 * Creates ripples at each rhythm timestamp and removes them when complete.
 *
 * @param props - Configuration with isPlaying state and rhythm pattern
 * @returns Object with ripples array and removeRipple function
 */
export const usePlaybackRipples = ({
  isPlaying,
  rhythm
}: UsePlaybackRipplesProps): UsePlaybackRipplesReturn => {
  const [ripples, setRipples] = useState<string[]>([])

  useEffect(() => {
    if (!isPlaying || !rhythm) {
      setRipples([])
      return
    }

    const timestamps = convertDurationsToTimestamps(rhythm)
    const timeouts: NodeJS.Timeout[] = []

    timestamps.forEach((timestamp, index) => {
      const timeout = setTimeout(() => {
        const rippleId = `ripple-${Date.now()}-${index}`
        setRipples(prev => [...prev, rippleId])
      }, timestamp * 1000)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(clearTimeout)
      setRipples([])
    }
  }, [isPlaying, rhythm])

  const removeRipple = (id: string) => {
    setRipples(prev => prev.filter(rippleId => rippleId !== id))
  }

  return { ripples, removeRipple }
}
