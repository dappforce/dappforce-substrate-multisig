import { BareProps } from './types';
import BN from 'bn.js';
import React from 'react';
import { UInt } from '@polkadot/types';
declare type BaseColors = 'blue' | 'green' | 'red' | 'orange';
export declare type Colors = 'auto' | 'autoReverse' | BaseColors;
declare type Props = BareProps & {
    color?: Colors;
    percent?: BN | number;
    total?: UInt | BN | number;
    value?: UInt | BN | number;
};
export default class Progress extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
