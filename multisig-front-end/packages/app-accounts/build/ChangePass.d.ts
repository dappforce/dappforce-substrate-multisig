import { KeyringPair } from '@polkadot/keyring/types';
import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { ActionStatus } from '@polkadot/ui-app/Status/types';
declare type Props = I18nProps & {
    account: KeyringPair;
    onClose: () => void;
    onStatusChange: (status: ActionStatus) => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onClose" | "account" | "onStatusChange">>;
export default _default;
