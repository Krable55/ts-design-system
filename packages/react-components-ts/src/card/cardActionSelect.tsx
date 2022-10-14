import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionSelect from '../action-select';
import { Icons } from '../icon/types';
import { AnchorOrientation, Variant } from '../constants';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardActionSelect = ({ className, ...rest }) => (
  <div className={classNames('rc-card-actions', className)}>
    <ActionSelect
      icon={Icons.KEBAB}
      type={Variant.TRANSPARENT}
      anchor={AnchorOrientation.BOTTOM_RIGHT}
      {...rest}
    />
  </div>
);

CardActionSelect.propTypes = propTypes;
CardActionSelect.defaultProps = defaultProps;

export default CardActionSelect;
