import { Button$Sizes } from './Button/types';
import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    icon?: string;
    isCircular?: boolean;
    isPrimary?: boolean;
    size?: Button$Sizes;
    value?: any;
};
export default class CopyButton extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
