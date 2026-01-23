import { scale } from 'react-native-size-matters'
import { CrownBase, CrownContainer, CrownPoint } from './CrownIcon.styles'

interface CrownIconProps {
  size?: number
}

export const CrownIcon = ({ size = 24 }: CrownIconProps) => {
  const scaledSize = scale(size)
  
  return (
    <CrownContainer scaledSize={scaledSize}>
      <CrownBase scaledSize={scaledSize}>
        <CrownPoint
          scaledSize={scaledSize}
          top={scaledSize * 0.15}
          left={0.05}
          borderLeftWidth={scaledSize * 0.08}
          borderRightWidth={scaledSize * 0.08}
          borderBottomWidth={scaledSize * 0.15}
        />
        <CrownPoint
          scaledSize={scaledSize}
          top={scaledSize * 0.2}
          left={0.25}
          borderLeftWidth={scaledSize * 0.1}
          borderRightWidth={scaledSize * 0.1}
          borderBottomWidth={scaledSize * 0.2}
        />
        <CrownPoint
          scaledSize={scaledSize}
          top={scaledSize * 0.15}
          right={0.05}
          borderLeftWidth={scaledSize * 0.08}
          borderRightWidth={scaledSize * 0.08}
          borderBottomWidth={scaledSize * 0.15}
        />
      </CrownBase>
    </CrownContainer>
  )
}
