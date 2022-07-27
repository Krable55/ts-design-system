import React, { Component, ComponentType } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = <T extends unknown>(comp: ComponentType<T>) =>
  comp.displayName || comp.name || 'Component';

/**
 * Higher order component that displays a deprecation message upon mount
 * of a given component when rendered in development
 *
 * @example
 *  deprecate('The Panel component is deprecated and will be removed in version 5.0.0. Please replace with <Card />')(Panel);
 *
 * @param  {String} message Deprecation message
 */
const deprecate = (message: string) => <T extends unknown>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  /**
   * Don't wrap if not in development
   */
  if (process.env.NODE_ENV !== 'development') {
    return WrappedComponent;
  }

  const displayName = getDisplayName(WrappedComponent);

  class DeprecatedComponent extends Component<T> {
    componentDidMount() {
      /* eslint-disable no-console */
      console.warn(message);
      /* eslint-enable */
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  (DeprecatedComponent as ComponentType<T>).displayName = displayName;

  hoistStatics(DeprecatedComponent, WrappedComponent);

  return DeprecatedComponent;
};

export default deprecate;
