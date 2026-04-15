import { useWindowDimensions } from '@/hooks'
import { getAvatarFullSource } from '@/utils/avatarAssets'
import { GENDER, type UserGender, type UserInstrument } from '@types'
import * as React from 'react'
import { useMemo } from 'react'
import {
    AvatarImage,
    LinearGradientView,
    StickerWrapper,
    useGradientColors
} from './AvatarPreview.styles'

interface AvatarPreviewProps {
  selectedGender: UserGender | null;
  selectedInstrument: UserInstrument | null;
}

const AvatarPreviewComponent = ({
  selectedGender,
  selectedInstrument
}: AvatarPreviewProps) => {
  const { width: screenWidth } = useWindowDimensions()
  const gradientColors = useGradientColors()
  const imageSource = useMemo(() => {
    return getAvatarFullSource(
      selectedGender || GENDER.MALE,
      selectedInstrument
    )
  }, [selectedGender, selectedInstrument])

  return (
    <StickerWrapper screenWidth={screenWidth}>
      <LinearGradientView
        colors={gradientColors}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0, y: 1 }}
      />
      <AvatarImage source={imageSource} />
    </StickerWrapper>
  )
}

export const AvatarPreview = React.memo(AvatarPreviewComponent)
