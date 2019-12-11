import { AccountId } from '@polkadot/types';
import { I18nProps } from '@polkadot/ui-app/types';
import { OfflineStatus } from '@polkadot/app-staking/types';
import React from 'react';
declare type Props = I18nProps & {
    accountId: AccountId | string;
    offline: Array<OfflineStatus>;
    tooltip?: boolean;
    inline?: boolean;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "inline" | "tooltip" | "className" | "accountId" | "offline">>;
export default _default;
