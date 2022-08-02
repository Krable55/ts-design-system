export const ANIMATION_TIMING = 200 as const;

export const ENTER_KEY_CODE = 13 as const;
export const BACK_KEY_CODE = 8 as const;
export const TAB_KEY_CODE = 9 as const;
export const ESC_KEY_CODE = 27 as const;
export const LEFT_KEY_CODE = 37 as const;
export const RIGHT_KEY_CODE = 39 as const;
export const UP_KEY_CODE = 38 as const;
export const DOWN_KEY_CODE = 40 as const;
export const END_KEY_CODE = 35 as const;
export const HOME_KEY_CODE = 36 as const;
export const SPACE_KEY_CODE = 32 as const;

export const KeyCode = {
  ENTER: 13,
  BACK: 8,
  TAB: 9,
  ESC: 27,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  END: 35,
  HOME: 36,
  SPACE: 32,
} as const;

export type KeyCodeType = typeof KeyCode[keyof typeof KeyCode];

export const SIDEBAR_SUBSECTION_TRUNC_LENGTH = 6 as const;

type EnumOrValue<T extends string | number | symbol> =
  | T
  | Record<T, string>[keyof Record<T, string>];

/** Optional prop to change the size of fonts, icons, etc. */
export type SizeType = EnumOrValue<Sizes>;

export enum Sizes {
  GIANT = 'giant',
  HUGE = 'huge',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  TINY = 'tiny',
}
/** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
export type Weight = 'bold' | 'subtle';

/** Main visual variant */
export type VisualType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'transparent'
  | 'text';

/** Main color variant */
export type ColorType = 'danger' | 'info' | 'neutral' | 'success' | 'warning'
/**z-index elevations */
export type ElementElevation = 0 | 50 | 100 | 150 | 200 | 400 | 800;

/** Anchor orientation for menus */
export enum AnchorOrientation {
  BottomRight = 'bottom right',
  TopRight = 'top right',
  TopLeft = 'top left',
  BottomLeft = 'bottom left',
}
export type AnchorOrientationType = 'bottom right' | 'top right' | 'top left' | 'bottom left' | AnchorOrientation;
export type FilterOperator = {
  symbol: string;
  label: string;
  noValue?: boolean;
  sentence: string;
};

export const filterOperators: FilterOperator[] = [
  { symbol: '=', label: 'Equals', sentence: 'is equal to' },
  { symbol: '!=', label: "Doesn't equal", sentence: 'does not equal' },
  { symbol: '=~', label: 'Contains', sentence: 'contains' },
  {
    symbol: '!~',
    label: "Doesn't contain",
    sentence: 'does not contain',
  },
  { symbol: '>', label: 'Greater than', sentence: 'is greater than' },
  { symbol: '<', label: 'Less than', sentence: 'is less than' },
  {
    symbol: '>=',
    label: 'Greater than or equal to',
    sentence: 'is greater than or equal to',
  },
  {
    symbol: '<=',
    label: 'Less than or equal to',
    sentence: 'is less chan or equal to',
  },
  {
    symbol: 'null',
    label: 'Is null',
    noValue: true,
    sentence: 'is null',
  },
  {
    symbol: 'notNull',
    label: 'Is not null',
    noValue: true,
    sentence: 'is not null',
  },
];

// Icons
export enum IconSize {
  TINY = '8px',
  SMALL = '12px',
  MEDIM = '16px',
  LARGE = '24px',
  HUGE = '32px',
  GIANT = '48px',
}
export type IconSizeType =
  | '8px'
  | '12px'
  | '16px'
  | '24px'
  | '32px'
  | '48px'
  | string
  | IconSize;

export type CSSHeightAndWidth = {
  height: string | number;
  width: string | number;
}

export type IconSetting = {
  size: IconSize;
  viewBox: string;
};

const tinyIcon: IconSetting = {
  size: IconSize.TINY,
  viewBox: '0 0 8 8',
};

const smallIcon: IconSetting = {
  size: IconSize.SMALL,
  viewBox: '0 0 12 12',
};

const mediumIcon: IconSetting = {
  size: IconSize.MEDIM,
  viewBox: '0 0 16 16',
};

const largeIcon: IconSetting = {
  size: IconSize.LARGE,
  viewBox: '0 0 24 24',
};

const hugeIcon: IconSetting = {
  size: IconSize.HUGE,
  viewBox: '0 0 32 32',
};

const giantIcon: IconSetting = {
  size: IconSize.GIANT,
  viewBox: '0 0 48 48',
};

export const ICON_CONFIG = {
  tiny: tinyIcon,
  small: smallIcon,
  medium: mediumIcon,
  large: largeIcon,
  huge: hugeIcon,
  giant: giantIcon,
};

export const STEPPER_STATES = {
  active: 'active',
  incomplete: 'incomplete',
  complete: 'complete',
};
