import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Icons } from '../../library/icon/icons';
import { Icon } from '../../library/icon';

export enum OptionListItem {
  OPTION = 'option',
  HEADING = 'heading',
}

export type OptionListItemType = 'option' | 'heading' | OptionListItem;

export interface OptionMenuListItemProps {
  id: string;
  children?: React.ReactNode | React.ReactNode[];
  focused?: boolean;
  selected?: boolean;
  /** Optional: choose an icon */
  icon?: Icons;
  /** Or pass in your own svg... */
  svg?: JSX.Element;
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
  type?: OptionListItemType;
}

const defaultProps: OptionMenuListItemProps = {
  id: '',
  focused: false,
  disabled: false,
  selected: false,
  type: OptionListItem.OPTION,
};

/* eslint-disable jsx-a11y/click-events-have-key-events */
const OptionMenuListItem = forwardRef<any, OptionMenuListItemProps>(
  (
    {
      id,
      children,
      focused,
      selected,
      icon,
      svg,
      onClick,
      onMouseEnter,
      disabled,
      type,
    },
    ref
  ) => {
    const isHeading = type === OptionListItem.HEADING;
    const itemProps = {
      id,
      ref,
      onMouseEnter,
      onClick,
      role: isHeading ? 'presentation' : 'option',
    };

    if (!isHeading) {
      itemProps['aria-selected'] = selected;
    }

    return (
      <li
        {...itemProps}
        className={classNames(
          'rc-menu-list-item',
          {
            'rc-menu-list-item-disabled': disabled,
          },
          isHeading
            ? 'rc-menu-list-group-heading'
            : {
                'rc-menu-list-item-focused': focused,
                'rc-menu-list-item-selected': selected,
              }
        )}
      >
        {icon && <Icon className="rc-menu-list-item-icon" type={icon} />}
        {svg && !icon && <Icon className="rc-menu-list-item-icon" svg={svg} />}
        <span className="rc-menu-list-item-content">{children}</span>
        {!isHeading && selected && (
          <Icon
            className="rc-menu-list-item-checkmark"
            type="check"
            size="small"
          />
        )}
      </li>
    );
  }
);
/* eslint-enable */
OptionMenuListItem.defaultProps = defaultProps;

export default OptionMenuListItem;
