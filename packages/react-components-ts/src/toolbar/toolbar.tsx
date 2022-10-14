import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Actions from './actions';
import { Variant, VariantType } from '../constants';

const propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']),
    /** Should the Toolbar have a top and bottom border */
    border: PropTypes.bool,
    /** Children may include Tabs or Toolbar.Actions */
    children: PropTypes.node,
    /** Additional class name */
    className: PropTypes.string,
    /** Height in percent, e.g. "100%", or pixels */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};



export interface ToolbarProps {
    type?: Extract<VariantType, 'primary' | 'seconday' | Variant.PRIMARY | Variant.SECONDARY>,
    /** Should the Toolbar have a top and bottom border */
    border?: boolean,
    /** Children may include Tabs or Toolbar.Actions */
    children?: React.ReactNode | React.ReactNode[],
    /** Additional class name */
    className?: string,
    /** Height in percent, e.g. "100%", or pixels */
    height?: string | number,
}

const defaultProps: ToolbarProps = {
    type: Variant.PRIMARY,
    border: false,
    children: null,
    className: '',
};

const Toolbar = ({ type, border, children, className, height }: ToolbarProps) => (
    <div
        className={classNames('rc-toolbar', `rc-toolbar-${type}`, className, {
            'rc-toolbar-border': border,
        })}
        style={{ height }}
    >
        {children}
    </div>
);

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

Toolbar.Actions = Actions;

export default Toolbar;
