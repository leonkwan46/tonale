import { useMemo } from 'react'

import { ScreenContainer } from '@/globalComponents/ScreenContainer'

import { SettingItemHeader } from '../../components/SettingItemHeader'
import { parseFormattedText, renderFormattedSegments } from './formatPolicyText'
import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS
} from './privacyPolicyContent'
import {
  FullScreenScrollView,
  LastUpdatedText,
  Paragraph,
  ScrollContentContainer,
  SectionTitle,
  SectionTitleFirst,
  SectionTitleWrapper
} from './PrivacyPolicyScreen.styles'

type ParsedParagraph = { text: string; segments: ReturnType<typeof parseFormattedText> }
type ParsedSection = { title: string; paragraphs: ParsedParagraph[] }

export const PrivacyPolicyScreen = () => {
  const parsedSections = useMemo<ParsedSection[]>(
    () =>
      PRIVACY_POLICY_SECTIONS.map((section) => ({
        title: section.title,
        paragraphs: section.content
          .split(/\n\n+/)
          .filter(Boolean)
          .map((p) => {
            const text = p.trim()
            return { text, segments: parseFormattedText(text) }
          })
      })),
    []
  )

  return (
    <ScreenContainer>
      <SettingItemHeader title="Privacy Policy" />
      <FullScreenScrollView showsVerticalScrollIndicator={false}>
        <ScrollContentContainer>
          <LastUpdatedText size="xxs" muted>
            Last updated: {PRIVACY_POLICY_LAST_UPDATED}
          </LastUpdatedText>
          {parsedSections.map((section, index) => (
            <SectionBlock
              key={section.title}
              title={section.title}
              paragraphs={section.paragraphs}
              isFirst={index === 0}
            />
          ))}
        </ScrollContentContainer>
      </FullScreenScrollView>
    </ScreenContainer>
  )
}

const SectionBlock = ({
  title,
  paragraphs,
  isFirst
}: {
  title: string
  paragraphs: ParsedParagraph[]
  isFirst: boolean
}) => {
  const WrapperComponent = isFirst ? SectionTitleFirst : SectionTitleWrapper

  return (
    <>
      <WrapperComponent>
        <SectionTitle size="lg" weight="bold" colorVariant="primary">
          {title}
        </SectionTitle>
      </WrapperComponent>
      {paragraphs.map((paragraph, i) => {
        const hasFormatting = paragraph.segments.some(
          (s) => s.type === 'bold' || s.type === 'italic' || s.type === 'highlight'
        )
        return (
          <Paragraph key={i} size="sm">
            {hasFormatting
              ? renderFormattedSegments(paragraph.segments, `${title}-${i}`)
              : paragraph.text}
          </Paragraph>
        )
      })}
    </>
  )
}
