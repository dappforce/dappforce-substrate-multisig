import { BareProps } from './types';
import React from 'react';
import { Event } from '@polkadot/types';
export declare type Props = BareProps & {
    children?: React.ReactNode;
    value: Event;
};
export default class EventDisplay extends React.PureComponent<Props> {
    render(): JSX.Element;
}
