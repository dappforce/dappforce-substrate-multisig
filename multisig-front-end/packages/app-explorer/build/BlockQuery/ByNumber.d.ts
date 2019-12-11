import { ApiProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Hash } from '@polkadot/types';
declare type Props = ApiProps & {
    chain_getBlockHash?: Hash;
    value: string;
};
declare const _default: React.ComponentType<Pick<Props, "value" | "chain_getBlockHash">>;
export default _default;
