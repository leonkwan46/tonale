import React, { useState } from 'react'
import { ScrollViewProps, StyleSheet, View } from 'react-native'
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

interface BouncingScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

const BouncingScrollView = ({
  children,
  ...props
}: BouncingScrollViewProps) => {
  const translateY = useSharedValue(0)
  const scrollOffset = useSharedValue(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [layoutHeight, setLayoutHeight] = useState(0)

  // 1. Capture the scroll position to now when we are at the top/bottom
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    }
  })

  // 2. Define the Native Scroll Gesture
  const nativeScroll = Gesture.Native()

  // 3. Define the Bounce (Pan) Gesture
  const bounceGesture = Gesture.Pan()
    .onChange((event) => {
      const isAtTop = scrollOffset.value <= 0 && event.translationY > 0
      const isAtBottom =
        scrollOffset.value >= contentHeight - layoutHeight &&
        event.translationY < 0

      if (isAtTop || isAtBottom) {
        translateY.value = event.translationY * 0.4 // Rubber band effect
      }
    })
    .onEnd(() => {
      translateY.value = withSpring(0, { damping: 15 })
    })
    // CRITICAL: This allows both to work at the same time
    .simultaneousWithExternalGesture(nativeScroll)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={styles.container}
        onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
      >
        {/* Wrap in the combined gesture */}
        <GestureDetector
          gesture={Gesture.Simultaneous(bounceGesture, nativeScroll)}
        >
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={1}
            overScrollMode="never"
            contentContainerStyle={{ flexGrow: 1 }}
            onContentSizeChange={(_, h) => setContentHeight(h)}
            onScrollEndDrag={props.onScrollEndDrag}
          >
            <Animated.View style={[animatedStyle, { flex: 1 }]}>
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
  container: { flex: 1, backgroundColor: 'white' }
})
