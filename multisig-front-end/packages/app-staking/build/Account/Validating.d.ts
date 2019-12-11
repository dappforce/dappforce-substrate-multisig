import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { AccountId, ValidatorPrefs } from '@polkadot/types';
declare type Props = I18nProps & {
    accountId: string;
    isOpen: boolean;
    onClose: () => void;
    preferences: ValidatorPrefs;
    stashId: AccountId;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "isOpen" | "accountId" | "stashId" | "preferences">>;
export default _default;
