import { scale } from 'react-native-size-matters'
import Svg, { Path } from 'react-native-svg'
import { IconContainer, useStrokeColor } from './BackArrowIcon.styles'

interface BackArrowIconProps {
  size?: number;
  color?: string;
}

export const BackArrowIcon = ({ size = 16, color }: BackArrowIconProps) => {
  const scaledSize = scale(size)
  const strokeColor = useStrokeColor(color)

  return (
    <IconContainer scaledSize={scaledSize}>
      <Svg
        width={scaledSize}
        height={scaledSize}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M19 12H5M12 19L5 12L12 5"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconContainer>
  )
}
