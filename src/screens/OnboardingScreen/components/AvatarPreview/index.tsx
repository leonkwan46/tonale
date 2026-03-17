import { useWindowDimensions } from '@/hooks'
import { useTheme } from '@emotion/react'
import { GENDER, type UserGender, type UserInstrument } from '@types'
import * as React from 'react'
import { useMemo } from 'react'
import { getAvatarFullSource } from '@/utils/avatarAssets'
import { AvatarImage, LinearGradientView, StickerWrapper } from './AvatarPreview.styles'

interface AvatarPreviewProps {
  selectedGender: UserGender | null
  selectedInstrument: UserInstrument | null
}

const AvatarPreviewComponent = ({
  selectedGender,
  selectedInstrument
}: AvatarPreviewProps) => {
  const theme = useTheme()
  const { width: screenWidth } = useWindowDimensions()
  const imageSource = useMemo(() => {
    return getAvatarFullSource(selectedGender || GENDER.MALE, selectedInstrument)
  }, [selectedGender, selectedInstrument])

  return (
    <StickerWrapper
      screenWidth={screenWidth}
    >
      <LinearGradientView
        colors={[theme.colors.background, `${theme.colors.background}00`]}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0, y: 1 }}
      />
      <AvatarImage source={imageSource} />
    </StickerWrapper>
  )
}

export const AvatarPreview = React.memo(AvatarPreviewComponent)
