import { RpcMethod } from '@polkadot/jsonrpc/types';
import { DropdownOptions } from '../util/types';
import { BareProps } from '../types';
import React from 'react';
declare type Props = BareProps & {
    defaultValue?: string;
    isError?: boolean;
    onChange: (value: string) => void;
    options: DropdownOptions;
    value: RpcMethod;
};
export default class SelectSection extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
