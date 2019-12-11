import { Props } from '../types';
import React from 'react';
declare type State$Param = {
    isValid: boolean;
    u8a: Uint8Array;
};
declare type State = {
    key: State$Param;
    value: State$Param;
};
export default class KeyValue extends React.PureComponent<Props, State> {
    state: State;
    render(): JSX.Element;
    static createParam(hex: string, length?: number): State$Param;
    nextState(newState: State): void;
    onChangeKey: (key: string) => void;
    onChangeValue: (value: string) => void;
}
export {};
