import { I18nProps } from '@polkadot/ui-app/types';
import { QueueTx } from '@polkadot/ui-app/Status/types';
import React from 'react';
declare type Props = I18nProps & {
    children?: React.ReactNode;
    isSendable: boolean;
    value: QueueTx;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "children" | "value" | "isSendable">>;
export default _default;
