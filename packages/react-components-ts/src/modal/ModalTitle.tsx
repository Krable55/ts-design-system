import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../heading';
import { HeadingProps } from '../heading/heading';
import { Headings } from '../constants';

const propTypes = {
  className: PropTypes.string,
};



const ModalTitle = ({ className = '', ...rest }: HeadingProps) => (
  <Heading
    as={Headings.H3}
    className={classNames('rc-modal-title', className)}
    {...rest}
  />
);

ModalTitle.propTypes = propTypes;

export default ModalTitle;
