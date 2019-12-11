import { BareProps, BitLength, I18nProps } from './types';
import BN from 'bn.js';
import React from 'react';
declare type Props = BareProps & I18nProps & {
    autoFocus?: boolean;
    bitLength?: BitLength;
    defaultValue?: BN | string;
    help?: React.ReactNode;
    isDisabled?: boolean;
    isError?: boolean;
    isSi?: boolean;
    isDecimal?: boolean;
    label?: any;
    maxLength?: number;
    onChange?: (value?: BN) => void;
    placeholder?: string;
    value?: BN | string;
    withLabel?: boolean;
};
declare type State = {
    isPreKeyDown: boolean;
    isValid: boolean;
    siOptions: Array<{
        value: string;
        text: string;
    }>;
    siUnit: string;
    value: string;
    valueBN: BN;
};
declare class InputNumber extends React.PureComponent<Props, State> {
    constructor(props: Props);
    static units: string;
    static setUnit(units?: string): void;
    static getDerivedStateFromProps({ isDisabled, isSi, defaultValue }: Props): Partial<State> | null;
    render(): JSX.Element;
    private renderSiDropdown;
    private maxValue;
    private isValidBitLength;
    private isValidNumber;
    private regex;
    private onChange;
    private onKeyDown;
    private onKeyUp;
    private onPaste;
    private selectSiUnit;
    private inputValueToBn;
    private bnToInputValue;
}
export { InputNumber };
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "help" | "defaultValue" | "className" | "placeholder" | "onChange" | "withLabel" | "isDisabled" | "isError" | "value" | "autoFocus" | "maxLength" | "bitLength" | "isSi" | "isDecimal">>;
export default _default;
