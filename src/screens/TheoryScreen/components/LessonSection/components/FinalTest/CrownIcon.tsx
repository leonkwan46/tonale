import * as React from 'react'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface CrownIconProps {
  size?: number
}

export const CrownIcon = ({ size = 24 }: CrownIconProps) => {
  const scaledSize = scale(size)
  
  return (
    <View style={{
      width: scaledSize,
      height: scaledSize,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Crown base */}
      <View style={{
        width: scaledSize * 0.8,
        height: scaledSize * 0.3,
        backgroundColor: '#FFD700',
        borderTopLeftRadius: scaledSize * 0.1,
        borderTopRightRadius: scaledSize * 0.1,
        position: 'relative'
      }}>
        {/* Crown points */}
        <View style={{
          position: 'absolute',
          top: -scaledSize * 0.15,
          left: scaledSize * 0.05,
          width: 0,
          height: 0,
          borderLeftWidth: scaledSize * 0.08,
          borderRightWidth: scaledSize * 0.08,
          borderBottomWidth: scaledSize * 0.15,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#FFD700'
        }} />
        <View style={{
          position: 'absolute',
          top: -scaledSize * 0.2,
          left: scaledSize * 0.25,
          width: 0,
          height: 0,
          borderLeftWidth: scaledSize * 0.1,
          borderRightWidth: scaledSize * 0.1,
          borderBottomWidth: scaledSize * 0.2,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#FFD700'
        }} />
        <View style={{
          position: 'absolute',
          top: -scaledSize * 0.15,
          right: scaledSize * 0.05,
          width: 0,
          height: 0,
          borderLeftWidth: scaledSize * 0.08,
          borderRightWidth: scaledSize * 0.08,
          borderBottomWidth: scaledSize * 0.15,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#FFD700'
        }} />
      </View>
    </View>
  )
}
