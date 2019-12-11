import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    autoFocus?: boolean;
    children?: React.ReactNode;
    defaultValue?: any;
    isDisabled?: boolean;
    isError?: boolean;
    label?: string;
    name?: string;
    onChange: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
    tabIndex?: number;
    value: any;
    withLabel?: boolean;
};
declare type State = {
    isVisible: boolean;
};
export default class Password extends React.PureComponent<Props, State> {
    state: State;
    render(): JSX.Element;
    private onToggleVisible;
}
export {};
