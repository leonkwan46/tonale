import { Depth3D, type LayoutType } from '@/compLib/Depth3D'
import { Icon, type IconName } from '@/compLib/Icon'
import type { IconColorVariant } from '@/config/theme/theme'

import {
  ButtonLabel,
  ButtonRoot,
  ButtonSpinner,
  DepthButtonInner,
  DepthButtonLabel,
  DepthButtonSpinner,
  IconSlot,
  getDepthColor,
  isMultiWordLabel,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant
} from './Button.styles'

type EffectiveButtonType = 'flat' | 'depth'

type ButtonBaseProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  testID?: string;
  label: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

type DepthButtonProps = ButtonBaseProps & {
  buttonType?: 'depth';
  variant?: 'filled';
  layoutType?: LayoutType;
}

type FlatButtonProps = ButtonBaseProps & {
  buttonType?: 'flat';
  variant: ButtonVariant;
  layoutType?: never;
}

export type ButtonProps = DepthButtonProps | FlatButtonProps

const OUTLINED_ICON_VARIANT: Record<ButtonColor, IconColorVariant> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  neutral: 'border',
  finalTest: 'warning'
}

const FILLED_ICON_VARIANT: Record<ButtonColor, IconColorVariant> = {
  primary: 'primaryContrast',
  success: 'successContrast',
  warning: 'warningContrast',
  error: 'errorContrast',
  neutral: 'text',
  finalTest: 'warningContrast'
}

const getIconColor = (
  variant: ButtonVariant,
  color: ButtonColor
): IconColorVariant => {
  if (variant === 'link') return 'primary'
  if (variant === 'outlined') return OUTLINED_ICON_VARIANT[color]
  return FILLED_ICON_VARIANT[color]
}

const getEffectiveButtonType = (
  buttonType: EffectiveButtonType,
  variant: ButtonVariant
): EffectiveButtonType => (variant === 'link' ? 'flat' : buttonType)

const getEffectiveVariant = (
  effectiveButtonType: EffectiveButtonType,
  variant: ButtonVariant
): ButtonVariant => (effectiveButtonType === 'depth' ? 'filled' : variant)

export const Button = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  buttonType = 'depth',
  layoutType = 'row',
  disabled = false,
  loading = false,
  onPress,
  testID,
  label,
  leftIcon,
  rightIcon
}: ButtonProps) => {
  const isDisabled = disabled || loading
  const effectiveButtonType = getEffectiveButtonType(buttonType, variant)
  const effectiveVariant = getEffectiveVariant(effectiveButtonType, variant)
  const iconColorVariant = getIconColor(effectiveVariant, color)
  const depthIconColorVariant = getIconColor('filled', color)
  const isMultiWord = isMultiWordLabel(label)
  const iconSizeVariant = isMultiWord || size === 'sm' ? 'sm' : 'md'

  const hiddenIconStyle = loading ? { opacity: 0 } : undefined

  const renderDepthButton = () => {
    const depthColor = getDepthColor(color)
    return (
      <Depth3D
        testID={testID}
        color={depthColor}
        layoutType={layoutType}
        sizeVariant="auto"
        disabled={isDisabled}
        onPress={onPress}
      >
        {() => (
          <DepthButtonInner>
            {loading && <DepthButtonSpinner size="small" color={color} />}
            {leftIcon && (
              <IconSlot edge="left" style={hiddenIconStyle}>
                <Icon
                  name={leftIcon}
                  sizeVariant={iconSizeVariant}
                  colorVariant={depthIconColorVariant}
                />
              </IconSlot>
            )}
            <DepthButtonLabel
              paletteKey={depthColor}
              size={size}
              isMultiWord={isMultiWord}
            >
              {label}
            </DepthButtonLabel>
            {rightIcon && (
              <IconSlot edge="right" style={hiddenIconStyle}>
                <Icon
                  name={rightIcon}
                  sizeVariant={iconSizeVariant}
                  colorVariant={depthIconColorVariant}
                />
              </IconSlot>
            )}
          </DepthButtonInner>
        )}
      </Depth3D>
    )
  }

  const renderFlatButton = () => (
    <ButtonRoot
      testID={testID}
      variant={effectiveVariant}
      color={color}
      size={size}
      block={effectiveVariant !== 'link'}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading && (
        <ButtonSpinner size="small" variant={effectiveVariant} color={color} />
      )}
      {leftIcon && (
        <IconSlot edge="left" style={hiddenIconStyle}>
          <Icon
            name={leftIcon}
            sizeVariant={iconSizeVariant}
            colorVariant={iconColorVariant}
          />
        </IconSlot>
      )}
      <ButtonLabel
        variant={effectiveVariant}
        color={color}
        size={size}
        isMultiWord={isMultiWord}
      >
        {label}
      </ButtonLabel>
      {rightIcon && (
        <IconSlot edge="right" style={hiddenIconStyle}>
          <Icon
            name={rightIcon}
            sizeVariant={iconSizeVariant}
            colorVariant={iconColorVariant}
          />
        </IconSlot>
      )}
    </ButtonRoot>
  )

  return effectiveButtonType === 'depth' ? renderDepthButton() : renderFlatButton()
}

export default Button
