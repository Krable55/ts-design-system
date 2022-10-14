import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { IconType } from '../icon/types';
import Loading from '../loading';
import { ButtonType, ButtonVariant, Size, SizeType, Variant, VariantType, Weight, WeightType } from '../constants';

export interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'> {
  /** React component / element to render. Useful in cases where a button is used for navigation, so that it can be rendered as an anchor tag with the same styling */
  as?: React.ElementType<any>,
  /** Prop to use for a `ref` passed to the inner element. */
  forwardRefAs?: string | number,
  /** Main visual variant */
  type?: VariantType,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight?: WeightType,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon?: IconType | null,
  /** Optional prop to change the size of a leading or trailing icons */
  iconSize?: SizeType,
  /** Button text or other content */
  children?: React.ReactNode | React.ReactNode[],
  /** Optional trailing icon rendered after button text. For icon-only buttons, please use the 'icon' prop instead */
  trailingIcon?: IconType | null,
  /** Is the button disabled? */
  disabled?: boolean,
  /** If true, button will render with a loading spinner */
  loading?: boolean,
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus?: boolean,
  /** Optional html button type override */
  buttonType?: ButtonType,
  /** Optional additional className. Additionally, all other props are propagated directly to the inner element */
  className?: string,
  /** Optional inline styled passed to the button element */
  style?: React.CSSProperties,
};

const defaultProps: ButtonProps = {
  as: ButtonVariant.BUTTON,
  forwardRefAs: 'ref',
  type: Variant.PRIMARY,
  weight: Weight.BOLD,
  children: null,
  icon: null,
  iconSize: Size.MEDIUM,
  trailingIcon: null,
  loading: false,
  innerFocus: false,
  disabled: false,
  buttonType: undefined,
  className: '',
};

/**
 * We want to assign the default 'type' attribute diferently depending
 * on the underling element being rendered. If the element is a button,
 * type should default to 'button', otherwise null
 */
const assignTypeDefault = (buttonType, Element) => {
  if (buttonType) {
    return buttonType;
  }

  if (Element === ButtonVariant.BUTTON) {
    return ButtonVariant.BUTTON;
  }

  return null;
};

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as: Element,
      forwardRefAs,
      type,
      weight,
      icon,
      iconSize,
      trailingIcon,
      loading,
      innerFocus,
      buttonType,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    if (!Element) return null;
    const withForwardRef = forwardRefAs ? {
      [forwardRefAs]: ref,
    } : {};
    return (
      <Element
        type={assignTypeDefault(buttonType, Element)}
        className={classNames(
          'rc-button',
          `rc-button-${type}`,
          `rc-button-${weight}`,
          {
            'rc-button-loading': loading,
            'rc-button-disabled': disabled,
            'rc-button-icon': icon,
            'rc-button-trailing-icon': trailingIcon,
            'rc-button-empty': !children,
            'rc-button-full': children,
            'rc-button-inner-focus': innerFocus,
          },
          className,
        )}
        disabled={loading || disabled}
        aria-disabled={Element === ButtonVariant.BUTTON ? undefined : loading || disabled}
        aria-label={children || icon || trailingIcon}
        {...withForwardRef}
        {...rest}
      >
        {icon && (
          <Icon
            size={type === Variant.TEXT ? Size.SMALL : iconSize}
            type={icon}
            className="rc-button-icon-svg"
          />
        )}
        <span className="rc-button-content">{children}</span>
        {trailingIcon && (
          <Icon
            size={type === Variant.TEXT ? Size.SMALL : iconSize}
            type={trailingIcon}
            className="rc-button-icon-svg"
          />
        )}
        {loading && <Loading className="rc-button-loader" />}
      </Element>
    )
  },
);


/**
 * This is a readability improvement for devTools to account for the new use
 * of forwardRef(). Without this, a button's display name is 'ForwardRef(Button)'
 */
Button.displayName = 'Button';
Button.defaultProps = defaultProps;

export default Button;
