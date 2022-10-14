import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import { Icons } from '../icon/types';
import { Variant } from '../constants';

const propTypes = {
  /** Copy icon alignment */
  align: PropTypes.oneOf(['center', 'flex-end']),
  /** Optional additional className */
  className: PropTypes.string,
  /** Component children */
  children: PropTypes.node,
  /** Optional function be called after copy-to-clipboard */
  onCopy: PropTypes.func,
  /** Optional function be called if copy-to-clipboard fails */
  onCopyError: PropTypes.func,
  /** Value to copy, overrides text in child nodes */
  value: PropTypes.string,
  /** Click-to-copy handler. */
  writeToClipboard: PropTypes.func,
};
type NodesOrString<T extends unknown> = T extends string ? string : (React.ReactNode | React.ReactNode[]);
interface CopyProps<T extends unknown> {
  /** Copy icon alignment */
  align?: 'center' | 'flex-end',
  /** Optional additional className */
  className?: string,
  /** Component children */
  children?: NodesOrString<T>,
  /** Optional function be called after copy-to-clipboard */
  onCopy?: (value?: NodesOrString<T>) => void,
  /** Optional function be called if copy-to-clipboard fails */
  onCopyError?: (value?: NodesOrString<T>) => void,
  /** Value to copy, overrides text in child nodes */
  value?: NodesOrString<T>,
  /** Click-to-copy handler. */
  writeToClipboard?: (value?: NodesOrString<T>) => void | Promise<void>,
}


const defaultProps: CopyProps<string> = {
  align: 'center',
  className: '',
  onCopy: () => { },
  onCopyError: () => { },
  writeToClipboard: (value?: string) => value ? navigator.clipboard.writeText(value) : Promise.reject(),
};

const Copy = <T extends unknown>({
  align,
  children,
  className,
  onCopy,
  onCopyError,
  value,
  writeToClipboard,
}: CopyProps<T>) => {
  let copyValue: NodesOrString<T> | undefined = value;

  const copy = async () => {
    try {
      // this will prompt a user to grant clipboard access if not granted. If the user blocks access this promise will reject
      await writeToClipboard?.(copyValue);
      onCopy?.(copyValue);
    } catch (e) {
      onCopyError?.(copyValue);
    }
  };

  if (!copyValue) {
    try {
      const child = React.Children.only(children);
      // An explicitly set `value` prop on the child node supercedes child text
      // value = child.props?.children ? child.props.children : value;
      const secondDecendantValue = (child as any)?.props?.children
      if (typeof secondDecendantValue === 'string') {
        copyValue = secondDecendantValue;
      }

      const firstDecendantValue = (child as any)?.props?.value;
      if (typeof firstDecendantValue === 'string') {
        copyValue = firstDecendantValue
      };
    } catch (e) {
      // If `children` is not a single React element, a string node is a valid value
      const [directDecendant] = React.Children.toArray(children);
      if (typeof directDecendant === 'string') {
        copyValue = directDecendant;
      }
    }
  }

  // If copyValue is still null after checking children for valid values, return null
  if (!copyValue) return null;

  return (
    <div className={classNames('copy', `copy-${align}`, className)}>
      <div className="copy-input">{children}</div>
      <Button
        icon={Icons.COPY}
        className="value-copy-button"
        type={Variant.SECONDARY}
        onClick={copy}
      />
    </div>
  );
};

Copy.propTypes = propTypes;
Copy.defaultProps = defaultProps;

export default Copy;
