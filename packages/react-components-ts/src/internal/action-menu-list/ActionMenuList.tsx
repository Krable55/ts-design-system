import React, { Component } from 'react';
import classNames from 'classnames';
import scrollIntoView from 'scroll-into-view-if-needed';
import { KeyCode, KeyCodeType } from '../../constants';
import ActionMenuListItem from './ActionMenuListItem';
import { isNil, focus, cancelEvent } from '../../helpers/statics';
import { IconType } from '../../icon/types';

export type Action = {
  id: number | string;
  label: string;
  icon?: IconType;
  svg?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  as?: React.ComponentType<any>;
  disabled?: boolean;
};

export interface ListActions extends React.HTMLAttributes<HTMLUListElement> {
  onActionClick?: (
    id: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onEscape?: (event?: React.KeyboardEvent) => void;
  onBlur?: (event?: React.FocusEvent<HTMLUListElement, Element>) => void;
};
export interface ActionMenuListProps extends ListActions {
  id: string;
  actions: Action[];
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps: ActionMenuListProps = {
  id: '',
  actions: [],
  onActionClick() { },
  onEscape() { },
  onBlur() { },
  className: '',
  style: {},
};

const getActionId = (id, actionId) => `${id}-${actionId}`;

const getFocusedId = (focusedIndex, id, actions) =>
  isNil(focusedIndex) ? undefined : getActionId(id, actions[focusedIndex].id);
export interface ActionMenuListState {
  focusedIndex: number | null;
}

class ActionMenuList extends Component<
  ActionMenuListProps,
  ActionMenuListState
> {
  public static defaultProps = defaultProps;
  /**
   * List of refs to action item elements
   */
  actionRefs: any[] = [];
  /**
   * List of refs to inner action item content, including rendered anchor
   * tags if used
   */
  actionInnerRefs: any[] = [];
  private listRef: HTMLUListElement | null = null;

  constructor(props) {
    super(props);

    const { actions } = this.props;
    this.state = {
      focusedIndex: actions.length ? 0 : null,
    };

    this.executeAction = this.executeAction.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    }
  }

  onMouseEnterItem(focusedIndex) {
    this.setState({
      focusedIndex,
    });
  }

  onMouseLeave() {
    this.setState({
      focusedIndex: null,
    });
  }

  onArrowUp() {
    const { focusedIndex } = this.state;

    if (isNil(focusedIndex)) {
      this.focusLast();
    } else {
      this.focusItem(Math.max(0, focusedIndex - 1));
    }
  }

  onArrowDown() {
    const { focusedIndex } = this.state;
    const { actions } = this.props;

    if (isNil(focusedIndex)) {
      this.focusFirst();
    } else {
      this.focusItem(Math.min(actions.length - 1, focusedIndex + 1));
    }
  }

  onKeyDown(e?: React.KeyboardEvent<HTMLUListElement>) {
    const { onEscape } = this.props;
    if (!e) return;
    switch (e.keyCode as KeyCodeType) {
      case KeyCode.UP: {
        this.onArrowUp();
        cancelEvent(e);
        break;
      }
      case KeyCode.DOWN: {
        this.onArrowDown();
        cancelEvent(e);
        break;
      }
      case KeyCode.HOME: {
        this.focusFirst();
        cancelEvent(e);
        break;
      }
      case KeyCode.END: {
        this.focusLast();
        cancelEvent(e);
        break;
      }
      case KeyCode.SPACE:
      case KeyCode.ENTER: {
        this.executeFocusedItem();
        cancelEvent(e);
        break;
      }
      case KeyCode.ESC: {
        onEscape?.(e);
        cancelEvent(e);
        break;
      }
      default:
        break;
    }
  }

  executeAction(e, onClick, id) {
    e.stopPropagation();
    const { onActionClick } = this.props;

    onActionClick?.(id);

    if (onClick) {
      onClick();
    }
  }

  focus() {
    focus(this.listRef);
  }

  focusFirst() {
    this.focusItem(0);
  }

  focusLast() {
    const { actions } = this.props;

    this.focusItem(actions.length - 1);
  }

  focusItem(focusedIndex) {
    this.setState({ focusedIndex });

    /**
     * Scrolls newly focused item into view if it is not
     */
    scrollIntoView(this.actionRefs[focusedIndex], {
      block: 'end',
      scrollMode: 'if-needed',
    });
  }

  executeFocusedItem() {
    const { focusedIndex } = this.state;

    // triggering click event so that links work
    if (!isNil(focusedIndex) && this.actionRefs[focusedIndex]) {
      const focusedElement = this.actionInnerRefs[focusedIndex];

      focusedElement.click();
    }
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  render() {
    const {
      executeAction,
      onMouseEnterItem,
      onMouseLeave,
      onKeyDown,
      onFocus,
    } = this;
    const { focusedIndex } = this.state;
    const {
      id,
      actions,
      onActionClick,
      onEscape,
      className,
      style,
      ...rest
    } = this.props;

    const focusedId = getFocusedId(focusedIndex, id, actions);
    return (
      <div
        className={classNames('rc-menu-list', 'rc-action-menu-list', className)}
        style={style}
      >
        <ul
          id={id}
          role="menu"
          tabIndex={0}
          className="rc-menu-list-inner"
          aria-activedescendant={focusedId}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          ref={el => {
            this.listRef = el;
          }}
          {...rest}
        >
          {actions.map(
            (
              { id: actionId, label, icon, svg, onClick, disabled, ...other },
              index
            ) => (
              <ActionMenuListItem
                id={getActionId(id, actionId)}
                key={actionId}
                focused={index === focusedIndex}
                icon={icon}
                svg={svg}
                onMouseEnter={() => onMouseEnterItem(index)}
                disabled={disabled}
                onClick={
                  disabled
                    ? undefined
                    : e => executeAction(e, onClick, actionId)
                }
                ref={el => {
                  this.actionRefs[index] = el;
                }}
                innerRef={el => {
                  this.actionInnerRefs[index] = el;
                }}
                {...other}
              >
                {label}
              </ActionMenuListItem>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default ActionMenuList;
