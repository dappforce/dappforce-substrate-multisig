import { StorageFunction } from '@polkadot/types/primitive/StorageKey';
import { DropdownOptions } from '../util/types';
import { BareProps } from '../types';
import React from 'react';
declare type Props = BareProps & {
    defaultValue?: StorageFunction;
    isError?: boolean;
    onChange: (value: string) => void;
    options: DropdownOptions;
    value: StorageFunction;
};
export default class SelectSection extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
