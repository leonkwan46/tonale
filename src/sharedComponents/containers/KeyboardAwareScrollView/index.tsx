import * as React from 'react'
import { Platform, ScrollView, ScrollViewProps } from 'react-native'
import { KeyboardContainer, StyledScrollView } from './KeyboardAwareScrollView.styles'

export interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  children: React.ReactNode
}

export const KeyboardAwareScrollView = React.forwardRef<ScrollView, KeyboardAwareScrollViewProps>(
  function KeyboardAwareScrollView(props, ref) {
    const { children, ...scrollViewProps } = props

    return (
      <KeyboardContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StyledScrollView
          ref={ref}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
        >
          {children}
        </StyledScrollView>
      </KeyboardContainer>
    )
  }
)
