import React from 'react';
declare type Props = {
    as?: any;
    autoHeight?: boolean;
    rows?: number | string;
    style?: Object;
    value?: number | string;
    placeholder?: string;
    onChange?: (value: string) => void;
    labelClass?: string;
    labelStyle?: {
        [index: string]: any;
    };
    label?: string;
    withLabel?: boolean;
};
export default class Component extends React.PureComponent<Props> {
    render(): JSX.Element;
    private onChange;
}
export {};
