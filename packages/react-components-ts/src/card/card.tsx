import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { elementElevation } from '../helpers/customPropTypes';
import filterDescendants from '../helpers/filterDescendants';

import CardActionSelect from './cardActionSelect';
import CardAction from './cardAction';
import CardTitle from './cardTitle';
import { ElementElevation, Variant, VariantType } from '../constants';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Main visual variant */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Card 'elevation' visually indicated with box-shadow */
  elevation: elementElevation,
  /** Turns on selectability including hover styling */
  selectable: PropTypes.bool,
  /** Is this card currently selected */
  selected: PropTypes.bool,
  /** Optional additional className */
  className: PropTypes.string,
  /** Component children */
  children: PropTypes.node,
  /** Click handler. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  onClick: PropTypes.func,
};

export interface CardProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'as'> {
  /** Html element or react component to render */
  as?: React.ElementType<any>,
  /** Main visual variant */
  type?: Extract<VariantType, 'primary' | 'secondary' | Variant.PRIMARY | Variant.SECONDARY>,
  /** Card 'elevation' visually indicated with box-shadow */
  elevation?: ElementElevation,
  /** Turns on selectability including hover styling */
  selectable?: boolean,
  /** Is this card currently selected */
  selected?: boolean,
  /** Optional additional className */
  className?: string,
  /** Component children */
  children?: React.ReactNode | React.ReactNode[],
}
const defaultProps: CardProps = {
  as: undefined,
  type: Variant.PRIMARY,
  elevation: 0,
  selectable: false,
  selected: false,
  className: '',
  children: null,
  onClick() { },
};

const assignDefaultElement = (as, selectable) =>
  as || (selectable ? 'button' : 'div');

const Card = ({
  as,
  type,
  elevation,
  selectable,
  selected,
  className,
  children,
  ...rest
}: CardProps) => {
  const Element = assignDefaultElement(as, selectable);
  const {
    pluckedDescendants: title,
    otherDescendants: filteredDescendants,
  } = filterDescendants({ children, components: CardTitle });
  const { pluckedDescendants: actions, otherDescendants } = filterDescendants({
    children: filteredDescendants,
    components: [CardAction, CardActionSelect],
  });
  const hasTitle = title?.length ?? 0 > 0;
  const hasActions = actions?.length ?? 0 > 0;

  return (
    <Element
      className={classNames(
        'rc-card',
        `rc-card-${type}`,
        `rc-card-elevation-${elevation}`,
        {
          'rc-card-selectable': selectable,
          'rc-card-selected': selected,
        },
        className,
      )}
      aria-current={selected || null}
      {...rest}
    >
      {(hasTitle || hasActions) && (
        <div className="rc-card-header">
          {title}
          {actions}
        </div>
      )}
      {otherDescendants}
    </Element>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.ActionSelect = CardActionSelect;
Card.Action = CardAction;
Card.Title = CardTitle;

export default Card;
