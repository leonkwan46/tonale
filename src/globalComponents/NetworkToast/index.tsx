import { ICONS } from '@/compLib/Icon'
import { useNetworkNotification } from '@/hooks/useNetworkNotificationContext'
import {
  type NetInfoState,
  NetInfoStateType
} from '@react-native-community/netinfo'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ToastContainer,
  ToastIcon,
  ToastMessage,
  ToastRow,
  ToastText,
  type ToastVariant
} from './NetworkToast.styles'

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

type ToastStatus = 'no-internet' | 'back-online' | null;

const TOAST_DISMISS_MS = 3000
const SLIDE_DURATION_IN = 300
const SLIDE_DURATION_OUT = 250

const NEEDS_MIN_DISPLAY: Partial<Record<NonNullable<ToastStatus>, true>> = {
  'back-online': true
}

const TOAST_MESSAGES: Record<NonNullable<ToastStatus>, string> = {
  'no-internet': 'You\'re offline',
  'back-online': 'You\'re back online'
}

const STATUS_VARIANT: Record<NonNullable<ToastStatus>, ToastVariant> = {
  'no-internet': 'error',
  'back-online': 'success'
}

const STATUS_ICON: Record<
  NonNullable<ToastStatus>,
  (typeof ICONS)[keyof typeof ICONS]
> = {
  'no-internet': ICONS.offline,
  'back-online': ICONS.success
}

// ============================================================================
// HOOKS
// ============================================================================

const useToastStatus = (netInfoState: NetInfoState): ToastStatus => {
  const [toastStatus, setToastStatus] = useState<ToastStatus>(null)
  const wasOfflineRef = useRef(false)

  useEffect(() => {
    const { type } = netInfoState
    if (type === NetInfoStateType.none) {
      wasOfflineRef.current = true
      setToastStatus('no-internet')
    } else if (type !== NetInfoStateType.unknown) {
      if (wasOfflineRef.current) {
        wasOfflineRef.current = false
        setToastStatus('back-online')
      }
    }
  }, [netInfoState])

  useEffect(() => {
    if (toastStatus !== 'back-online') return
    const timer = setTimeout(() => setToastStatus(null), TOAST_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toastStatus])

  return toastStatus
}

const useNetworkToast = (topInset: number) => {
  const { netInfoState } = useNetworkNotification()
  const toastStatus = useToastStatus(netInfoState)

  const [displayedStatus, setDisplayedStatus] = useState<ToastStatus>(null)
  const pendingRef = useRef<ToastStatus>(null)
  const displayedAtRef = useRef(0)

  const { height: windowHeight } = Dimensions.get('window')
  const toastContentHeight = windowHeight * 0.055
  const hideOffset = -(topInset + toastContentHeight)
  const translateY = useSharedValue(hideOffset)

  const swapContent = useCallback(() => {
    const next = pendingRef.current
    setDisplayedStatus(next)
    displayedAtRef.current = Date.now()
    if (next !== null)
      translateY.value = withTiming(0, { duration: SLIDE_DURATION_IN })
  }, [translateY])

  useEffect(() => {
    if (toastStatus === displayedStatus) return

    pendingRef.current = toastStatus

    if (displayedStatus !== null) {
      const elapsed = Date.now() - displayedAtRef.current
      const minDelay = NEEDS_MIN_DISPLAY[displayedStatus]
        ? Math.max(0, TOAST_DISMISS_MS - elapsed)
        : 0

      translateY.value = withDelay(
        minDelay,
        withTiming(hideOffset, { duration: SLIDE_DURATION_OUT }, (finished) => {
          if (finished) runOnJS(swapContent)()
        })
      )
    } else {
      setDisplayedStatus(toastStatus)
      displayedAtRef.current = Date.now()
      if (toastStatus !== null)
        translateY.value = withTiming(0, { duration: SLIDE_DURATION_IN })
    }
  }, [toastStatus, displayedStatus, hideOffset, translateY, swapContent])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  return { displayedStatus, animatedStyle }
}

// ============================================================================
// COMPONENT
// ============================================================================

export const NetworkToast = () => {
  const { top } = useSafeAreaInsets()
  const { displayedStatus, animatedStyle } = useNetworkToast(top)

  if (!displayedStatus) {
    return null
  }

  const variant = STATUS_VARIANT[displayedStatus]
  const message = TOAST_MESSAGES[displayedStatus]
  const iconName = STATUS_ICON[displayedStatus]

  return (
    <ToastContainer topInset={top} style={animatedStyle}>
      <ToastMessage>
        <ToastRow>
          <ToastIcon name={iconName} variant={variant} />
          <ToastText
            size="sm"
            weight="semibold"
            colorVariant={variant}
          >
            {message}
          </ToastText>
        </ToastRow>
      </ToastMessage>
    </ToastContainer>
  )
}
