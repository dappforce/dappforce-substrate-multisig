import { KeyringOptions, KeyringSectionOption, KeyringOption$Type } from '@polkadot/ui-keyring/options/types';
import { BareProps } from '../types';
import './InputAddress.css';
import React from 'react';
declare type Props = BareProps & {
    defaultValue?: string | null;
    help?: React.ReactNode;
    hideAddress?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    isInput?: boolean;
    isMultiple?: boolean;
    label?: string;
    onChange?: (value: string | null) => void;
    onChangeMulti?: (value: Array<string>) => void;
    options?: Array<KeyringSectionOption>;
    optionsAll?: KeyringOptions;
    placeholder?: string;
    type?: KeyringOption$Type;
    value?: string | Uint8Array | Array<string>;
    withLabel?: boolean;
};
declare type State = {
    value?: string;
};
declare class InputAddress extends React.PureComponent<Props, State> {
    state: State;
    static contextType: React.Context<import("../../../df-utils/src/MyAccountContext").MyAccountContextProps>;
    static getDerivedStateFromProps({ value }: Props): State | null;
    static readOptions(): any;
    static getLastValue(type?: KeyringOption$Type): any;
    static setLastValue(type: "address" | "all" | "account" | "recent" | "testing" | undefined, value: string): void;
    render(): JSX.Element | null;
    private renderLabel;
    private getLastOptionValue;
    private hasValue;
    private onChange;
    private onChangeMulti;
    private onSearch;
}
export { InputAddress };
declare const _default: React.ComponentType<any>;
export default _default;
