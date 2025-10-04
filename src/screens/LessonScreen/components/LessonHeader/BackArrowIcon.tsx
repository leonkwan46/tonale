import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import Svg, { Path } from 'react-native-svg'

interface BackArrowIconProps {
  size?: number
}

const IconContainer = styled.View(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center'
}))

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({ 
  size = 16
}) => {
  const theme = useTheme()
  const scaledSize = scale(size)
  
  return (
    <IconContainer style={{
      width: scaledSize,
      height: scaledSize
    }}>
      <Svg
        width={scaledSize}
        height={scaledSize}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M19 12H5M12 19L5 12L12 5"
          stroke={theme.colors.text}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconContainer>
  )
}
