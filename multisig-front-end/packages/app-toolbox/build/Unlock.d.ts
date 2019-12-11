import { I18nProps } from '@polkadot/ui-app/types';
import { KeyringPair } from '@polkadot/keyring/types';
import React from 'react';
declare type Props = I18nProps & {
    onClose: () => void;
    pair: KeyringPair | null;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "pair">>;
export default _default;
