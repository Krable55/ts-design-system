import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { TextColorType } from '../text/types';
import { HeadingType, Headings } from './types';

const propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['subtle', 'medium']),
  allCaps: PropTypes.bool,
  label: PropTypes.bool,
  hero: PropTypes.bool,
};


export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode | React.ReactNode[],
  as?: HeadingType,
  color?: TextColorType,
  allCaps?: boolean,
  label?: boolean,
  hero?: boolean,
}

const defaultProps: HeadingProps = {
  as: Headings.H1,
  className: '',
  allCaps: false,
  label: false,
  hero: false,
};

const Heading = ({
  children,
  as,
  className,
  color,
  hero,
  allCaps,
  label,
  ...others
}: HeadingProps) => {

  const classNames = classnames(
    'rc-heading',
    {
      'rc-heading-hero': hero,
      'rc-heading-caps': allCaps,
      'rc-heading-label': label,
      [`rc-heading-${as}`]: as && !hero ? as : false,
      [`rc-heading-${color}`]: color,
    },
    className,
  );

  /**
   * JSX requires element names to be capitalized if they are referenced as variables
   */
  if (!as) return null;
  const Component = as;
  return (
    <Component className={classNames} {...others}>
      {children}
    </Component>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
