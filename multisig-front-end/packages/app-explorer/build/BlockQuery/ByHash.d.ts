import { I18nProps } from '@polkadot/ui-app/types';
import { ApiProps } from '@polkadot/ui-api/types';
import React from 'react';
import { EventRecord, HeaderExtended, SignedBlock } from '@polkadot/types';
declare type Props = ApiProps & I18nProps & {
    system_events?: Array<EventRecord>;
    chain_getBlock?: SignedBlock;
    chain_getHeader?: HeaderExtended;
    value: string;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "value" | "i18n" | "tReady" | "t" | "system_events" | "chain_getBlock" | "chain_getHeader">, "style" | "className" | "value" | "system_events" | "chain_getBlock" | "chain_getHeader">>;
export default _default;
