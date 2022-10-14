import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../button';
import OptionMenuList from '../internal/option-menu-list';
import { getDropdownPosition, focus } from '../helpers/statics';
import withId from '../helpers/withId';
import { DropdownOption } from './types';
import { AnchorOrientation, AnchorOrientationType, Variant, VariantType, Weight, WeightType } from '../constants';
import { IconType } from '../icon/types';
export interface ButtonSelectProps {
  /**
  * This prop is automatically passed from the withID HOC
  * @ignore
  */
  id?: string,
  /** Are multiple selections allowed? */
  multiple?: boolean,
  /** An array of select options */
  options?: DropdownOption[],
  /** Currently selected value or values */
  value?: null | string | number | (string | number)[],
  /** Value change handler. This function gets passed the new value as the only parameter. */
  onChange: (value?: string | number | (string | number)[]) => void,
  /** When in multiple mode, should the selected items be applied immediately? */
  applyImmediately?: boolean, // eslint-disable-line
  /** Text rendered when no value is selected */
  placeholder?: string,
  /** Main visual variant */
  type?: VariantType,
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus?: boolean,
  /** Text to render as the action label in multiple mode */
  actionLabel?: string,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight?: WeightType,
  /** Anchor orientation of the dropdown menu */
  anchor?: null | AnchorOrientationType,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon?: null | IconType,
  /** Is the button disabled?  */
  disabled?: boolean,
  /** If true, button will render with a loading spinner */
  loading?: boolean,
  /** Optional additional className passed to the outer element */
  className?: string,
  /** Optional inline width passed to the button element */
  width?: null | string,
  /** Optional inline style passed to the outer element */
  style?: React.CSSProperties
}
export interface ButtonSeletcState {
  open: boolean,
  menuStyle?: React.CSSProperties,
  listValue?: string | number | (string | number)[],
}

const defaultProps: ButtonSelectProps = {
  multiple: false,
  options: [],
  applyImmediately: false,
  value: null,
  onChange() { },
  placeholder: 'Select',
  type: Variant.PRIMARY,
  innerFocus: false,
  actionLabel: undefined,
  weight: Weight.BOLD,
  anchor: AnchorOrientation.BOTTOM_LEFT,
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  width: null,
  style: {},
};

const isControlled = ({ multiple, applyImmediately }: ButtonSelectProps) =>
  !multiple || applyImmediately;

export type GetActionLabelParams = {
  actionLabel?: string,
  applyImmediately?: boolean
}

const getActionLabel = ({ actionLabel, applyImmediately }: GetActionLabelParams) =>
  actionLabel || (applyImmediately ? 'Done' : 'Apply');

class ButtonSelect extends Component<ButtonSelectProps, ButtonSeletcState> {
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
    this.onValueChange = this.onValueChange.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
    this.getButtonLabel = this.getButtonLabel.bind(this);
  }

  static defaultProps = defaultProps;
  private container: HTMLDivElement | null = null;
  private button: HTMLElement | null = null;
  private menu: OptionMenuList | null = null;


  static getDerivedStateFromProps(props, state) {
    if (isControlled(props) || !state.open) {
      return {
        listValue: props.value,
      };
    }

    return null;
  }

  onClickButton() {
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

  onValueChange(listValue) {
    const { onChange, multiple } = this.props;

    if (isControlled(this.props)) {
      onChange(listValue);
    } else {
      this.setState({ listValue });
    }

    if (!multiple) {
      this.closeAndFocusButton();
    }
  }

  onActionClick() {
    const { onChange } = this.props;
    const { listValue } = this.state;

    if (!isControlled(this.props)) {
      onChange(listValue);
    }

    this.closeAndFocusButton();
  }

  getButtonLabel() {
    const { placeholder, multiple, options = [], value } = this.props;

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }
    if (multiple) {
      const selectedOptions = options
        .filter(option => Array.isArray(value) && value.includes(option.value))
        .map(option => option.selectedLabel || option.label);

      return selectedOptions.join(', ');
    }

    const selectedOption = options.find(option => option.value === value);

    return selectedOption?.selectedLabel || selectedOption?.label;
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    const { anchor } = this.props;

    this.setState(
      { open: true, menuStyle: getDropdownPosition(this.button, anchor, 8) },
      this.focusMenu,
    );
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    if (this.menu) {
      this.menu.focusMenu();
    }
  }

  focusButton() {
    focus(this.button);
  }

  render() {
    const {
      onValueChange,
      onClickButton,
      onBlur,
      closeAndFocusButton,
      onActionClick,
    } = this;
    const { open, menuStyle, listValue } = this.state;
    const {
      id,
      multiple,
      applyImmediately,
      type,
      innerFocus,
      icon,
      disabled,
      loading,
      options = [],
      weight,
      className,
      width,
      style,
      value,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-button-select',
          {
            'rc-button-select-open': open,
            'rc-button-select-closed': !open,
          },
          className,
        )}
        style={style}
        onBlur={onBlur}
        ref={container => {
          this.container = container;
        }}
      >
        <Button
          className={classNames('rc-button-select-target', {
            'rc-button-select-target-multiple': multiple,
            'rc-button-select-target-selected': value && (Array.isArray(value) && value.length !== 0),
          })}
          type={type}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          style={width ? { width, textAlign: 'left' } : undefined}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={onClickButton}
          innerFocus={innerFocus}
          ref={button => {
            this.button = button;
          }}
        >
          {this.getButtonLabel()}
        </Button>
        <OptionMenuList
          id={`${id}-menu`}
          multiple={multiple}
          showCancel={multiple && !applyImmediately}
          options={options}
          selected={listValue}
          aria-labelledby={id}
          onActionClick={onActionClick}
          onEscape={closeAndFocusButton}
          onChange={onValueChange}
          style={menuStyle}
          actionLabel={getActionLabel(this.props)}
          ref={menu => {
            this.menu = menu;
          }}
        />
      </div>
    );
  }
}

export default withId(ButtonSelect);
