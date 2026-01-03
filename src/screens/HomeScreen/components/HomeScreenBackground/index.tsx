import { useWindowDimensions } from '@/hooks'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import * as React from 'react'
import { useMemo } from 'react'
import { RefreshControl, ScrollView, useColorScheme } from 'react-native'
import { ContentContainer } from '../../../TheoryScreen/TheoryScreenBody/TheoryScreenBody.styles'
import { AvatarImage, BackgroundGradient, ImageContainer, StageImage } from './HomeScreenBackground.styles'

interface HomeScreenBackgroundProps {
  children: React.ReactNode
  refreshing: boolean
  onRefresh: () => void
  gender?: UserGender
  instrument?: UserInstrument | string
}

export const HomeScreenBackground: React.FC<HomeScreenBackgroundProps> = ({ children, refreshing, onRefresh, gender, instrument }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const { width: screenWidth } = useWindowDimensions()

  const stageImage =
    colorScheme === 'dark'
      ? require('../../../../../assets/images/dark-homepage.png')
      : require('../../../../../assets/images/light-homepage.png')

  const avatarImage = useMemo(() => {
    const isFemale = gender === 'female'

    if (instrument === INSTRUMENT.PIANO) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_piano.png')
        : require('../../../../../assets/images/boy/boy_piano.png')
    }

    if (instrument === INSTRUMENT.GUITAR) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_guitar.png')
        : require('../../../../../assets/images/boy/boy_guitar.png')
    }

    if (instrument === INSTRUMENT.VIOLIN) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_violin.png')
        : require('../../../../../assets/images/boy/boy_violin.png')
    }

    if (instrument === INSTRUMENT.VOCAL) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_vocal.png')
        : require('../../../../../assets/images/boy/boy_vocal.png')
    }

    // Fall back to full body images for OTHER instrument, custom instruments, or no instrument selected
    return isFemale
      ? require('../../../../../assets/images/girl/girl_full.png')
      : require('../../../../../assets/images/boy/boy_full.png')
  }, [gender, instrument])

  const gradientColors =
    colorScheme === 'dark'
        ? ['#2E3237', '#1E252B', '#1A1E22', '#331009'] as const
        : ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713'] as const

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <BackgroundGradient 
          colors={gradientColors} 
          locations={[0, 0.3, 0.8, 1]}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }}
        >
            <ContentContainer>
                {children as React.ReactElement[]}
            </ContentContainer>
        </BackgroundGradient>
        <ImageContainer>
          <StageImage source={stageImage} screenWidth={screenWidth} />
          {/* TODO: Avatar will be animation in the future, using Lottie. This is currently a placeholder */}
          <AvatarImage source={avatarImage} screenWidth={screenWidth} />
        </ImageContainer>
      </ScrollView>
    </>
  )
}

