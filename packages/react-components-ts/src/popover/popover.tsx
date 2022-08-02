import React from 'react';
import classNames from 'classnames';
import Button from '../button';
import { ElementElevation } from '../constants';


export interface PopoverProps {
  /** Optional additional className */
  className?: string,
  /** Function to call when the close button is clicked */
  onClose?: () => void,
  /** Component children */
  children?: React.ReactNode | React.ReactNode[],
  /** Side the arrow appears on */
  side: 'top' | 'bottom' | 'left' | 'right',
  /** Popover 'elevation' visually indicated with box-shadow */
  elevation: ElementElevation,
}

const defaultProps = {
  className: '',
  onClose: () => { },
  children: null,
  side: 'left',
  elevation: 0,
};

const Popover = ({
  className,
  onClose,
  children,
  side,
  elevation,
  ...rest
}: PopoverProps) => {
  return (
    <div
      className={classNames(
        'rc-popover',
        `rc-popover-${side}`,
        `rc-popover-elevation-${elevation}`,
        className,
      )}
      {...rest}
    >
      <Button
        className="rc-popover-close"
        icon="x"
        onClick={onClose}
        type="transparent"
      />
      {children}
    </div>
  );
};

Popover.defaultProps = defaultProps;

export default Popover;
