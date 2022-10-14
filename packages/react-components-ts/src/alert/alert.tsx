import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Text from '../text';
import Icon from '../icon';
import IconButton from './iconButton';

import AlertMessage from './alertMessage';
import AlertActions from './alertActions';
import AlertError from './alertError';
import { Icons } from '../icon/types';
import { AlertType } from '../constants';

const propTypes = {
  /** Main content */
  children: PropTypes.node,
  /** Main visual variant */
  type: PropTypes.oneOf(['info', 'danger', 'success', 'warning']),
  /** Should the alert have a dismiss button? */
  closeable: PropTypes.bool,
  /** What should happen on explicit close? */
  onClose: PropTypes.func,
  /** Alert 'elevation' visually indicated with box-shadow */
  elevated: PropTypes.bool,
  /** Optional additional className. */
  className: PropTypes.string,
};

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
  /** Main content */
  children?: React.ReactNode | React.ReactNode[];
  /** Main visual variant */
  type?: AlertType,
  /** Should the alert have a dismiss button? */
  closeable?: boolean,
  /** What should happen on explicit close? */
  onClose?: () => void,
  /** Alert 'elevation' visually indicated with box-shadow */
  elevated?: boolean,
  /** Optional additional className. */
  className?: string,
}

const defaultProps: AlertProps = {
  children: '',
  type: 'info',
  closeable: false,
  onClose() { },
  elevated: false,
  className: '',
};


class Alert extends React.Component<AlertProps> {
  public static Message = AlertMessage;
  public static Actions = AlertActions;
  public static Error = AlertError;

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    const { onClose } = this.props;

    onClose?.();
  }

  render() {
    const {
      children,
      type,
      closeable,
      elevated,
      className,
      ...rest
    } = this.props;
    const classNames = classnames(
      'rc-alert',
      {
        [`rc-alert-${type}`]: type,
        'rc-alert-elevated': elevated,
      },
      className,
    );
    let closeButton;
    let typeIcon;

    switch (type) {
      case 'danger':
        typeIcon = Icons.ERROR;
        break;
      case 'warning':
        typeIcon = Icons.ALERT;
        break;
      case 'success':
        typeIcon = Icons.CHECK_CIRCLE;
        break;
      case 'info':
      default:
        typeIcon = Icons.INFO_CIRCLE;
    }

    if (closeable) {
      closeButton = (
        <IconButton
          icon='x'
          type={type}
          onClick={this.onClose}
          className="rc-alert-dismiss-icon"
        />
      );
    }

    return (
      <div data-testid="rc-alert" className={classNames} {...rest}>
        <Icon className="rc-alert-primary-icon" type={typeIcon} size="medium" />
        <Text className="rc-alert-message" size="small">
          {children}
        </Text>
        {closeButton}
      </div>
    );
  }
}

(Alert as any).propTypes = propTypes;
(Alert as any).defaultProps = defaultProps;

export default Alert;
