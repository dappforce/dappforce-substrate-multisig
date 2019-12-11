import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
declare type Props = I18nProps & {
    defaultValue?: string | null;
    isError?: boolean;
    onChange: (accountId: string | undefined | null, accountNonce: BN) => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "defaultValue" | "className" | "onChange" | "isError">>;
export default _default;
