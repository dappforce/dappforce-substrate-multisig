import { MethodFunction } from '@polkadot/types/primitive/Method';
import { BareProps } from '../types';
import { DropdownOptions } from '../util/types';
import React from 'react';
declare type Props = BareProps & {
    defaultValue?: string;
    isError?: boolean;
    onChange: (value: string) => void;
    options: DropdownOptions;
    value: MethodFunction;
};
export default class SelectSection extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
