import { I18nProps } from './types';
import BN from 'bn.js';
import React from 'react';
import { AccountId, AccountIndex, Address } from '@polkadot/types';
export declare type Props = I18nProps & {
    accounts_idAndIndex?: [AccountId?, AccountIndex?];
    balance?: BN | Array<BN>;
    bonded?: BN | Array<BN>;
    children?: React.ReactNode;
    extraInfo?: React.ReactNode;
    name?: string;
    value: AccountId | AccountIndex | Address | string | null;
    showFaucet?: boolean;
    withBalance?: boolean;
    withBonded?: boolean;
    withIndex?: boolean;
    identIconSize?: number;
    isShort?: boolean;
    session_validators?: Array<AccountId>;
    withCopy?: boolean;
    withIcon?: boolean;
    withNonce?: boolean;
};
declare const DEFAULT_ADDR: string;
declare class AddressSummary extends React.PureComponent<Props> {
    render(): JSX.Element;
    protected renderAddress(): JSX.Element | null;
    protected renderAccountId(): JSX.Element | null;
    protected renderAccountIndex(): JSX.Element | null;
    protected renderBalance(): JSX.Element | null;
    protected renderBonded(): JSX.Element | null;
    protected renderIcon(className?: string, size?: number): JSX.Element | null;
    protected renderNonce(): JSX.Element | null;
    protected renderChildren(): JSX.Element | null;
}
export { DEFAULT_ADDR, AddressSummary };
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "balance" | "className" | "children" | "name" | "value" | "i18n" | "tReady" | "t" | "accounts_idAndIndex" | "bonded" | "session_validators" | "isShort" | "withBalance" | "withBonded" | "extraInfo" | "showFaucet" | "withIndex" | "identIconSize" | "withCopy" | "withIcon" | "withNonce">, "style" | "balance" | "className" | "children" | "name" | "value" | "accounts_idAndIndex" | "bonded" | "session_validators" | "isShort" | "withBalance" | "withBonded" | "extraInfo" | "showFaucet" | "withIndex" | "identIconSize" | "withCopy" | "withIcon" | "withNonce">>;
export default _default;
