import BN from 'bn.js';
import React from 'react';
declare type Props = {
    accountId?: string;
};
declare type State = {
    amount?: BN;
    recipientId?: string;
};
export default class Transfer extends React.PureComponent<Props> {
    state: State;
    render(): JSX.Element;
    private onChangeAmount;
    private onChangeRecipient;
}
export {};
