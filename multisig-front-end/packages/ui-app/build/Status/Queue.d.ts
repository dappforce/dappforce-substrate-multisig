import { BareProps } from '../types';
import { ActionStatus, PartialQueueTx$Rpc, QueueProps, QueueTx$Status } from './types';
import React from 'react';
import { SubmittableResult } from '@polkadot/api/SubmittableExtrinsic';
export declare type Props = BareProps & {
    children: React.ReactNode;
};
declare type State = QueueProps;
export default class Queue extends React.Component<Props, State> {
    state: State;
    constructor(props: Props);
    render(): JSX.Element;
    private clearAction;
    queueAction: (status: ActionStatus) => number;
    private clearStatus;
    queueSetTxStatus: (id: number, status: QueueTx$Status, result?: SubmittableResult | undefined, error?: Error | undefined) => void;
    private addResultEvents;
    private queueAdd;
    queueExtrinsic: ({ accountId, extrinsic, signerCb, signerOptions, txFailedCb, txSuccessCb, txUpdateCb, txSentCb, txCancelledCb, isUnsigned }: any) => number;
    queueRpc: ({ accountId, rpc, values }: PartialQueueTx$Rpc) => number;
}
export {};
