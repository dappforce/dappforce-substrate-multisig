import { BareProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = BareProps & {
    address: string;
    count: number;
    offset: number;
    onCreateToggle: (passthrough: string) => void;
    onRemove: (address: string) => void;
    seed: Uint8Array;
};
declare type State = {
    hexSeed: string;
};
export default class Match extends React.PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps({ seed }: Props): State;
    render(): JSX.Element;
    onCreate: () => void;
    onRemove: () => void;
}
export {};
