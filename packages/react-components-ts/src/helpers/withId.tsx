import React, { ComponentType, Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = <T extends unknown>(comp: ComponentType<T>) =>
  comp.displayName || comp.name || 'Component';

let idCount = 0;

const getId = () => {
  idCount += 1;

  return `rcid-${idCount}`;
};

/**
 * Higher order component that generates a unique id
 */
const withId = <T extends unknown>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const displayName = getDisplayName(WrappedComponent);

  class ComponentWithId extends Component<T> {
    id: string;
    constructor(props: T | Readonly<T>) {
      super(props);

      this.id = getId();
    }

    render() {
      return <WrappedComponent id={this.id} {...this.props} />;
    }
  }

  (ComponentWithId as ComponentType<T>).displayName = displayName;

  hoistStatics(ComponentWithId, WrappedComponent);

  return ComponentWithId;
};

export default withId;
