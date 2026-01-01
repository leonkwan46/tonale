import { useTheme } from '@emotion/react'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import * as React from 'react'
import { useMemo } from 'react'
import { AvatarImage, LinearGradientView, StickerWrapper } from './AvatarPreview.styles'

interface AvatarPreviewProps {
  selectedGender: UserGender | null
  selectedInstrument: UserInstrument | null
  isTablet: boolean
}

const AvatarPreviewComponent: React.FC<AvatarPreviewProps> = ({
  selectedGender,
  selectedInstrument,
  isTablet
}) => {
  const theme = useTheme()
  const imageSource = useMemo(() => {
    const isFemale = selectedGender === 'female'

    if (selectedInstrument === INSTRUMENT.PIANO) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_piano.png')
        : require('../../../../../assets/images/boy/boy_piano.png')
    }

    if (selectedInstrument === INSTRUMENT.GUITAR) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_guitar.png')
        : require('../../../../../assets/images/boy/boy_guitar.png')
    }

    if (selectedInstrument === INSTRUMENT.VIOLIN) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_violin.png')
        : require('../../../../../assets/images/boy/boy_violin.png')
    }

    if (selectedInstrument === INSTRUMENT.VOCAL) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_vocal.png')
        : require('../../../../../assets/images/boy/boy_vocal.png')
    }
    return isFemale
      ? require('../../../../../assets/images/girl/girl_full.png')
      : require('../../../../../assets/images/boy/boy_full.png')
  }, [selectedGender, selectedInstrument])

  return (
    <StickerWrapper
      isTablet={isTablet}
    >
      <LinearGradientView
        isTablet={isTablet}
        colors={[theme.colors.background, `${theme.colors.background}00`]}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0, y: 1 }}
      />
      <AvatarImage source={imageSource} isTablet={isTablet} />
    </StickerWrapper>
  )
}

export const AvatarPreview = React.memo(AvatarPreviewComponent)
