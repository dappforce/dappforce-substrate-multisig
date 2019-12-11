import { BareProps } from './types';
import BN from 'bn.js';
import React from 'react';
import { AccountId, AccountIndex, Address } from '@polkadot/types';
export declare type Props = BareProps & {
    bonded?: BN | Array<BN>;
    label?: string;
    params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
    withLabel?: boolean;
};
export default class BondedDisplay extends React.PureComponent<Props> {
    render(): JSX.Element | null;
    private renderProvided;
}
