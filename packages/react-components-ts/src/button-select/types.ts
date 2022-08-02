import { IOptionMenuItem } from "../helpers/customPropTypes";

export interface DropdownOption extends IOptionMenuItem {
    /** Optional alternate label rendered in the main button element if the option is selected. */
    selectedLabel?: string,
}