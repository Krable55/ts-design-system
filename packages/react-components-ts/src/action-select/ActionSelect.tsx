import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../button';
import ActionMenuList from '../internal/action-menu-list';
import { getDropdownPosition, focus } from '../helpers/statics';
import withId from '../helpers/withId';
import { Action } from '../internal/action-menu-list/ActionMenuList';
import { AnchorOrientationType, VisualType, Weight } from '../constants';
import { Icons } from '../icon/types';

interface ActionMenuListProps {
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: string,
  /** An Array of action objects */
  actions?: Action[],
  label?: string,
  /** Main visual variant */
  type?: VisualType,
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus?: boolean,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight?: Weight,
  /** Anchor orientation of the dropdown menu */
  anchor?: AnchorOrientationType,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon?: Icons | null,
  /** Is the button disabled?  */
  disabled?: boolean,
  /** If true, button will render with a loading spinner */
  loading?: boolean,
  /** Optional additional className passed to the outer element */
  className?: string,
  /** Optional inline width passed to the button element */
  width?: string | null,
  /** Optional inline style passed to the outer element */
  style?: React.CSSProperties,
};

export interface ActionSelectState {
 open: boolean;
 menuStyle?: React.CSSProperties;
}

const defaultProps: ActionMenuListProps = {
  id: '',
  actions: [],
  label: '',
  type: 'primary',
  innerFocus: false,
  weight: 'bold',
  anchor: 'bottom left',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  width: null,
  style: {},
};

class ActionSelect extends Component<ActionMenuListProps, ActionSelectState> {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      menuStyle: {},
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.focusButton = this.focusButton.bind(this);
    this.focusMenu = this.focusMenu.bind(this);
    this.closeAndFocusButton = this.closeAndFocusButton.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  private container: HTMLDivElement | null = null;
  private button: HTMLElement | null = null;
  private menu: ActionMenuList | null = null;


  onClickButton(e) {
    e.stopPropagation();
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onBlur(e) {
    if (!this.container?.contains(e.relatedTarget)) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    const { anchor } = this.props;
    this.setState(
      { open: true, menuStyle:  getDropdownPosition(this.button, anchor, 8) },
      this.focusMenu,
    );
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    focus(this.menu);
  }

  focusButton() {
    if (this.button) {
      focus(this.button);
    }
  }

  render() {
    const { open, menuStyle } = this.state;
    const {
      id,
      label,
      type,
      innerFocus,
      icon,
      disabled,
      loading,
      actions,
      weight,
      className,
      width,
      style,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-action-select',
          {
            'rc-action-select-open': open,
            'rc-action-select-closed': !open,
          },
          className,
        )}
        style={style}
        onBlur={this.onBlur}
        ref={container => {
          this.container = container;
        }}
      >
        <Button
          type={type}
          innerFocus={innerFocus}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          style={width ? { width, textAlign: 'left' } : undefined}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {label}
        </Button>
        <ActionMenuList
          id={`${id}-menu`}
          actions={actions}
          aria-labelledby={id}
          onActionClick={this.closeAndFocusButton}
          onEscape={this.closeAndFocusButton}
          style={menuStyle}
          ref={menu => {
            this.menu = menu;
          }}
        />
      </div>
    );
  }
}

(ActionSelect as any).defaultProps = defaultProps;
(ActionSelect as any).displayName = 'ActionSelect';

export default withId(ActionSelect);
