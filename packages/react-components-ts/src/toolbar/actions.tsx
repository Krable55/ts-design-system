import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AlignmentType, TextAlignment } from '../constants';


const propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.node,
    className: PropTypes.string,
};


interface ActionsProps {
    /** Align the actions to the left or right. defualts to left */
    align?: Extract<AlignmentType, 'left' | 'right' | TextAlignment.LEFT | TextAlignment.RIGHT>,
    children?: React.ReactNode | React.ReactNode[],
    className?: string,
}

const defaultProps: ActionsProps = {
    align: TextAlignment.LEFT,
    children: null,
    className: '',
};

const Actions = ({ align, children, className }: ActionsProps) => (
    <div
        className={classNames(
            'rc-toolbar-actions',
            `rc-toolbar-actions-${align}`,
            className,
        )}
    >
        {children}
    </div>
);

Actions.propTypes = propTypes;
Actions.defaultProps = defaultProps;

export default Actions;