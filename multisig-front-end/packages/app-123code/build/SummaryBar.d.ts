import { ApiProps } from '@polkadot/ui-api/types';
import { BareProps, I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
import { AccountId, RuntimeVersion } from '@polkadot/types';
declare type Props = ApiProps & BareProps & I18nProps & {
    balances_totalIssuance?: BN;
    chain_bestNumber?: BN;
    chain_bestNumberLag?: BN;
    chain_getRuntimeVersion?: RuntimeVersion;
    session_validators?: Array<AccountId>;
    staking_intentions?: Array<AccountId>;
    system_chain?: string;
    system_name?: string;
    system_version?: string;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "i18n" | "tReady" | "t" | "chain_bestNumber" | "system_chain" | "system_name" | "system_version" | "session_validators" | "staking_intentions" | "balances_totalIssuance" | "chain_bestNumberLag" | "chain_getRuntimeVersion">, "style" | "className" | "chain_bestNumber" | "system_chain" | "system_name" | "system_version" | "session_validators" | "staking_intentions" | "balances_totalIssuance" | "chain_bestNumberLag" | "chain_getRuntimeVersion">>;
export default _default;
