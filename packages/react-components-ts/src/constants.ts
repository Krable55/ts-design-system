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

export enum KeyCode {
  ENTER = 13,
  BACK = 8,
  TAB = 9,
  ESC = 27,
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
  END = 35,
  HOME = 36,
  SPACE = 32,
};

export enum Size {
  GIANT = 'giant',
  HUGE = 'huge',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  TINY = 'tiny',
}

export enum Alert {
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export type AlertType =
  | 'danger'
  | 'info'
  | 'success'
  | 'warning'
  | Alert;

export enum BreadcrumbVariant {
  STANDARD = 'standard',
  BACK = 'back'
}

export type BreadcrumbType = 'standard' | 'back' | BreadcrumbVariant;

export enum ButtonVariant {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
};

export type ButtonType = 'button' | 'submit' | 'reset' | ButtonVariant;

export type KeyCodeType = typeof KeyCode[keyof typeof KeyCode];

export const SIDEBAR_SUBSECTION_TRUNC_LENGTH = 6 as const;

/** Optional prop to change the size of fonts, icons, etc. */
export type SizeType =
  | 'giant'
  | 'huge'
  | 'large'
  | 'medium'
  | 'small'
  | 'tiny'
  | Size;

/** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
export enum Weight {
  BOLD = 'bold',
  SUBTLE = 'subtle',
}

export type WeightType =
  | 'bold'
  | 'subtle'
  | Weight;

/** Main visual variant */
export enum Variant {
  DANGER = 'danger',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  TEXT = 'text',
  TRANSPARENT = 'transparent',
}
export type VariantType =
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'text'
  | 'transparent'
  | Variant;

/** Main color variant */
export enum Color {
  DANGER = 'danger',
  INFO = 'info',
  NEUTRAL = 'neutral',
  SUCCESS = 'success',
  WARNING = 'warning',
}
export type ColorType =
  | 'danger'
  | 'info'
  | 'neutral'
  | 'success'
  | 'warning'
  | Color;

/**z-index elevations */
export type ElementElevation = 0 | 50 | 100 | 150 | 200 | 400 | 800;

/** Anchor orientation for menus */
export enum AnchorOrientation {
  BOTTOM_LEFT = 'bottom left',
  BOTTOM_RIGHT = 'bottom right',
  TOP_LEFT = 'top left',
  TOP_RIGHT = 'top right',
}
export type AnchorOrientationType =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'
  | AnchorOrientation;

/** Alignment for text etc */
export enum TextAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}
export type AlignmentType = 'left' | 'center' | 'right' | 'justify' | TextAlignment;

export interface FilterOperator {
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

export enum Headings {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export type HeadingType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | Headings;

// Icons
export enum IconPixelSize {
  TINY = '8px',
  SMALL = '12px',
  MEDIM = '16px',
  LARGE = '24px',
  HUGE = '32px',
  GIANT = '48px',
}
export type IconPixelSizeType =
  | '8px'
  | '12px'
  | '16px'
  | '24px'
  | '32px'
  | '48px'
  // | string
  | IconPixelSize;

export type CSSHeightAndWidth = {
  height: string | number;
  width: string | number;
}

export type IconSetting = {
  size: IconPixelSize;
  viewBox: string;
};

const tinyIcon: IconSetting = {
  size: IconPixelSize.TINY,
  viewBox: '0 0 8 8',
};

const smallIcon: IconSetting = {
  size: IconPixelSize.SMALL,
  viewBox: '0 0 12 12',
};

const mediumIcon: IconSetting = {
  size: IconPixelSize.MEDIM,
  viewBox: '0 0 16 16',
};

const largeIcon: IconSetting = {
  size: IconPixelSize.LARGE,
  viewBox: '0 0 24 24',
};

const hugeIcon: IconSetting = {
  size: IconPixelSize.HUGE,
  viewBox: '0 0 32 32',
};

const giantIcon: IconSetting = {
  size: IconPixelSize.GIANT,
  viewBox: '0 0 48 48',
};

export type IconConfig = {
  [key in Size]: IconSetting;
}

export const ICON_CONFIG: IconConfig = {
  tiny: tinyIcon,
  small: smallIcon,
  medium: mediumIcon,
  large: largeIcon,
  huge: hugeIcon,
  giant: giantIcon,
};

export enum StepperState {
  ACTIVE = 'active',
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
}

export type StepperStateType =
  | 'active'
  | 'complete'
  | 'incomplete'
  | StepperState;

export enum TextSize {
  MEDIUM = 'medium',
  SMALL = 'small',
  TINY = 'tiny',
}
export type TextSizeType =
  | 'tiny'
  | 'small'
  | 'medium'
  | TextSize;

export enum TextColor {
  DANGER = 'danger',
  MEDIUM = 'medium',
  SUBTLE = 'subtle',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export type TextColorType =
  | 'danger'
  | 'medium'
  | 'subtle'
  | 'success'
  | 'warning'
  | TextColor;