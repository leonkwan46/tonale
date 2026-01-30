import React, { useEffect, useRef, useState } from 'react'

import { TypewriterText } from './Typewriter.styles'

export interface TypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
  delay?: number
  showCursor?: boolean
  cursorChar?: string
  children?: (displayedText: string, isTyping: boolean) => React.ReactNode
}

export const Typewriter = ({
  text,
  speed = 50,
  onComplete,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  children
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const onCompleteRef = useRef(onComplete)

  // Keep ref updated without causing re-renders
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(delayTimeout)
    } else {
      setIsTyping(true)
    }
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let index = 0
    setDisplayedText('')
    
    const interval = setInterval(() => {
      index++
      setDisplayedText(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(interval)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, isTyping])

  const isComplete = displayedText.length >= text.length
  const shouldShowCursor = showCursor && isTyping && !isComplete

  if (children) {
    return <>{children(displayedText, isTyping)}</>
  }

  return (
    <TypewriterText>
      {displayedText}
      {shouldShowCursor && cursorChar}
    </TypewriterText>
  )
}
