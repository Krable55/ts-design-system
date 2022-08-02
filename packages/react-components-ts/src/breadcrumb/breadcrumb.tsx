import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BreadcrumbSection from './breadcrumbSection';
import Link from '../link';
import Icon from '../icon';
import { BreadcrumbType } from './types';

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
  children?: React.ReactNode | React.ReactNode[];
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
  type: 'standard',
  backLabel: 'Back',
};

const Breadcrumb = ({ children, className, type, backLabel, color, size, ...props }: BreadcrumbProps) => {
  let crumbs = React.Children.toArray(children);

  crumbs = crumbs.map((crumb, index) => {
    const active = index === crumbs.length - 1;

    return !React.isValidElement(crumb) ? crumb : React.cloneElement(crumb, { active });
  });

  return (
    <>
      {type === 'standard' ? (
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
            color="medium"
            size="tiny"
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
