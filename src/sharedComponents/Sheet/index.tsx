import { useTheme } from '@emotion/react'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import {
    SheetContainer,
    SheetHandle,
    getBackgroundStyle,
    handleIndicatorStyle,
    sheetViewStyle
} from './Sheet.styles'

export type SheetSize = 'small' | 'medium' | 'large' | 'full'

export interface SheetProps {
  visible: boolean
  onDismiss: () => void
  children: React.ReactNode
  size?: SheetSize
  snapPoints?: (string | number)[]
  enablePanDownToClose?: boolean
  enableDismissOnClose?: boolean
  backdropOpacity?: number
  showHandle?: boolean
}

const SIZE_MAP: Record<SheetSize, string> = {
  'small': '25%',
  'medium': '50%',
  'large': '75%',
  'full': '95%'
} as const

const getSnapPointsFromSize = (size?: SheetSize): string[] => {
  return size ? [SIZE_MAP[size]] : ['50%']
}

export const Sheet = ({
  visible,
  onDismiss,
  children,
  size = 'medium',
  snapPoints,
  enablePanDownToClose = true,
  enableDismissOnClose = true,
  showHandle = true,
  backdropOpacity = 0.8
}: SheetProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const theme = useTheme()

  const snapPointsMemo = useMemo(() => {
    return snapPoints || getSnapPointsFromSize(size)
  }, [snapPoints, size])

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [visible])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1 && enableDismissOnClose) {
      onDismiss()
    }
  }, [enableDismissOnClose, onDismiss])

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={backdropOpacity}
      pressBehavior="close"
    />
  ), [backdropOpacity])

  const backgroundStyle = getBackgroundStyle(theme)

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPointsMemo}
      enablePanDownToClose={enablePanDownToClose}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={backgroundStyle}
      handleIndicatorStyle={handleIndicatorStyle}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={sheetViewStyle}>
        <SheetContainer>
          {showHandle && <SheetHandle />}
          {children}
        </SheetContainer>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
