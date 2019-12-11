import { DerivedBalancesMap } from '@polkadot/api-derive/types';
import { I18nProps } from '@polkadot/ui-app/types';
import { RecentlyOfflineMap } from '../types';
import React from 'react';
declare type Props = I18nProps & {
    balances: DerivedBalancesMap;
    current: Array<string>;
    lastAuthor?: string;
    lastBlock: string;
    next: Array<string>;
    recentlyOffline: RecentlyOfflineMap;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "current" | "balances" | "recentlyOffline" | "lastAuthor" | "lastBlock" | "next">>;
export default _default;
