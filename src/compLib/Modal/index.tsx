import { Children, useEffect, useId, useMemo, useRef } from 'react'
import { Animated, BackHandler, StyleSheet } from 'react-native'
import { useWindowDimensions } from '@/hooks'
import { modalStore } from '@/globalComponents/ModalRoot/store'
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

const FADE_DURATION = 200

const ModalContent = ({
  animated,
  testID,
  contentVariant,
  modalWidth,
  onRequestClose,
  children
}: {
  animated: boolean
  testID?: string
  contentVariant: 'default' | 'light'
  modalWidth: number
  onRequestClose: () => void
  children: React.ReactNode
}) => {
  const opacity = useRef(new Animated.Value(animated ? 0 : 1)).current

  useEffect(() => {
    if (!animated) return
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true
    }).start()
  }, [animated, opacity])

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFillObject, { opacity, zIndex: 1000 }]}
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
    </Animated.View>
  )
}

const ModalBase = ({
  visible,
  onRequestClose,
  animationType = 'fade',
  testID,
  contentVariant = 'default',
  children
}: ModalProps) => {
  const id = useId()
  const { width: screenWidth } = useWindowDimensions()
  const modalWidth = useMemo(() => screenWidth * 0.85, [screenWidth])
  const childrenRef = useRef(children)
  childrenRef.current = children

  useEffect(() => {
    if (!visible) {
      modalStore.unregister(id)
      return
    }
    modalStore.register(
      id,
      <ModalContent
        animated={animationType !== 'none'}
        testID={testID}
        contentVariant={contentVariant}
        modalWidth={modalWidth}
        onRequestClose={onRequestClose}
      >
        {childrenRef.current}
      </ModalContent>
    )
    return () => modalStore.unregister(id)
  }, [
    visible,
    id,
    animationType,
    testID,
    contentVariant,
    modalWidth,
    onRequestClose
  ])

  useEffect(() => {
    if (!visible) return
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onRequestClose()
      return true
    })
    return () => sub.remove()
  }, [visible, onRequestClose])

  return null
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
