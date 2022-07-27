export const ButtonType = {
    BUTTON: 'button', 
    SUBMIT: 'submit', 
    RESET: 'reset'
} as const;

export type TypeOfButton = typeof ButtonType[keyof typeof ButtonType];