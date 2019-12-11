import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    label?: React.ReactNode;
};
export default class InputError extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
