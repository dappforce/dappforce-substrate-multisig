import { BareProps } from './types';
import BN from 'bn.js';
import React from 'react';
import { UInt } from '@polkadot/types';
import { Colors as ProgressColors } from './Progress';
declare type ProgressProps = {
    color?: ProgressColors;
    hideValue?: boolean;
    isPercent?: boolean;
    total?: BN | UInt;
    value?: BN | UInt;
};
declare type Props = BareProps & {
    children?: React.ReactNode;
    help?: React.ReactNode;
    label: React.ReactNode;
    progress?: ProgressProps;
};
export default class CardSummary extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
