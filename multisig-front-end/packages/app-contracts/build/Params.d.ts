import { ContractABIArgs } from '@polkadot/types/ContractAbi';
import React from 'react';
import { TypeDef } from '@polkadot/types';
declare type Props = {
    params?: ContractABIArgs;
    onChange: (values: Array<any>) => void;
};
declare type State = {
    params: Array<{
        name: string;
        type: TypeDef;
    }>;
};
export default class Params extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ params }: Props): State | null;
    render(): JSX.Element | null;
    private onChange;
}
export {};
