import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconType } from '../../icon/types';
import Icon from '../../icon';

interface ActionMenuListItemProps {
  as?: React.ComponentType<any>;
  id: string;
  children: React.ReactNode | React.ReactNode[];
  focused: boolean;
  /** Optional: choose an icon */
  icon?: IconType;
  /** Or pass in your own svg... */
  svg?: JSX.Element;
  onMouseEnter: () => void;
  onClick?: (e: any) => void;
  innerRef?: (ref: HTMLElement) => void;
  disabled?: boolean;
}
const defaultProps: Partial<ActionMenuListItemProps> = {
  as: undefined,
  innerRef() { },
  disabled: false,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const ActionMenuListItem = forwardRef<any, ActionMenuListItemProps>(
  (
    {
      as: Element,
      id,
      children,
      focused,
      icon,
      svg,
      onMouseEnter,
      innerRef,
      disabled,
      ...rest
    },
    ref
  ) => {
    if (Element) {
      return (
        <li
          role="none"
          className={classNames('rc-menu-list-item', {
            'rc-menu-list-item-focused': focused,
            'rc-menu-list-item-disabled': disabled,
          })}
          onMouseEnter={onMouseEnter}
          ref={ref}
        >
          <Element
            id={id}
            role="menuitem"
            className="rc-menu-list-item-inner"
            tabIndex={-1}
            ref={innerRef}
            disabled={disabled}
            {...rest}
          >
            {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
            {svg && !icon && (
              <Icon className="rc-menu-list-item-icon" svg={svg} />
            )}
            <span className="rc-menu-list-item-content">{children}</span>
          </Element>
        </li>
      );
    }
    return (
      <li
        role="menuitem"
        id={id}
        className={classNames('rc-menu-list-item', {
          'rc-menu-list-item-focused': focused,
          'rc-menu-list-item-disabled': disabled,
        })}
        onMouseEnter={onMouseEnter}
        ref={ref}
        {...rest}
      >
        {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
        {svg && !icon && <Icon className="rc-menu-list-item-icon" svg={svg} />}
        <span className="rc-menu-list-item-content" ref={innerRef}>
          {children}
        </span>
      </li>
    );
  }
);
/* eslint-enable */
ActionMenuListItem.defaultProps = defaultProps;

export default ActionMenuListItem;
