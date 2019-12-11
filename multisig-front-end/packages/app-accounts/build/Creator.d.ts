import { I18nProps } from '@polkadot/ui-app/types';
import { KeypairType } from '@polkadot/util-crypto/types';
import { ComponentProps } from './types';
import React from 'react';
declare type Props = ComponentProps & I18nProps & {
    match: {
        params: {
            seed?: string;
        };
    };
};
export declare function addressFromSeed(phrase: string, derivePath: string, pairType: KeypairType): string;
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "location" | "basePath" | "onStatusChange" | "match">>;
export default _default;
