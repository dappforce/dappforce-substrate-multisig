import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { AccountId, AccountIndex } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    accounts_idAndIndex?: [AccountId?, AccountIndex?];
};
export declare class AccountIndexDisplay extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
