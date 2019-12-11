import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Index } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    system_accountNonce?: Index;
};
export declare class Nonce extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
