import { DerivedFees } from '@polkadot/api-derive/types';
import { I18nProps } from '@polkadot/ui-app/types';
import { ExtraFees } from './types';
import BN from 'bn.js';
import React from 'react';
import { Compact } from '@polkadot/types';
declare type Props = I18nProps & {
    deposit: BN | Compact;
    fees: DerivedFees;
    democracy_minimumDeposit?: BN;
    onChange: (fees: ExtraFees) => void;
};
declare type State = ExtraFees & {
    isBelowMinimum: boolean;
};
export declare class Proposal extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ deposit, democracy_minimumDeposit, onChange }: Props): State;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
