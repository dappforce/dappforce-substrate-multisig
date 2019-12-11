import { DerivedBalances, DerivedFees } from '@polkadot/api-derive/types';
import { I18nProps } from '@polkadot/ui-app/types';
import { ExtraFees } from './types';
import BN from 'bn.js';
import React from 'react';
import { Compact } from '@polkadot/types';
declare type Props = I18nProps & {
    amount: BN | Compact;
    fees: DerivedFees;
    balances_votingBalance?: DerivedBalances;
    recipientId: string;
    onChange: (fees: ExtraFees) => void;
};
declare type State = ExtraFees & {
    isCreation: boolean;
    isNoEffect: boolean;
};
export declare class Transfer extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ amount, balances_votingBalance, fees, onChange }: Props): State;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
