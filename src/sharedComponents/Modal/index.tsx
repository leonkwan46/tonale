import { Modal as RNModal } from 'react-native'

interface ModalProps {
  visible: boolean
  onRequestClose: () => void
  animationType?: 'none' | 'slide' | 'fade'
  transparent?: boolean
  children: React.ReactNode
}

export const Modal = ({ visible, onRequestClose, animationType = 'fade', transparent = true, children }: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onRequestClose}
    >
      {children}
    </RNModal>
  )
}
