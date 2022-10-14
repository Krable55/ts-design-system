import React, { Component } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import filterDescendants from '../helpers/filterDescendants';
import Button from '../button';

import ModalTitle from './ModalTitle';
import ModalActions from './ModalActions';

export interface ModalProps {
  /** Additional classes to add in addition to 'rc-modal' */
  className?: string,
  /** Allow closing via the ESC key and clicking outside the modal */
  closeOnEscapeAndOverlay?: boolean,
  /** A boolean to toggle the modal open and closed */
  isOpen?: boolean,
  /** Function to call when the close button is clicked or ESC is pressed */
  onClose?: React.MouseEventHandler<HTMLButtonElement>,
  /** Optional additional className passed to the modal overlay */
  overlayClassName?: string,
  /** Modal content */
  children?: React.ReactNode | React.ReactNode[],
}

export interface ModalState {
  scrollbarWidth: number,
  isOverflowing: boolean
}

const defaultProps: ModalProps = {
  className: '',
  closeOnEscapeAndOverlay: true,
  isOpen: true,
  onClose: () => { },
  overlayClassName: '',
  children: null,
};


class Modal extends Component<ModalProps, ModalState> {
  constructor(props) {
    super(props);
    this.state = { scrollbarWidth: 0, isOverflowing: false };
  }

  static defaultProps = defaultProps;
  static Title = ModalTitle;
  static Actions = ModalActions;

  render() {
    const {
      children,
      className,
      closeOnEscapeAndOverlay,
      isOpen,
      onClose,
      overlayClassName,
      ...props
    } = this.props;

    const { scrollbarWidth, isOverflowing } = this.state;

    const { pluckedDescendants: actions, otherDescendants } = filterDescendants(
      {
        children,
        components: ModalActions,
      },
    );

    const hasActions = actions?.length ?? 0 > 0;

    return (
      <ReactModal
        // https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
        // "The aria-modal property introduced by ARIA 1.1 replaces aria-hidden
        // for informing assistive technologies that content outside a dialog is
        // inert." Thus, we can omit `aria-hidden` with this prop and add
        // `aria-modal` with the modal prop below.
        ariaHideApp={false}
        className={classNames('rc-modal', className, {
          'rc-modal-has-actions': hasActions,
          'rc-modal-is-overflowing': isOverflowing,
        })}
        isOpen={!!isOpen}
        onRequestClose={closeOnEscapeAndOverlay ? onClose : undefined}
        overlayClassName={`rc-modal-overlay ${overlayClassName}`}
        aria={{ modal: true }}
        {...props}
      >
        <Button
          className="rc-modal-close"
          icon="x"
          onClick={onClose}
          style={{ right: scrollbarWidth + 2 }}
          type="transparent"
        />
        <div className="rc-modal-children" ref={element => {
          if (element) {
            const scrollbarWidth = element.offsetWidth - element.clientWidth;
            const isOverflowing = element.scrollHeight - element.clientHeight > 0;
            this.setState({ scrollbarWidth, isOverflowing });
          }
        }}>
          {otherDescendants}
        </div>
        {hasActions && actions}
      </ReactModal>
    );
  }
}

export default Modal;
