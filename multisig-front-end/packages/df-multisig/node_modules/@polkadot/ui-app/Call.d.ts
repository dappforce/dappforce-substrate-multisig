import { IExtrinsic, IMethod } from '@polkadot/types/types';
import { BareProps } from './types';
import React from 'react';
export declare type Props = BareProps & {
    children?: React.ReactNode;
    value: IExtrinsic | IMethod;
};
export default class Call extends React.PureComponent<Props> {
    render(): JSX.Element;
}
