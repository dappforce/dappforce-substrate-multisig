import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { AccountId } from '@polkadot/types';
declare type Props = I18nProps & {
    accountId: string;
    controllerId?: AccountId | null;
    isOpen: boolean;
    onClose: () => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "controllerId" | "isOpen" | "accountId">>;
export default _default;
