import styled from '@emotion/native'
import * as React from 'react'
import { ScrollView } from 'react-native'

const StyledScrollView = styled(ScrollView)<{ isTablet: boolean }>(() => ({
  flex: 1
}))

export const ContentContainer = React.forwardRef<ScrollView, React.ComponentProps<typeof StyledScrollView>>(
  function ContentContainer(props, ref) {
    return <StyledScrollView {...props} ref={ref} />
  }
)
