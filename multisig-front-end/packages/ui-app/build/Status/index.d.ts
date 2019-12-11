import { I18nProps } from '../types';
import { QueueStatus, QueueTx } from './types';
import React from 'react';
declare type Props = I18nProps & {
    stqueue?: Array<QueueStatus>;
    txqueue?: Array<QueueTx>;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "stqueue" | "txqueue">>;
export default _default;
