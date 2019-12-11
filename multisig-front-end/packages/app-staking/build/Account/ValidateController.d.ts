import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { AccountId, Option, StakingLedger } from '@polkadot/types';
declare type Props = I18nProps & {
    accountId: string;
    controllerId: string;
    staking_bonded?: Option<AccountId>;
    staking_ledger?: Option<StakingLedger>;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "i18n" | "tReady" | "t" | "staking_ledger" | "controllerId" | "staking_bonded" | "accountId">, "style" | "className" | "staking_ledger" | "controllerId" | "staking_bonded" | "accountId">>;
export default _default;
