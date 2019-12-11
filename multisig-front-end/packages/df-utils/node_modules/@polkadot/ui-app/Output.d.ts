import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    children?: React.ReactNode;
    help?: React.ReactNode;
    isError?: boolean;
    isHidden?: boolean;
    label?: any;
    value?: any;
    withCopy?: boolean;
    withLabel?: boolean;
};
export default class Output extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
