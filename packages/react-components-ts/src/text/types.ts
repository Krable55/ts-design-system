
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