import { Props as BaseProps, Size } from '../types';
import React from 'react';
declare type Props = BaseProps & {
    children?: React.ReactNode;
    length?: number;
    size?: Size;
    validate?: (u8a: Uint8Array) => boolean;
    withLength?: boolean;
};
export default class BaseBytes extends React.PureComponent<Props> {
    render(): JSX.Element;
    private onChange;
}
export {};
