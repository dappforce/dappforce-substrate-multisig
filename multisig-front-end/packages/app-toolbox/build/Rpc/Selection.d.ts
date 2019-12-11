import { I18nProps } from '@polkadot/ui-app/types';
import { QueueTx$RpcAdd } from '@polkadot/ui-app/Status/types';
import './index.css';
import React from 'react';
declare type Props = I18nProps & {
    queueRpc: QueueTx$RpcAdd;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "queueRpc">>;
export default _default;
