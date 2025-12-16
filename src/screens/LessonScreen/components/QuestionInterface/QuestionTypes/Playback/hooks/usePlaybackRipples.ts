import { useCallback, useEffect, useRef, useState } from 'react'
import { convertDurationsToTimestamps } from '../utils'

interface UsePlaybackRipplesOptions {
  isPlaying: boolean
  rhythm?: number[]
}

interface UsePlaybackRipplesReturn {
  ripples: number[]
  removeRipple: (id: number) => void
}

export const usePlaybackRipples = ({
  isPlaying,
  rhythm
}: UsePlaybackRipplesOptions): UsePlaybackRipplesReturn => {
  const [ripples, setRipples] = useState<number[]>([])
  const rippleIdRef = useRef(0)
  const timeoutRefsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(rippleId => rippleId !== id))
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setRipples([])
      const timeouts = timeoutRefsRef.current
      timeouts.forEach(timeout => clearTimeout(timeout))
      timeouts.clear()
      return
    }

    if (!rhythm) return

    const timestamps = convertDurationsToTimestamps(rhythm)
    timestamps.forEach(timestamp => {
      const timeout = setTimeout(() => {
        setRipples(prev => [...prev, rippleIdRef.current++])
        timeoutRefsRef.current.delete(timeout)
      }, timestamp * 1000)
      timeoutRefsRef.current.add(timeout)
    })

    const timeouts = timeoutRefsRef.current
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      timeouts.clear()
    }
  }, [isPlaying, rhythm])

  return {
    ripples,
    removeRipple
  }
}

