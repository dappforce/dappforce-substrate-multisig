import { BareProps } from './types';
import BN from 'bn.js';
import React from 'react';
declare type Props = BareProps & {
    autoFocus?: boolean;
    defaultValue?: BN | string;
    help?: React.ReactNode;
    isDisabled?: boolean;
    isError?: boolean;
    label?: any;
    onChange?: (value?: BN) => void;
    placeholder?: string;
    value?: BN | string;
    withLabel?: boolean;
};
export default class InputBalance extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
