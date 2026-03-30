import { useWindowDimensions } from '@/hooks'
import { useMemo } from 'react'
import { Modal as RNModal } from 'react-native'
import { ModalContainer, ModalOverlay } from './Modal.styles'

interface ModalProps {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  testID?: string;
  contentVariant?: 'default' | 'light';
  children: React.ReactNode;
}

export const Modal = ({
  visible,
  onRequestClose,
  animationType = 'fade',
  transparent = true,
  testID,
  contentVariant = 'default',
  children
}: ModalProps) => {
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
      <ModalOverlay onPress={onRequestClose}>
        <ModalContainer
          testID={testID}
          width={modalWidth}
          variant={contentVariant}
          onStartShouldSetResponder={() => true}
        >
          {children}
        </ModalContainer>
      </ModalOverlay>
    </RNModal>
  )
}
