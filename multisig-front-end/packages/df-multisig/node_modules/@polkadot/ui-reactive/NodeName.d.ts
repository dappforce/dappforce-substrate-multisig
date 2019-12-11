import { BareProps, CallProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Text } from '@polkadot/types';
declare type Props = BareProps & CallProps & {
    children?: React.ReactNode;
    label?: string;
    system_name?: Text;
};
export declare class NodeName extends React.PureComponent<Props> {
    render(): JSX.Element;
}
declare const _default: React.ComponentType<any>;
export default _default;
