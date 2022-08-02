import React from 'react';
import { AnchorOrientation, AnchorOrientationType } from '../constants';

const unbindParentScroll = (element: React.ReactNode, onScroll: () => void) => {
  let parent = element?.['parentElement'];

  while (parent) {
    parent.removeEventListener('scroll', onScroll);

    parent = parent.parentElement;
  }
};

const bindParentScroll = (element: React.ReactNode, onScroll: () => void) => {
  let parent = element?.['parentElement'];

  while (parent) {
    parent.addEventListener('scroll', onScroll);

    parent = parent.parentElement;
  }
};

const isNodeInRoot = (node: React.ReactNode, root: React.ReactNode) => {
  let contains = false;

  if (root && root !== node) {
    contains = root['contains'](node);
  }

  return !!contains;
};

const getKey = (child: React.ReactElement<any>, idx: number | string) =>
  child?.key || String(idx);

const is = (constructor, value) =>
  (value != null && value.constructor === constructor) ||
  value instanceof constructor;

const shallowDiff = (objA, objB) => {
  if (is(Object, objA) && is(Object, objB)) {
    return (
      Object.entries(objA).some(([key, value]) => objB[key] !== value) ||
      Object.entries(objB).some(([key, value]) => objA[key] !== value)
    );
  }

  return objA === objB;
};

const mapObj = (obj, fn) => {
  const mappedObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    mappedObj[key] = fn(value);
  });

  return mappedObj;
};

const componentHasType = (component: React.ReactElement<any>, Type: string) =>
  component && component.type && component.type === Type;

const omit = <T extends Record<keyof T, any>, K extends keyof T>(
  keys: K[],
  object: T
) => {
  const keySet = new Set(keys);
  const newObject: Partial<T> = {};

  Object.keys(object)
    .filter(key => !keySet.has(key as K))
    .forEach(key => {
      newObject[key] = object[key];
    });

  return newObject;
};

/**
 * Getter method for nested values that won't NPE
 *
 * @exmaple path(['one', 'two'], { one: { two: 'hi' } }) => 'hi';
 * @exmaple path(['three', 'two'], { one: { two: 'hi' } }) => undefined;
 */
const path = <T extends Record<string, any>>(
  valuePath: string[],
  object: T
): T[keyof T] | undefined => {
  if (!object) {
    return undefined;
  }

  const [prop, ...rest] = valuePath;
  const nextObj = object[prop];

  if (!nextObj || !rest.length) {
    return nextObj;
  }

  return path(rest, object[prop]);
};

const getDropdownPosition = (
  target: HTMLElement | undefined | null,
  anchor: AnchorOrientationType | undefined | null,
  margin: number | undefined = 0
): undefined | React.CSSProperties => {
  if (
    typeof target === 'string' ||
    !target ||
    typeof target === 'number' ||
    typeof target === 'boolean'
  )
    return;
  const { width, height } = target.getBoundingClientRect();

  switch (anchor) {
    case AnchorOrientation.BottomRight: {
      return {
        top: height + margin,
        right: 0,
        minWidth: width,
      };
    }
    case AnchorOrientation.TopRight: {
      return {
        bottom: height + margin,
        right: 0,
        minWidth: width,
      };
    }
    case AnchorOrientation.TopLeft: {
      return {
        bottom: height + margin,
        left: 0,
        minWidth: width,
      };
    }
    default:
    case AnchorOrientation.BottomLeft: {
      return {
        top: height + margin,
        left: 0,
        minWidth: width,
      };
    }
  }
};

function isNil(val: any): val is null {
  return val == null;
}

/**
 * Immutably updates a value at a given index in an array
 */
export const update = (index: number, newValue: any, arr: any[]) => {
  const newArr = [...arr];

  newArr[index] = newValue;

  return newArr;
};

/**
 * Immutably updates a value at a given key in an object
 */
export const assoc = (prop, newValue, obj) => {
  const base = isNil(obj) ? {} : obj;

  return {
    ...base,
    [prop]: newValue,
  };
};

/**
 * Wrapper around the two previous methods with a type check.
 * will only assume type is an array of both value and target
 * are array-like
 */
const assocOrUpdate = (prop, newValue, object) => {
  if (Number.isInteger(prop) && Array.isArray(object)) {
    return update(prop, newValue, object);
  }

  return assoc(prop, newValue, object);
};

/**
 * Immutably sets the value at a given path in a nested object
 */
export const assocPath = (valuePath, newValue, object) => {
  if (!valuePath.length) {
    return newValue;
  }

  const [prop, ...rest] = valuePath;

  if (rest.length) {
    let nextObj;

    if (isNil(object) || !object[prop]) {
      nextObj = Number.isInteger(prop) ? [] : {};
    } else {
      nextObj = object[prop];
    }

    return assocOrUpdate(prop, assocPath(rest, newValue, nextObj), object);
  }

  return assocOrUpdate(prop, newValue, object);
};

const focus = element => {
  // Not type checking that it has a focus method, that's on you!
  if (element) {
    element.focus();
  }
};

const cancelEvent = e => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
};

export const isKeyModified = event => {
  return (
    event.getModifierState('Shift') ||
    event.getModifierState('Fn') ||
    event.getModifierState('Control') ||
    event.getModifierState('Alt') ||
    event.getModifierState('Meta') ||
    event.getModifierState('OS')
  );
};

export {
  unbindParentScroll,
  bindParentScroll,
  isNodeInRoot,
  getKey,
  shallowDiff,
  componentHasType,
  mapObj,
  omit,
  path,
  getDropdownPosition,
  isNil,
  focus,
  cancelEvent,
};

export default isNodeInRoot;
