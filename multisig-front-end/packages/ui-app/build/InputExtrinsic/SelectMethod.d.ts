import { MethodFunction } from '@polkadot/types/primitive/Method';
import { BareProps } from '../types';
import { DropdownOptions } from '../util/types';
import React from 'react';
import ApiPromise from '@polkadot/api/promise';
declare type Props = BareProps & {
    api: ApiPromise;
    isError?: boolean;
    onChange: (value: MethodFunction) => void;
    options: DropdownOptions;
    value: MethodFunction;
};
export default class SelectMethod extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
