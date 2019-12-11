import { BareProps } from '../types';
import BN from 'bn.js';
import React from 'react';
declare type Value = {
    colors: Array<string>;
    label: string;
    value: number | BN;
};
declare type Props = BareProps & {
    size?: number;
    values: Array<Value>;
};
export default class ChartDoughnut extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
