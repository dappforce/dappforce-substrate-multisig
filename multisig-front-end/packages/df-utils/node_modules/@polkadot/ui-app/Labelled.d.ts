import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    help?: React.ReactNode;
    isHidden?: boolean;
    isSmall?: boolean;
    label?: React.ReactNode;
    children: React.ReactNode;
    withLabel?: boolean;
};
export default class Labelled extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
