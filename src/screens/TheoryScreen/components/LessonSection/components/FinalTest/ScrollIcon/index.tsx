import { useTheme } from '@emotion/react'
import { scale } from 'react-native-size-matters'
import Svg, { Defs, G, Path } from 'react-native-svg'
import { ScrollIconContainer } from './ScrollIcon.styles'

interface ScrollIconProps {
  size?: number
}

export const ScrollIcon = ({ size = 24 }: ScrollIconProps) => {
  const theme = useTheme()
  const scaledSize = scale(size)
  const strokeColor = theme.colors.text
  
  return (
    <ScrollIconContainer scaledSize={scaledSize}>
      <Svg
        width={scaledSize}
        height={scaledSize}
        viewBox="0 0 41.433807 50.77327"
      >
        <Defs />
        <G transform="translate(-354.27996,-506.97271)">
          <G transform="matrix(0.07478351,0,0,0.07478351,353.76019,492.98732)">
            <G transform="translate(684.86932,50.320151)">
              <Path
                d="m -515.343,245.63189 c 0,0 -137.26454,283.27497 -146.99195,401.08469 -9.72741,117.80972 16.21235,113.48643 27.02058,125.37548 10.80823,11.88906 359.38622,26.02285 359.38622,26.02285"
                fill="none"
                stroke={strokeColor}
                strokeWidth="26.74386406"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeDasharray="none"
              />
              <Path
                d="m -250.49566,802.17422 c 0,0 80.22769,5.40107 88.25046,-78.85552 6.44912,-67.72985 -58.16508,-65.89296 -78.222,-65.89296 -20.05693,0 -77.21916,-1.62032 -77.21916,-1.62032"
                fill="none"
                stroke={strokeColor}
                strokeWidth="26.74386406"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeDasharray="none"
              />
              <Path
                d="m -239.11332,267.90855 -312.66063,-22.31837 c 0,0 -50.30075,-5.5706 -48.94161,-46.79796 1.35915,-41.22736 60.43299,-48.1769 64.96348,-48.62995 4.53047,-0.45306 318.20487,13.86595 318.20487,13.86595"
                fill="none"
                stroke={strokeColor}
                strokeWidth="26.74386406"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeDasharray="none"
              />
              <Path
                d="m -221.38421,657.91252 c 0,0 -24.82145,0.86108 -39.59812,8.44938 -16.0361,8.23506 -31.51671,23.49337 -26.34997,51.31998 9.92768,53.4678 35.45595,45.44763 49.63833,42.77424 14.1824,-2.6734 25.52831,-20.62329 24.11006,-26.35198 -1.41824,-5.7287 -1.41824,-5.7287 -1.41824,-5.7287 l -70.91193,-4.20104"
                fill="none"
                stroke={strokeColor}
                strokeWidth="26.74386406"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeDasharray="none"
              />
              <G transform="translate(75.723508,-494.01746)">
                <Path
                  d="m -291.62289,657.70482 c 20.05692,0 84.67113,-1.83689 78.22199,65.89297 -2.71158,28.47745 -13.67139,46.71297 -27.59031,59.20708 -27.11776,27.70018 -79.96911,133.42514 -106.84827,205.93976 -15.22884,41.08437 -88.25563,237.08547 -52.09055,275.65867 36.16509,38.5732 87.22167,30.935 87.22167,30.935"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="26.74386406"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  strokeOpacity="1"
                  strokeDasharray="none"
                />
                <Path
                  d="m -272.5399,658.19161 c 0,0 -24.82145,0.86107 -39.59812,8.44937 -16.0361,8.23507 -31.51672,23.49337 -26.34998,51.31998 9.92769,53.4678 27.83483,44.06805 49.63833,42.77425 11.88485,-0.70523 20.25244,-15.08852 24.11007,-26.35199 1.89171,-5.52338 -1.41824,-17.45753 -1.41824,-17.45753 l -70.91193,-4.20105"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="26.74386406"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  strokeOpacity="1"
                  strokeDasharray="none"
                />
              </G>
            </G>
          </G>
        </G>
      </Svg>
    </ScrollIconContainer>
  )
}
