import { forwardRef } from 'react'
import type { PressableProps, View } from 'react-native'
import { Pressable } from 'react-native'

export type PressableFeedbackProps = PressableProps & {
  /** Opacity while pressed; omit for no opacity feedback. */
  pressOpacity?: number
}

export const PressableFeedback = forwardRef<View, PressableFeedbackProps>(
  ({ pressOpacity, style, disabled, ...rest }, ref) => (
    <Pressable
      ref={ref}
      disabled={disabled}
      {...rest}
      style={(state) => {
        const outer = typeof style === 'function' ? style(state) : style
        const feedback =
          pressOpacity !== undefined && state.pressed && !disabled
            ? { opacity: pressOpacity }
            : undefined
        return [outer, feedback]
      }}
    />
  )
)

export type PressableWithFixedOpacityProps = Omit<PressableFeedbackProps, 'pressOpacity'>

/** Use with `styled(...)` when @emotion `.attrs` is unavailable for custom components. */
export const createPressableWithOpacity = (opacity: number) =>
  forwardRef<View, PressableWithFixedOpacityProps>((props, ref) => (
    <PressableFeedback ref={ref} pressOpacity={opacity} {...props} />
  ))
