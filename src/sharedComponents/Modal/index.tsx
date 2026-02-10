import { useWindowDimensions } from '@/hooks'
import { useMemo } from 'react'
import { Modal as RNModal } from 'react-native'
import { ModalContainer, ModalOverlay } from './Modal.styles'

interface ModalProps {
  visible: boolean
  onRequestClose: () => void
  animationType?: 'none' | 'slide' | 'fade'
  transparent?: boolean
  testID?: string
  children: React.ReactNode
}

export const Modal = ({ visible, onRequestClose, animationType = 'fade', transparent = true, testID, children }: ModalProps) => {
  const { width: screenWidth } = useWindowDimensions()
  
  const modalWidth = useMemo(() => {
    const widthPercentage = 0.85
    return screenWidth * widthPercentage
  }, [screenWidth])
  
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onRequestClose}
    >
      <ModalOverlay activeOpacity={1} onPress={onRequestClose}>
        <ModalContainer testID={testID} width={modalWidth} onStartShouldSetResponder={() => true}>
          {children}
        </ModalContainer>
      </ModalOverlay>
    </RNModal>
  )
}
