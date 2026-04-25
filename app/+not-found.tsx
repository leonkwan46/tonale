import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { spacing } from '@/config/theme/tokens/dimensions'
import { palette } from '@/config/theme/tokens/palette'
import { fontWeight, getSourGummyFontFamily, typography } from '@/config/theme/tokens/typography'
import BrokenNote from '../assets/images/broken-note.svg'

const NotFoundScreen = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      <BrokenNote width={120} height={120} color={palette.gray[100]} />
      <Text style={[styles.title, { fontFamily: getSourGummyFontFamily(fontWeight.bold) }]}>
        Something went{'\n'}out of tune
      </Text>
      <Text style={[styles.subtitle, { fontFamily: getSourGummyFontFamily() }]}>
        We hit an unexpected issue.{'\n'}Please close and reopen Tonalè to continue.
      </Text>
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md
  },
  title: {
    fontSize: typography['3xl'],
    textAlign: 'center',
    color: '#ffffff'
  },
  subtitle: {
    fontSize: typography.base,
    textAlign: 'center',
    lineHeight: typography.base * 1.6,
    color: palette.gray[400]
  }
})

export default NotFoundScreen
