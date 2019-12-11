import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Balance } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    balances_freeBalance?: Balance;
};
export declare class BalanceDisplay extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
