import React from 'react'
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View
} from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

interface BouncingScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  onBounce?: (direction: 'top' | 'bottom', overscroll: number) => void;
}

const BouncingScrollView = ({
  children,
  onBounce,
  ...props
}: BouncingScrollViewProps) => {
  const translateY = useSharedValue(0)
  const scrollOffset = useSharedValue(0)
  const contentHeight = useSharedValue(0)
  const layoutHeight = useSharedValue(0)

  // NOTE: this is to handle the bounce gesture on Android
  const bounceDirection = useSharedValue(-1)
  const bounceOverscroll = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    }
  })
  // This is used to calculate the scroll direction to determine manual activation needs
  const startY = useSharedValue(0)
  const nativeScroll = Gesture.Native()
  const bounceGesture = Gesture.Pan()

    .manualActivation(true) // This is to prevent Pan Gesture automatically take over Native control
    .onTouchesDown((e, state) => {
      startY.value = e.allTouches[0].absoluteY
    })
    .onTouchesMove((e, state) => {
      const currentY = e.allTouches[0].absoluteY
      const deltaY = currentY - startY.value

      const maxScroll = Math.max(0, contentHeight.value - layoutHeight.value)
      const isAtTop = scrollOffset.value <= 2
      const isAtBottom = scrollOffset.value >= maxScroll - 2

      // This is to activate the Pan gesture when it is needed
      if (isAtTop && deltaY > 5) {
        state.activate()
      } else if (isAtBottom && deltaY < -5) {
        state.activate()
      } else {
        state.fail()
      }
    })
    .onChange((event) => {
      const maxScroll = Math.max(0, contentHeight.value - layoutHeight.value)
      const EPS = 2
      const isAtTop = scrollOffset.value <= EPS && event.translationY > 0
      const isAtBottom =
        scrollOffset.value >= maxScroll - EPS && event.translationY < 0

      if (!isAtTop && !isAtBottom) {
        translateY.value = 0
      }

      if (isAtBottom) {
        bounceDirection.value = isAtBottom ? 1 : 0
        const absY = Math.abs(event.translationY)
        const resisted = (absY * 0.7) / (1 + absY * 0.004)
        const clamped = Math.min(resisted, 200)
        bounceOverscroll.value = clamped
        translateY.value = event.translationY < 0 ? -clamped : clamped
      }
    })
    .onEnd(() => {
      const direction = bounceDirection.value
      const overscroll = bounceOverscroll.value
      translateY.value = withSpring(0, {
        damping: 10,
        stiffness: 240,
        mass: 0.9
      })
      if (onBounce && direction !== -1 && overscroll > 0) {
        scheduleOnRN(onBounce, direction === 1 ? 'bottom' : 'top', overscroll)
      }
    })
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  if (Platform.OS === 'ios') {
    return <ScrollView {...props}>{children}</ScrollView>
  }

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <View
        style={styles.flexWhiteContainer}
        onLayout={(e) => {
          layoutHeight.value = e.nativeEvent.layout.height
        }}
      >
        <GestureDetector
          gesture={Gesture.Simultaneous(nativeScroll, bounceGesture)}
        >
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={1}
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
      </View>
    </GestureHandlerRootView>
  )
}

export default BouncingScrollView

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  flexWhiteContainer: { flex: 1, backgroundColor: 'white' },
  animatedScrollView: { flexGrow: 1 }
})
