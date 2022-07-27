import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSHeightAndWidth } from '../constants';

const propTypes = {
  /** The content to render within the badge */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional avatar size */
  size: PropTypes.shape({}),
  /** Optional additional inline styles */
  style: PropTypes.shape({}),
};

export interface AvatarProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
  /** The content to render within the badge */
  children?: React.ReactNode,
  /** Optional additional classnames */
  className?: string,
  /** Optional avatar size */
  size?: CSSHeightAndWidth,
  /** Optional additional inline styles */
  style?: React.CSSProperties,
}

const defaultProps: AvatarProps = {
  children: null,
  className: '',
  style: {},
};

const Avatar = ({ children, className, size, style, ...props }: AvatarProps) => (
  <div
    className={classNames('rc-avatar', className)}
    {...props}
    style={{ ...size, ...style }}
  >
    {children}
  </div>
);

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
