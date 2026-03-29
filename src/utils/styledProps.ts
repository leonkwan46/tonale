import isPropValid from '@emotion/is-prop-valid'

export const REACT_NATIVE_TEXT_FORWARD_PROPS = new Set<string>([
  'allowFontScaling',
  'adjustsFontSizeToFit',
  'ellipsizeMode',
  'maxFontSizeMultiplier',
  'minimumFontScale',
  'numberOfLines'
])

export const createForwardProps = (blockedProps: string[]) => (prop: string) =>
  prop === 'testID' || (!blockedProps.includes(prop) && isPropValid(prop))

export const createTypographyShouldForwardProp =
  (blockedProps: string[]) => (prop: string) =>
    REACT_NATIVE_TEXT_FORWARD_PROPS.has(prop) ||
    createForwardProps(blockedProps)(prop)
