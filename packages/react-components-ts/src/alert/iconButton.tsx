import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { IconType } from '../icon/types';
import Loading from '../loading';
import { TypeOfButton } from '../button/types';
import { ButtonProps } from '../button/button';
import { ColorType } from '../constants';

export interface IconButtonProps extends Omit<ButtonProps, 'type' | 'size'> {
  /** React component / element to render. Useful in cases where a button is used for navigation, so that it can be rendered as an anchor tag with the same styling */
  as?: React.ElementType<any>,
  /** Main visual variant */
  type?: ColorType,
  /** Icon to be rendered instead of button */
  icon?: IconType | null,
  size?: 'medium',
  /** Is the button disabled?  */
  disabled?: boolean,
  /** If true, button will render with a loading spinner */
  loading?: boolean,
  /** Optional html button type override */
  buttonType?: TypeOfButton,
  /** Optional additional className. */
  className?: string,
  /** Optional additional inline styles. */
  styles?: React.CSSProperties,
}

const defaultProps: IconButtonProps = {
  as: 'button',
  type: 'info',
  icon: null,
  size: 'medium',
  disabled: false,
  loading: false,
  buttonType: undefined,
  className: '',
  styles: {},
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

  if (Element === 'button') {
    return 'button';
  }

  return null;
};

const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  (
    {
      as: Element,
      type,
      icon,
      size,
      disabled,
      loading,
      buttonType,
      className,
      ...rest
    },
    ref,
  ) => {
    if (!Element) return null;
    return (
      <Element
        ref={ref}
        type={assignTypeDefault(buttonType, Element)}
        className={classNames(
          'rc-icon-button',
          `rc-icon-button-${type}`,
          {
            'rc-icon-button-loading': loading,
            'rc-icon-button-disabled': disabled,
          },
          className,
        )}
        disabled={loading || disabled}
        aria-disabled={Element !== 'button' && (loading || disabled)}
        aria-label={icon}
        role="button"
        tabIndex={0}
        {...rest}
      >
        {icon && (
          <Icon size={size} type={icon} className="rc-icon-button-icon-svg" />
        )}
        {loading && <Loading className="rc-icon-button-loader" />}
      </Element>
    )
  },
);

/**
 * This is a readability improvement for devTools to account for the new use
 * of forwardRef(). Without this, a button's display name is 'ForwardRef(IconButton)'
 */
IconButton.displayName = 'IconButton';
(IconButton as any).defaultProps = defaultProps;

export default IconButton;
