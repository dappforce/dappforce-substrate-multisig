import { I18nProps } from '@polkadot/ui-app/types';
import { KeyringSectionOption } from '@polkadot/ui-keyring/options/types';
import React from 'react';
import { AccountId } from '@polkadot/types';
declare type Props = I18nProps & {
    accountId: string;
    isOpen: boolean;
    onClose: () => void;
    stashId: AccountId;
    stashOptions: Array<KeyringSectionOption>;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "isOpen" | "accountId" | "stashId" | "stashOptions">>;
export default _default;
