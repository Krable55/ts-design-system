import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColorType, TextSizeType } from '../constants';
import { VariantType } from '../constants';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Text Size */
  size: PropTypes.oneOf(['medium', 'small', 'tiny']),
  /** Link text */
  children: PropTypes.node,
  /** Optional additional classname. */
  className: PropTypes.string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style: PropTypes.shape({}),
  /** Optional disabled prop */
  disabled: PropTypes.bool,
  /** Type of Link */
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export interface LinkProps extends Record<string, unknown> {
  /** Html element or react component to render */
  as?: React.ElementType<any> | string,
  /** Text color */
  color?: TextColorType,
  /** Text Size */
  size?: TextSizeType,
  /** Link text */
  children?: React.ReactNode,
  /** Optional additional classname. */
  className?: string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style?: React.CSSProperties,
  /** Optional disabled prop */
  disabled?: boolean,
  /** Type of Link */
  type?: Extract<VariantType, 'primary' | 'secondary'>,
}

const defaultProps: LinkProps = {
  as: 'a',
  size: 'medium',
  className: '',
  children: null,
  style: {},
  disabled: false,
  type: 'primary',
};

const Link = ({ as, size, className, children, disabled, type, ...rest }: LinkProps) => {
  const Element = as;


  if (!Element) return null;
  return (
    <Element
      className={classNames(
        'rc-link',
        `rc-link-${type}`,
        {
          [`rc-link-size-${size}`]: size,
        },
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      <span className="rc-link-children">{children}</span>
    </Element>);
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
