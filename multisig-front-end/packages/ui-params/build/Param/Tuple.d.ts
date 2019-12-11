import { TypeDef } from '@polkadot/types';
import { Props, RawParam } from '../types';
import React from 'react';
declare type State = {
    Components: Array<React.ComponentType<Props>>;
    sub: Array<string>;
    subTypes: Array<TypeDef>;
    type?: string;
    values: Array<RawParam>;
};
export default class Tuple extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ defaultValue: { value }, type: { sub, type } }: Props, prevState: State): Partial<State> | null;
    render(): JSX.Element;
    private onChange;
}
export {};
