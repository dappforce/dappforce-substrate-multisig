import { QueueTx$ExtrinsicAdd, QueueTx$MessageSetStatus } from '@polkadot/ui-app/Status/types';
import { ApiProps } from './types';
import React from 'react';
import ApiPromise from '@polkadot/api/promise';
declare let api: ApiPromise;
declare type Props = {
    children: React.ReactNode;
    queueExtrinsic: QueueTx$ExtrinsicAdd;
    queueSetTxStatus: QueueTx$MessageSetStatus;
    url?: string;
};
declare type State = ApiProps & {
    chain?: string;
};
export { api };
export default class ApiWrapper extends React.PureComponent<Props, State> {
    state: State;
    constructor(props: Props);
    componentDidMount(): void;
    private subscribeEvents;
    private loadOnReady;
    render(): JSX.Element;
}
