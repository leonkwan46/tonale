import React from 'react'
import {
    Platform,
    ScrollView,
    ScrollViewProps,
    StyleSheet
} from 'react-native'
import { BackgroundFill } from './BouncingScrollView.styles'
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView
} from 'react-native-gesture-handler'
import Animated, {
    type SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

interface BouncingScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  onBounce?: (direction: 'top' | 'bottom', overscroll: number) => void;
  pullProgress?: SharedValue<number>;
}

const BouncingScrollView = ({
  children,
  onBounce,
  pullProgress,
  ...props
}: BouncingScrollViewProps) => {
  const translateY = useSharedValue(0)
  const scrollOffset = useSharedValue(0)
  const contentHeight = useSharedValue(0)
  const layoutHeight = useSharedValue(0)

  const bounceDirection = useSharedValue(-1)
  const bounceOverscroll = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    }
  })
  const startY = useSharedValue(0)
  const nativeScroll = Gesture.Native()
  const bounceGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      startY.value = e.allTouches[0].absoluteY
    })
    .onTouchesMove((e, state) => {
      const currentY = e.allTouches[0].absoluteY
      const deltaY = currentY - startY.value

      const maxScroll = Math.max(0, contentHeight.value - layoutHeight.value)
      const isAtTop = scrollOffset.value <= 2
      const isAtBottom = scrollOffset.value >= maxScroll - 2

      if (isAtTop && deltaY > 5) {
        bounceDirection.value = 0
        state.activate()
      } else if (isAtBottom && deltaY < -5) {
        bounceDirection.value = 1
        state.activate()
      }
    })
    .onChange((event) => {
      const absY = Math.abs(event.translationY)
      const resisted = (absY * 0.85) / (1 + absY * 0.002)
      const clamped = Math.min(resisted, 200)
      bounceOverscroll.value = clamped
      translateY.value = event.translationY < 0 ? -clamped : clamped

      if (pullProgress && bounceDirection.value === 1) {
        pullProgress.value = clamped
      }
    })
    .onEnd(() => {
      const direction = bounceDirection.value
      const overscroll = bounceOverscroll.value

      const springConfig = { damping: 10, stiffness: 240, mass: 0.9 }
      translateY.value = withSpring(0, springConfig)

      if (pullProgress) {
        pullProgress.value = withSpring(0, springConfig)
      }

      if (onBounce && direction !== -1 && overscroll > 0) {
        scheduleOnRN(onBounce, direction === 1 ? 'bottom' : 'top', overscroll)
      }

      bounceDirection.value = -1
      bounceOverscroll.value = 0
    })
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  if (Platform.OS === 'ios') {
    return <ScrollView {...props}>{children}</ScrollView>
  }

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <BackgroundFill
        onLayout={(e) => {
          layoutHeight.value = e.nativeEvent.layout.height
        }}
      >
        <GestureDetector
          gesture={Gesture.Simultaneous(nativeScroll, bounceGesture)}
        >
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            overScrollMode="never"
            contentContainerStyle={styles.animatedScrollView}
            onContentSizeChange={(_, h) => {
              contentHeight.value = h
            }}
            onScrollEndDrag={props.onScrollEndDrag}
            refreshControl={props.refreshControl}
          >
            <Animated.View style={[animatedStyle, styles.flexContainer]}>
              {children}
            </Animated.View>
          </Animated.ScrollView>
        </GestureDetector>
      </BackgroundFill>
    </GestureHandlerRootView>
  )
}

export default BouncingScrollView

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  animatedScrollView: { flexGrow: 1 }
})
