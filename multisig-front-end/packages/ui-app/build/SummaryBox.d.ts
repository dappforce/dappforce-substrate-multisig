import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    children?: React.ReactNode;
};
export default class SummaryBox extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
