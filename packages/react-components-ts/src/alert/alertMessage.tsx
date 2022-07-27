import React from 'react';
import classNames from 'classnames';
import Text from '../text';

export interface AlertMessageProps {
  className?: string,
}

const defaultProps = {
  className: '',
};

const AlertMessage = ({ className, ...rest }: AlertMessageProps) => (
  <Text
    className={classNames('rc-alert-body-message', className)}
    size="small"
    {...rest}
  />
);

AlertMessage.defaultProps = defaultProps;

export default AlertMessage;
