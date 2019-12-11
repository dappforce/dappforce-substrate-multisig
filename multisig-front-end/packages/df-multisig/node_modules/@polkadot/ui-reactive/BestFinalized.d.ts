import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { BlockNumber } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    chain_bestNumberFinalized?: BlockNumber;
};
export declare class BestFinalized extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
