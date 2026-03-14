import isPropValid from '@emotion/is-prop-valid'

/**
 * Use with styled(Component, { shouldForwardProp }) so testID and standard
 * props reach the native component; custom/style-only props are blocked.
 */
export function createForwardProps(blockedProps: string[]) {
  return (prop: string) =>
    prop === 'testID' || (!blockedProps.includes(prop) && isPropValid(prop))
}
