import { ReactNode } from 'react'
import { Linking } from 'react-native'

import {
  ParagraphBold,
  ParagraphHighlight,
  ParagraphItalic,
  ParagraphPlain
} from './PrivacyPolicyScreen.styles'

export type FormattedSegment = {
  type: 'normal' | 'bold' | 'italic' | 'highlight'
  text: string
}

/**
 * Parses policy text with **bold**, *italic*, and ==highlight== (primary colour) markup.
 * Uses lazy .*? for robustness (e.g. **text with * inside**).
 */
export const parseFormattedText = (text: string): FormattedSegment[] => {
  const segments: FormattedSegment[] = []
  let lastIndex = 0
  const combinedRegex = /\*\*(.*?)\*\*|\*(.*?)\*|==(.*?)==/g
  let match: RegExpExecArray | null

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'normal', text: text.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'bold', text: match[1] })
    } else if (match[2] !== undefined) {
      segments.push({ type: 'italic', text: match[2] })
    } else if (match[3] !== undefined) {
      segments.push({ type: 'highlight', text: match[3] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'normal', text: text.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: 'normal', text }]
}

const looksLikeEmail = (text: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())

export const renderFormattedSegments = (
  segments: FormattedSegment[],
  keyPrefix: string
): ReactNode[] => {
  return segments.map((seg, i) => {
    const key = `${keyPrefix}-${i}`
    if (seg.type === 'bold') {
      return (
        <ParagraphBold key={key} size="sm" weight="semibold">
          {seg.text}
        </ParagraphBold>
      )
    }
    if (seg.type === 'italic') {
      return (
        <ParagraphItalic key={key} size="sm" italic>
          {seg.text}
        </ParagraphItalic>
      )
    }
    if (seg.type === 'highlight') {
      if (looksLikeEmail(seg.text)) {
        return (
          <ParagraphHighlight
            key={key}
            size="sm"
            weight="semibold"
            colorVariant="primary"
            onPress={() => Linking.openURL(`mailto:${seg.text}`)}
          >
            {seg.text}
          </ParagraphHighlight>
        )
      }
      return (
        <ParagraphHighlight
          key={key}
          size="sm"
          weight="semibold"
          colorVariant="primary"
        >
          {seg.text}
        </ParagraphHighlight>
      )
    }
    return (
      <ParagraphPlain key={key} size="sm">
        {seg.text}
      </ParagraphPlain>
    )
  })
}
