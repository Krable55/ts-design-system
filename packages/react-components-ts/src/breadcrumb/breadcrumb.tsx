import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BreadcrumbSection, { BreadcrumbSectionProps } from './breadcrumbSection';
import Link from '../link';
import Icon from '../icon';
import { TextColor, TextSize, BreadcrumbType, BreadcrumbVariant } from '../constants';

const propTypes = {
  /** The BreadcrumbSections to render */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional additional inline styles */
  style: PropTypes.shape({}),
  /** Main visual variant */
  type: PropTypes.oneOf(['standard', 'back']),
  /** Text rendered when type equals back */
  backLabel: PropTypes.string,
};

export interface BreadcrumbProps extends Omit<React.HTMLProps<HTMLElement>, 'type' | 'backLabel'> {
  /** The BreadcrumbSections to render */
  children?:
  | React.ReactElement<BreadcrumbSectionProps>
  | React.ReactNode
  | Array<React.ReactElement<BreadcrumbSectionProps> | React.ReactNode>;
  /** Optional additional classnames */
  className?: string,
  /** Optional additional inline styles */
  style?: CSSProperties,
  /** Main visual variant */
  type?: BreadcrumbType,
  /** Text rendered when type equals back */
  backLabel?: string,
}

const defaultProps: BreadcrumbProps = {
  children: undefined,
  className: '',
  style: {},
  type: BreadcrumbVariant.STANDARD,
  backLabel: 'Back',
};


const Breadcrumb = ({ children, className, type, backLabel, color, size, ...props }: BreadcrumbProps) => {
  const crumbArray = React.Children.toArray(children)
    .filter(c => !!c);

  const crumbs = crumbArray?.map((crumb, index) => {
    // Check if child is a BreadcrumbSection (Unfourtunaelty, this is the only way I know how to check the types and its ugly);
    if (React.isValidElement(crumb) &&
      (crumb as React.ReactElement<any>).type === BreadcrumbSection) {
      const active = index === crumbArray?.length - 1;
      return React.cloneElement(crumb, {
        ...crumb.props,
        active
      });
    }
    return crumb;
  });

  return (
    <>
      {type === BreadcrumbVariant.STANDARD ? (
        <nav
          aria-label="Breadcrumb"
          className={classNames('rc-breadcrumb', className)}
          color={color}
          {...props}
        >
          <ol>{crumbs}</ol>
        </nav>
      ) : (
        <div
          className={classNames('rc-breadcrumb', className)}
          aria-label="Breadcrumb"
        >
          <Icon type="chevron-left" aria-hidden="true" />
          <Link
            color={TextColor.MEDIUM}
            size={TextSize.TINY}
            className="rc-breadcrumb-section"
            tabIndex={0}
            {...props}
          >
            {backLabel}
          </Link>
        </div>
      )}
    </>
  );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
