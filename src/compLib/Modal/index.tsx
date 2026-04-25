import { Children, useMemo } from 'react'
import { Modal as RNModal } from 'react-native'
import { useWindowDimensions } from '@/hooks'
import {
  ButtonContainer,
  ButtonItem,
  DescriptionText,
  ModalContainer,
  ModalIconText,
  ModalOverlay,
  TitleText
} from './Modal.styles'

interface ModalProps {
  visible: boolean
  onRequestClose: () => void
  animationType?: 'none' | 'slide' | 'fade'
  transparent?: boolean
  testID?: string
  contentVariant?: 'default' | 'light'
  children: React.ReactNode
}

const ModalBase = ({
  visible,
  onRequestClose,
  animationType = 'fade',
  transparent = true,
  testID,
  contentVariant = 'default',
  children
}: ModalProps) => {
  const { width: screenWidth } = useWindowDimensions()

  const modalWidth = useMemo(() => screenWidth * 0.85, [screenWidth])

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

const ModalIcon = ({ children }: { children: React.ReactNode }) => (
  <ModalIconText>{children}</ModalIconText>
)

const ModalActions = ({ children }: { children: React.ReactNode }) => {
  const childArray = Children.toArray(children)
  const isSingle = childArray.length === 1

  return (
    <ButtonContainer singleButton={isSingle}>
      {isSingle
        ? childArray[0]
        : childArray.map((child, index) => (
            <ButtonItem key={index} grow>
              {child}
            </ButtonItem>
          ))}
    </ButtonContainer>
  )
}

export const Modal = Object.assign(ModalBase, {
  Icon: ModalIcon,
  Title: TitleText,
  Description: DescriptionText,
  Actions: ModalActions
})
