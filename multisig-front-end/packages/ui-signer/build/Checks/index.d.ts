import { I18nProps } from '@polkadot/ui-app/types';
import { DerivedFees, DerivedBalances } from '@polkadot/api-derive/types';
import { IExtrinsic } from '@polkadot/types/types';
import { ExtraFees } from './types';
import BN from 'bn.js';
import React from 'react';
declare type State = ExtraFees & {
    allFees: BN;
    allTotal: BN;
    allWarn: boolean;
    extMethod?: string;
    extSection?: string;
    hasAvailable: boolean;
    isRemovable: boolean;
    isReserved: boolean;
    overLimit: boolean;
};
declare type Props = I18nProps & {
    balances_fees?: DerivedFees;
    balances_votingBalance?: DerivedBalances;
    accountId?: string | null;
    extrinsic?: IExtrinsic | null;
    isSendable: boolean;
    onChange?: (hasAvailble: boolean) => void;
    system_accountNonce?: BN;
};
export declare class FeeDisplay extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ accountId, balances_votingBalance, extrinsic, balances_fees, system_accountNonce }: Props, prevState: State): State | null;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
    private renderProposal;
    private renderTransfer;
    private onExtraUpdate;
}
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "onChange" | "i18n" | "tReady" | "t" | "system_accountNonce" | "accountId" | "extrinsic" | "balances_votingBalance" | "balances_fees" | "isSendable">, "style" | "className" | "onChange" | "system_accountNonce" | "accountId" | "extrinsic" | "balances_votingBalance" | "balances_fees" | "isSendable">>;
export default _default;
