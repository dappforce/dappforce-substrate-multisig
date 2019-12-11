import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = I18nProps & {
    isOpen: boolean;
    onClose: () => void;
    doForget: () => void;
    currentAddress: KeyringAddress | null;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "isOpen" | "doForget" | "currentAddress">>;
export default _default;
