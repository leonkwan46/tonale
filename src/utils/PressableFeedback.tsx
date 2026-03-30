import { forwardRef } from 'react'
import type { PressableProps, View } from 'react-native'
import { Pressable } from 'react-native'

export type PressableFeedbackProps = PressableProps & {
  pressOpacity?: number;
};

export const PressableFeedback = forwardRef<View, PressableFeedbackProps>(
  ({ pressOpacity = 0.7, style, disabled, ...rest }, ref) => (
    <Pressable
      ref={ref}
      disabled={disabled}
      {...rest}
      style={(state) => {
        const outer = typeof style === 'function' ? style(state) : style
        const feedback =
          state.pressed && !disabled ? { opacity: pressOpacity } : undefined
        return [outer, feedback]
      }}
    />
  )
)
