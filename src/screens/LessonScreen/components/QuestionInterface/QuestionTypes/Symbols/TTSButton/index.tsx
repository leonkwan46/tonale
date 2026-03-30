import { Icon } from '@/compLib/Icon'
import { pronounceTerm } from '@/utils/pronounce'
import { useState } from 'react'
import { TTSButtonRoot } from './TTSButton.styles'

interface TTSButtonProps {
  symbolType: string
}

export const TTSButton = ({ symbolType }: TTSButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <TTSButtonRoot
      onPress={() => {
        setIsPlaying(true)
        pronounceTerm(symbolType, () => setIsPlaying(false))
      }}
      disabled={isPlaying}
    >
      <Icon
        name={isPlaying ? 'pause' : 'volume-high'}
        sizeVariant="md"
        colorVariant="primaryContrast"
      />
    </TTSButtonRoot>
  )
}
