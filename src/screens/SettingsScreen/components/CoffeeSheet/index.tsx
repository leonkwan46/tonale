import { useRef } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Typewriter } from '@/sharedComponents/Typewriter'
import { CoffeePurchaseButton } from './CoffeePurchaseButton'
import {
  AnimatedButtonsContainer,
  CharacterImage,
  CoffeeSheetContent,
  NarrativeContainer,
  NarrativeLine
} from './CoffeeSheet.styles'

const NARRATIVE_LINES = [
  'This is Leon.',
  'Leon makes this app.',
  'Leon sleeps on a keyboard.',
  'Leon runs on coffee.',
  'Help a coder survive ☕💀'
] as const

const TYPEWRITER_SPEED = 50
const PAUSE_BETWEEN_LINES_MS = 500
const BUTTON_ANIMATION_DURATION = 800

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

export const CoffeeSheet = () => {
  const completedLinesCountRef = useRef(0)
  const buttonsOpacity = useSharedValue(0)

  const animateButtonsIn = () => {
    buttonsOpacity.value = withTiming(1, {
      duration: BUTTON_ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    })
  }

  const handleLineComplete = () => {
    completedLinesCountRef.current += 1
    
    if (completedLinesCountRef.current === TOTAL_LINES) {
      animateButtonsIn()
    }
  }

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value
  }))

  const handleSingleCoffeePress = () => {
    // TODO: Implement coffee purchase logic
    console.log('Single coffee pressed')
  }

  const handleDoubleCoffeePress = () => {
    // TODO: Implement coffee purchase logic
    console.log('Double coffee pressed')
  }

  return (
    <CoffeeSheetContent
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <CharacterImage source={CHARACTER_IMAGE} />
      
      <NarrativeContainer>
        {NARRATIVE_LINES.map((line, index) => (
          <NarrativeLine key={index}>
            <Typewriter
              text={line}
              speed={TYPEWRITER_SPEED}
              delay={LINE_DELAYS[index]}
              onComplete={handleLineComplete}
            />
          </NarrativeLine>
        ))}
      </NarrativeContainer>

      <AnimatedButtonsContainer style={buttonsAnimatedStyle}>
        <CoffeePurchaseButton
          iconSource={SINGLE_COFFEE_ICON}
          description="Coffee is Leon's favourite morning juice"
          price="£ 5"
          onPress={handleSingleCoffeePress}
        />
        <CoffeePurchaseButton
          iconSource={DOUBLE_COFFEE_ICON}
          description="What?! 2 coffees?! You are an angel. Leon is a happy man."
          price="£ 5"
          onPress={handleDoubleCoffeePress}
        />
      </AnimatedButtonsContainer>
    </CoffeeSheetContent>
  )
}
