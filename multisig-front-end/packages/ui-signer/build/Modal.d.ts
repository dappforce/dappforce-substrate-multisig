import { ApiProps } from '@polkadot/ui-api/types';
import { I18nProps, BareProps } from '@polkadot/ui-app/types';
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { QueueTx, QueueTx$MessageSetStatus } from '@polkadot/ui-app/Status/types';
import React from 'react';
declare type BaseProps = BareProps & {
    queue: Array<QueueTx>;
    queueSetTxStatus: QueueTx$MessageSetStatus;
};
declare type Props = I18nProps & ApiProps & BaseProps & {
    allAccounts?: SubjectInfo;
};
declare type State = {
    currentItem?: QueueTx;
    isSendable: boolean;
    password: string;
    unlockError?: string | null;
};
declare class Signer extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ allAccounts, queue }: Props, { currentItem, password, unlockError }: State): State;
    componentDidUpdate(): Promise<void>;
    render(): JSX.Element | null;
    private renderButtons;
    private renderContent;
    private renderUnlock;
    private unlockAccount;
    private onChangePassword;
    private onKeyDown;
    private onCancel;
    private onSend;
    private sendRpc;
    private sendExtrinsic;
    private submitRpc;
    private makeExtrinsicCall;
    private makeExtrinsicSignature;
}
export { Signer };
declare const _default: React.ComponentType<any>;
export default _default;
