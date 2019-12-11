import { BareProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Moment } from '@polkadot/types';
declare type Props = BareProps & {
    value?: Moment | Date | number;
};
declare type State = {
    now?: Date;
};
export default class Elapsed extends React.PureComponent<Props, State> {
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private getDisplayValue;
}
export {};
