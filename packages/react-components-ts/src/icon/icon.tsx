import React from 'react';
import classnames from 'classnames';
import { ICON_CONFIG, Sizes, SizeType } from '../constants';
import icons, { Icons, IconType } from './types';

// import './icon.scss';
// These are defined here so they render in the styleguide props list
const AVAILABLE_SIZES = Object.values(Sizes);
const AVAILABLE_ICONS = Object.values(Icons);

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'onClick' | 'type'> {
  /** Choose your icon */
  type?: IconType | null;
  /** Optional choose your size */
  size?: SizeType;
  /** Or pass in your own svg... */
  svg?: JSX.Element;
  /** ...and viewbox */
  viewBox?: string;
  /** Optional add additional classes */
  className?: string;
  /** Optional add additional inline styles */
  style?: React.CSSProperties;
  /** Optional add an onClick handler */
  onClick?: (e?: React.MouseEvent<SVGSVGElement>) => void;
}

const Icon = (props: IconProps) => {
  const {
    className = '',
    type,
    size = Sizes.MEDIUM,
    svg: propsSvg,
    viewBox: propsViewBox,
    style = {},
    onClick,
    ...rest
  } = props;

  let svg = propsSvg;
  let viewBox = propsViewBox;
  const icon = type ? icons[type] : null;

  // Let's define the svg and viewbox if not passed in as props
  if (!svg && icon) {
    const getScaledIcon = variant => icon[variant];
    const scaledIcon = getScaledIcon(size);

    const defineElements = (element, variant) => {
      svg = element;
      viewBox = viewBox || ICON_CONFIG[variant].viewBox;
    };

    if (scaledIcon) {
      // If a unique svg exists for the size requested, let's use it
      defineElements(scaledIcon, size);
    } else {
      // Else if there isn't a unique svg for the size,
      // let's scale down the next largest svg,
      // or if unavailable, scale up the next smallest svg

      const index = AVAILABLE_SIZES.indexOf(size as Sizes);
      const largerSizes = AVAILABLE_SIZES.slice(0, index).reverse();
      const smallerSizes = AVAILABLE_SIZES.slice(index + 1);

      let closestSize = largerSizes.find(alt => getScaledIcon(alt));
      closestSize = closestSize || smallerSizes.find(alt => getScaledIcon(alt));
      const closestIcon = getScaledIcon(closestSize);

      defineElements(closestIcon, closestSize);
    }
  }

  if (svg) {
    const classNames = classnames('rc-icon', `rc-icon-${type}`, className);

    return (
      <svg
        onClick={onClick}
        width={ICON_CONFIG[size].size}
        height={ICON_CONFIG[size].size}
        className={classNames}
        viewBox={viewBox}
        style={{
          width: ICON_CONFIG[size].size,
          height: ICON_CONFIG[size].size,
          ...style,
        }}
        {...rest}
      >
        {svg}
      </svg>
    );
  }

  return null;
};

Icon.AVAILABLE_SIZES = AVAILABLE_SIZES;
Icon.AVAILABLE_ICONS = AVAILABLE_ICONS;

export default Icon;
