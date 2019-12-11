import { RpcMethod } from '@polkadot/jsonrpc/types';
import { DropdownOptions } from '../util/types';
import { BareProps } from '../types';
import React from 'react';
declare type Props = BareProps & {
    isError?: boolean;
    onChange: (value: RpcMethod) => void;
    options: DropdownOptions;
    value: RpcMethod;
};
export default class SelectMethod extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
