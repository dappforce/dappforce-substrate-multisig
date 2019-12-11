import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = I18nProps & {
    accountId: string;
    isOpen: boolean;
    onClose: () => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "isOpen" | "accountId">>;
export default _default;
