import { BareProps } from './types';
import React from 'react';
export declare type TabItem = {
    hasParams?: boolean;
    name: string;
    text: React.ReactNode;
};
declare type Props = BareProps & {
    basePath: string;
    hidden?: Array<string>;
    items: Array<TabItem>;
};
export default class Tabs extends React.PureComponent<Props> {
    render(): JSX.Element;
    private renderItem;
}
export {};
