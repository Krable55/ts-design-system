import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../heading';
import { HeadingProps } from '../heading/heading';
import { Headings } from '../heading/types';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardTitle = ({ className, as = Headings.H4, ...rest }: HeadingProps) => (
  <Heading
    as={as}
    className={classNames('rc-card-title', className)}
    {...rest}
  />
);

CardTitle.propTypes = propTypes;
CardTitle.defaultProps = defaultProps;

export default CardTitle;
