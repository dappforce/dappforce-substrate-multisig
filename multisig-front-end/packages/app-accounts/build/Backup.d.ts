import { KeyringPair } from '@polkadot/keyring/types';
import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { ActionStatus } from '@polkadot/ui-app/Status/types';
declare type Props = I18nProps & {
    onStatusChange: (status: ActionStatus) => void;
    onClose: () => void;
    pair: KeyringPair;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "onStatusChange" | "pair">>;
export default _default;
