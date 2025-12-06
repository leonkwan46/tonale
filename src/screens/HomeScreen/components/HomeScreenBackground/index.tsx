import * as React from 'react'
import { RefreshControl, ScrollView, useColorScheme } from 'react-native'
import { BackgroundGradient, CharacterImage, HomepageImage, ImageContainer } from './HomeScreenBackground.styles'
import { ContentContainer } from '../../../TheoryScreen/TheoryScreenBody/TheoryScreenBody.styles'

interface HomeScreenBackgroundProps {
  children: React.ReactNode
  refreshing: boolean
  onRefresh: () => void
}

export const HomeScreenBackground: React.FC<HomeScreenBackgroundProps> = ({ children, refreshing, onRefresh }) => {
  const colorScheme = useColorScheme() ?? 'light'

  const homepageImage =
    colorScheme === 'dark'
      ? require('../../../../../assets/images/dark-homepage.png')
      : require('../../../../../assets/images/light-homepage.png')

  const CharacterImageSource =
    colorScheme === 'dark'
      ? require('../../../../../assets/images/girl.png')
      : require('../../../../../assets/images/boy.png')

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
        bounces={true}
        alwaysBounceVertical={true}
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
          <HomepageImage source={homepageImage} />
          {/* TODO: Character will be animation in the future, using Lottie. This is currently a placeholder */}
          <CharacterImage source={CharacterImageSource} />
        </ImageContainer>
      </ScrollView>
    </>
  )
}

