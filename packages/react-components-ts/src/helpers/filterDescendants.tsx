import React, { Children, cloneElement, isValidElement } from 'react';

/**
 * Given `children` (and their nested descendants) and `components`, return the
 * plucked descendants that are instances of any of the given `components` as
 * well as the other descendants in the original nested structure (minus plucked
 * descendants).
 *
 * @param {{children: Array|ReactNode, components: ReactElement|ReactElement[]}} parameters
 * @returns {{pluckedDescendants: Array, otherDescendants: Array}} descendants
 */
export type PluckedDescendants = {
  pluckedDescendants?: React.ReactNode[];
  otherDescendants?: React.ReactNode[];
};
export interface IFilterDescendantsParameters {
  children: React.ReactNode | React.ReactNode[];
  components: React.ReactElement | React.ReactElement[];
}
type Decendant =
  | string
  | number
  | React.ReactElement
  | React.ReactFragment
  | React.ReactPortal;
const filterDescendants = ({
  children,
  components: component,
}: IFilterDescendantsParameters): PluckedDescendants => {
  let pluckedDescendants: Decendant[] = [];
  const otherDescendants: Decendant[] = [];
  const components = Array.isArray(component) ? component : [component];

  Children.toArray(children).forEach(child => {
    if (child['type'] && components.some(type => child['type'] === type)) {
      pluckedDescendants.push(child);
    } else if (child['props'] && child['props']?.children) {
      const {
        pluckedDescendants: nestedPluckedDescendants,
        otherDescendants: nestedOtherDescendants,
      } = filterDescendants({ children: child['props']?.children, components });

      if (nestedPluckedDescendants?.length || 0 > 0) {
        pluckedDescendants = pluckedDescendants.concat(
          nestedPluckedDescendants ?? []
        );
      }

      const childWithoutPluckedDescendants = isValidElement(child)
        ? cloneElement(child, {}, nestedOtherDescendants)
        : undefined;

      !!childWithoutPluckedDescendants &&
        otherDescendants.push(childWithoutPluckedDescendants);
    } else {
      otherDescendants.push(child);
    }
  });

  return { pluckedDescendants, otherDescendants };
};

export default filterDescendants;
