import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import * as React from 'react'
import { useMemo } from 'react'
import { AvatarContainer, AvatarImage } from './AvatarPreview.styles'

interface AvatarPreviewProps {
  selectedGender: UserGender | null
  selectedInstrument: UserInstrument | null
}

const AvatarPreviewComponent: React.FC<AvatarPreviewProps> = ({
  selectedGender,
  selectedInstrument
}) => {
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

    // Fall back to full body images for OTHER instrument or no instrument selected
    return isFemale
      ? require('../../../../../assets/images/girl/girl_full.png')
      : require('../../../../../assets/images/boy/boy_full.png')
  }, [selectedGender, selectedInstrument])

  return (
    <AvatarContainer>
      <AvatarImage source={imageSource} />
    </AvatarContainer>
  )
}

export const AvatarPreview = React.memo(AvatarPreviewComponent)

