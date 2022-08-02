import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextColor, TextSize } from './types';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Text Size */
  size: PropTypes.oneOf(['medium', 'small', 'tiny']),
  /** Text color */
  color: PropTypes.oneOf(['subtle', 'medium', 'danger', 'warning', 'success']),
  /** Text body */
  children: PropTypes.node,
  /** Optional additional classname. */
  className: PropTypes.string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style: PropTypes.shape({}),
};

export interface TextProps extends Record<string, unknown> {
  /** Html element or react component to render */
  as?: React.ElementType<any>,
  /** Text Size */
  size?: TextSize,
  /** Text color */
  color?: TextColor | null,
  /** Text body */
  children?: React.ReactNode | React.ReactNode[],
  /** Optional additional classname. */
  className?: string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style?: React.CSSProperties,
};

const defaultProps: TextProps = {
  as: 'div',
  children: '',
  className: '',
  size: 'medium',
  color: null,
  style: {},
};

const Text = ({
  as: Element,
  size,
  color,
  children,
  className,
  style,
  ...other
}: TextProps) => {
  if (!Element) return null;
  return (
    <Element
      className={classNames(
        'rc-text',
        {
          [`rc-text-size-${size}`]: size,
          [`rc-text-${color}`]: color,
        },
        className,
      )}
      style={style}
      {...other}
    >
      {children}
    </Element>
  )
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
