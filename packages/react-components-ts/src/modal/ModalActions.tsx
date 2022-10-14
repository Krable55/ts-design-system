import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AlignmentType, TextAlignment } from '../constants';

const propTypes = {
  className: PropTypes.string,
  actionsPosition: PropTypes.oneOf(['left', 'right', 'center']),
};

export interface ModalActionsProps {
  className?: string;
  actionsPosition?: Exclude<AlignmentType, 'justify' | TextAlignment.JUSTIFY>;
}

const defaultProps: ModalActionsProps = {
  className: '',
  actionsPosition: TextAlignment.LEFT,
};

const ModalActions = ({ className, actionsPosition, ...rest }: ModalActionsProps) => (
  <div
    className={classNames(
      'rc-modal-actions',
      `rc-modal-actions-${actionsPosition}`,
      className,
    )}
    {...rest}
  />
);

ModalActions.propTypes = propTypes;
ModalActions.defaultProps = defaultProps;

export default ModalActions;
