import React from 'react';
declare type Props = {
    onChange: (accountId?: string) => void;
};
declare type State = {
    accountId?: string;
};
export default class AccountSelector extends React.PureComponent<Props, State> {
    state: State;
    render(): JSX.Element;
    private onChange;
}
export {};
