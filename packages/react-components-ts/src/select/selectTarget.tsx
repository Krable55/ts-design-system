import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

const propTypes = {};

const defaultProps = {};

const renderText = (type, value, placeholder) => {
  if (type === 'multiselect' || !value) {
    return placeholder;
  }

  return value;
};
type SelectTargetProps = React.HTMLAttributes<HTMLButtonElement> & { error?: string | boolean, placeholder?: string, value?: string | number | React.ReactNode, type?: string, disabled?: boolean };

/* eslint-disable react/prop-types */
const SelectTarget = forwardRef<HTMLButtonElement, SelectTargetProps>(
  (props, ref) => {
    const { error, value, type, placeholder, className, ...rest } = props;
    if (!ref || !props) return null
    return (
      <div className={classNames('rc-input-container', 'rc-select-target')}>
        <button
          type="button"
          className={classNames('rc-input', {
            'rc-input-error': error,
            'rc-input-empty': !value,
          })}
          ref={ref}
          {...rest}

        >
          <Icon
            className="rc-input-icon trailing"
            width="16px"
            height="16px"
            type="chevron-down"
          />
          {renderText(type, value, placeholder)}
        </button>
      </div>
    )
  } ,
);
/* eslint-enable */
SelectTarget.propTypes = propTypes;
SelectTarget.defaultProps = defaultProps;

export default SelectTarget;
