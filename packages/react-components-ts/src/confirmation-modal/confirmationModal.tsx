import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from '../modal';
import Button from '../button';
import { Variant, VariantType } from '../constants';

const propTypes = {
  /** Heading in the modal window */
  title: PropTypes.string,
  /** Content in the modal window */
  description: PropTypes.string,
  /** A boolean to toggle the modal open and closed */
  isOpen: PropTypes.bool,
  /** Confirmation button label */
  confirmLabel: PropTypes.string,
  /** Cancel button label */
  cancelLabel: PropTypes.string,
  /** Confirm button type, defaults to "primary" */
  confirmButtonType: PropTypes.string,
  /** Cancel button type, defaults to "tertiary" */
  cancelButtonType: PropTypes.string,
  /** Function to call when action is confirmed */
  onConfirm: PropTypes.func,
  /** Function to call when action is cancelled, close button is clicked, or ESC is pressed */
  onCancel: PropTypes.func,
  /** If true, confirm button will render with a loading spinner */
  confirmButtonLoading: PropTypes.bool,
  /** Additional classes to add in addition to 'rc-modal' */
  className: PropTypes.string,
};

export interface ConfirmationModalProps {
  /** Heading in the modal window */
  title?: string,
  /** Content in the modal window */
  description?: string,
  /** A boolean to toggle the modal open and closed */
  isOpen?: boolean,
  /** Confirmation button label */
  confirmLabel?: string,
  /** Cancel button label */
  cancelLabel?: string,
  /** Confirm button type, defaults to "primary" */
  confirmButtonType?: VariantType,
  /** Cancel button type, defaults to "tertiary" */
  cancelButtonType?: VariantType,
  /** Function to call when action is confirmed */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>,
  /** Function to call when action is cancelled, close button is clicked, or ESC is pressed */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>,
  /** If true, confirm button will render with a loading spinner */
  confirmButtonLoading?: boolean,
  /** Additional classes to add in addition to 'rc-modal' */
  className?: string,
}

const defaultProps = {
  title: '',
  description: '',
  isOpen: true,
  confirmLabel: '',
  cancelLabel: '',
  confirmButtonType: Variant.PRIMARY,
  cancelButtonType: Variant.TERTIARY,
  onConfirm: () => { },
  onCancel: () => { },
  confirmButtonLoading: false,
  className: '',
};

const ConfirmationModal = ({
  title,
  description,
  isOpen,
  confirmLabel,
  cancelLabel,
  confirmButtonType,
  cancelButtonType,
  onConfirm,
  onCancel,
  confirmButtonLoading,
  className,
}: ConfirmationModalProps) => (
  <Modal
    className={classnames('rc-confirmation-modal', className)}
    onClose={onCancel}
    isOpen={isOpen}
  >
    {title && <Modal.Title>{title}</Modal.Title>}
    {description}
    <Modal.Actions>
      <Button
        type={confirmButtonType}
        onClick={onConfirm}
        loading={confirmButtonLoading}
      >
        {confirmLabel}
      </Button>
      <Button type={cancelButtonType} onClick={onCancel}>
        {cancelLabel}
      </Button>
    </Modal.Actions>
  </Modal>
);

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
