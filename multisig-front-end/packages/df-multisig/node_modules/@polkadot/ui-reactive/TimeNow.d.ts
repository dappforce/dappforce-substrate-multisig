import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Moment } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    timestamp_now?: Moment;
};
export declare class TimeNow extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
