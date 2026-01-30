import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useRef, useState } from 'react'

import { ScreenContainer } from '@/globalComponents/ScreenContainer'
import { Typewriter } from '@/sharedComponents/Typewriter'
import { SettingItemHeader } from '../../components/SettingItemHeader'
import { ContentContainer } from '../../SettingsScreen.styles'
import { CoffeePurchaseButton } from './components/CoffeePurchaseButton'
import {
  ButtonsContainer,
  CharacterImage,
  FullScreenScrollView,
  NarrativeContainer,
  NarrativeLine,
  NarrativeText,
  ScrollContentContainer
} from './DonationScreen.styles'

const NARRATIVE_LINES = [
  'This is Leon.',
  'Leon makes this app.',
  'Leon sleeps on a keyboard.',
  'Leon runs on coffee.',
  'Help Leon survive ☕💀'
] as const

const TYPEWRITER_SPEED = 50
const PAUSE_BETWEEN_LINES_MS = 300

const CHARACTER_IMAGE = require('../../../../../assets/images/coffee/the_developer.png')
const SINGLE_COFFEE_ICON = require('../../../../../assets/images/coffee/coffee_1.png')
const DOUBLE_COFFEE_ICON = require('../../../../../assets/images/coffee/coffee_2.png')

const calculateLineDelays = (lines: readonly string[]): number[] => {
  return lines.map((_, lineIndex) => {
    if (lineIndex === 0) return 0
    
    let totalDelay = 0
    for (let i = 0; i < lineIndex; i++) {
      totalDelay += lines[i].length * TYPEWRITER_SPEED
      totalDelay += PAUSE_BETWEEN_LINES_MS
    }
    return totalDelay
  })
}

const LINE_DELAYS = calculateLineDelays(NARRATIVE_LINES)

const TOTAL_LINES = NARRATIVE_LINES.length
const PAYMENT_LINK_URL = 'https://buy.stripe.com/test_3cI6ozgIW2yL1IU5Rd9oc00'
const DONATION_NARRATIVE_PLAYED_KEY = 'donation:narrativePlayed'

export const DonationScreen = () => {
  const completedLinesCountRef = useRef(0)
  const [hasPlayedNarrative, setHasPlayedNarrative] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState(false)

  // Keep the container (ButtonsContainer) non-animated; we want the buttons visible immediately.
  // (We still keep the typewriter animation for first-time users only.)

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(DONATION_NARRATIVE_PLAYED_KEY)
        setHasPlayedNarrative(stored === '1')
      } catch (error) {
        console.warn('[DonationScreen] Failed to read narrative cache:', error)
      } finally {
        setHydrated(true)
      }
    }

    load()
  }, [])

  const handleLineComplete = () => {
    completedLinesCountRef.current += 1
    
    if (completedLinesCountRef.current === TOTAL_LINES) {
      setHasPlayedNarrative(true)
      AsyncStorage.setItem(DONATION_NARRATIVE_PLAYED_KEY, '1').catch((error) => {
        console.warn('[DonationScreen] Failed to persist narrative cache:', error)
      })
    }
  }

  // If we haven't loaded the cache yet, keep behavior simple: render immediately (no typewriter).
  const shouldAnimateNarrative = hydrated && !hasPlayedNarrative

  const openPaymentLink = async () => {
    await WebBrowser.openBrowserAsync(PAYMENT_LINK_URL)
  }

  const handleSingleCoffeePress = () => {
    openPaymentLink()
  }

  const handleDoubleCoffeePress = () => {
    openPaymentLink()
  }

  return (
    <ScreenContainer>
      <SettingItemHeader title="Donation" />
      <FullScreenScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ScrollContentContainer>
          <ContentContainer>
            <CharacterImage source={CHARACTER_IMAGE} />
            
            <NarrativeContainer>
              {NARRATIVE_LINES.map((line, index) => {
                if (!shouldAnimateNarrative) {
                  return (
                    <NarrativeLine key={index}>
                      <NarrativeText>{line}</NarrativeText>
                    </NarrativeLine>
                  )
                }

                return (
                  <NarrativeLine key={index}>
                    <Typewriter
                      text={line}
                      speed={TYPEWRITER_SPEED}
                      delay={LINE_DELAYS[index]}
                      onComplete={handleLineComplete}
                    />
                  </NarrativeLine>
                )
              })}
            </NarrativeContainer>

            <ButtonsContainer>
              <CoffeePurchaseButton
                iconSource={SINGLE_COFFEE_ICON}
                description="Coffee is Leon's favourite morning juice"
                price="£ 5"
                onPress={handleSingleCoffeePress}
              />
              <CoffeePurchaseButton
                iconSource={DOUBLE_COFFEE_ICON}
                description="What?! 2 coffees?! You are an angel. Leon is a happy man."
                price="£ 10"
                onPress={handleDoubleCoffeePress}
              />
            </ButtonsContainer>
          </ContentContainer>
        </ScrollContentContainer>
      </FullScreenScrollView>
    </ScreenContainer>
  )
}
