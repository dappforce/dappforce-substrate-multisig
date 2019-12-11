import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
import { Proposal } from '@polkadot/types';
declare type Props = I18nProps & {
    children?: React.ReactNode;
    proposal: Proposal;
    proposalExtra?: React.ReactNode;
    idNumber: BN | number;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "children" | "proposal" | "proposalExtra" | "idNumber">>;
export default _default;
