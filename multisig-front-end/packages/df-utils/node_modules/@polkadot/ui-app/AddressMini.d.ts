import { BareProps } from './types';
import BN from 'bn.js';
import React from 'react';
import { AccountId, AccountIndex, Address } from '@polkadot/types';
import { OfflineStatus } from '@polkadot/app-staking/types';
declare type Props = BareProps & {
    balance?: BN | Array<BN>;
    bonded?: BN | Array<BN>;
    children?: React.ReactNode;
    isPadded?: boolean;
    isShort?: boolean;
    value?: AccountId | AccountIndex | Address | string;
    offlineStatus?: Array<OfflineStatus>;
    withAddress?: boolean;
    withBalance?: boolean;
    withBonded?: boolean;
};
export default class AddressMini extends React.PureComponent<Props> {
    render(): JSX.Element | null;
    private renderAddressOrName;
    private renderBalance;
    private renderBonded;
    private renderOfflineStatus;
}
export {};
