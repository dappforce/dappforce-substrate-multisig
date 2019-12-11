import { BareProps } from '@polkadot/ui-app/types';
import { Size } from '../types';
import React from 'react';
declare type Props = BareProps & {
    children: React.ReactNode;
    isDisabled?: boolean;
    label?: string;
    size?: Size;
    withLabel?: boolean;
};
export default class Base extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
