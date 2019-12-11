import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    children?: React.ReactNode;
    defaultValue?: any;
    help?: React.ReactNode;
    isDisabled?: boolean;
    isError?: boolean;
    isHidden?: boolean;
    label?: React.ReactNode;
    value?: React.ReactNode;
    withLabel?: boolean;
};
export default class Static extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
