import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
import { IconType } from '../icon/types';
import { ButtonProps } from '../button/button';

/**
* This corresponds to a set of native input types plus 'multiline',
* which will render a textarea element
 */
export type SupportedInputTypes = 'text' | 'email' | 'password' | 'url' | 'search' | 'number' | 'multiline' | 'hidden' | 'date' | 'time' | 'datetime-local';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size' | 'type' | 'onChange'> {
  /** Input name */
  name: string;
  /** Input type, inluding most standard native input types and 'multiline' which will render a 'textarea' */
  type?: SupportedInputTypes;
  /** Current value of the input */
  value?: string | number;
  /** Optional field placeholder */
  placeholder?: string;
  /** Alternate visual variation */
  simple?: boolean;
  /** Size of the input */
  size?: 'medium' | 'large';
  /** Shape of the i nput */
  shape?: 'round' | 'oval';
  /** Is the input di sabled */
  disabled?: boolean;
  /** Form  error, causing element to render red when present */
  error?: string | boolean;
  /** O ptional icon rendered before input area */
  icon?: IconType;
  /** @deprecated Optional icon rendered after input area */
  trailingIcon?: IconType;
  /** Icon  for rendered trailing button */
  trailingButtonIcon?: IconType;
  /** Text for rendered  trailing button. Can be used with or without trailingButtonIcon */
  trailingButtonText?: string;
  /** Additional props for the trailing Button */
  trailingButtonProps?: Omit<ButtonProps, 'ref'>;
  /** Optional additional className */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Ref method passed to the inner input element */
  inputRef?: (value: any) => void;
  /** Change handler. Passed in order: new value, original event. Additionally, other event handlers and and props are propagated to the inner input element for use as needed */
  onChange?: (newVal: number | string, e: any) => void;
  /** Function for trailing button click */
  onClickTrailingButton?: () => void;
}

const defaultProps: InputProps = {
  name: 'string',
  type: 'text',
  value: '',
  placeholder: '',
  simple: false,
  size: 'medium',
  shape: 'round',
  disabled: false,
  error: false,
  trailingButtonText: '',
  trailingButtonProps: {},
  style: {},
  className: '',
  inputRef() { },
  onChange() { },
  onClickTrailingButton() { },
};

/**
* Different value parsing for different input types.
*/
const parseValue = (value, type?: string) => {
  switch (type) {
    case 'number':
      return parseFloat(value);
    default:
      return value;
  }
}


const Input = ({
  name,
  type,
  simple,
  size,
  shape,
  error,
  icon,
  trailingIcon,
  trailingButtonIcon,
  trailingButtonText,
  trailingButtonProps,
  className,
  style,
  inputRef,
  onChange,
  onClickTrailingButton,
  ...otherProps }: InputProps) => {
  const isMultiline = type === 'multiline';

  const Element = isMultiline ? 'textarea' : 'input';

  const showTrailingButton = !!trailingButtonIcon || !!trailingButtonText;

  const lIcon = (
    <Icon
      className="rc-input-icon leading"
      width="16px"
      height="16px"
      type={icon}
    />
  );

  /** trailingIcon is deprecated */
  const tIcon = (
    <Icon
      className={`rc-input-icon trailing ${showTrailingButton &&
        'with-trailing-button'}`}
      width="16px"
      height="16px"
      type={trailingIcon}
    />
  );

  const trailingButton = (
    <Button
      className="rc-input-icon rc-input-button-icon trailing edge"
      icon={trailingButtonIcon}
      type="transparent"
      onClick={() => onClickTrailingButton?.()}
      {...trailingButtonProps}
    >
      {trailingButtonText}
    </Button>
  );

  return (
    <div
      className={classNames(
        className,
        'rc-input-container',
        `rc-input-container-${size}`,
        `rc-input-container-${shape}`,
      )}
      style={style}
    >
      {icon && lIcon}
      {trailingIcon && tIcon}
      {showTrailingButton && trailingButton}
      <Element
        id={name}
        name={name}
        type={isMultiline ? undefined : type}
        className={classNames('rc-input', {
          'rc-input-error': error,
          'rc-input-simple': simple,
          'rc-input-multiline': isMultiline,
        })}
        ref={inputRef}
        onChange={e => onChange?.(parseValue(e.target.value), e)}
        {...otherProps}
      />
    </div>
  );
};

(Input as any).defaultProps = defaultProps;

export default Input; 