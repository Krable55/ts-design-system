import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import { ButtonProps } from '../button/button';
import { Icons } from '../icon/types';
import { Variant } from '../constants';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card button is just a Button with some defaults set
 */
const CardAction: FC<ButtonProps> = ({ className, ...rest }): ReactElement => {
  return (<div className={classNames('rc-card-actions', className)}>
    <Button icon={Icons.PENCIL} type={Variant.TRANSPARENT} {...rest} />
  </div>
  );
}

CardAction.propTypes = propTypes;
CardAction.defaultProps = defaultProps;

export default CardAction;
