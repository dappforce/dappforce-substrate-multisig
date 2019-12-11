import { BareProps } from '@polkadot/ui-app/types';
import { Log } from './types';
import React from 'react';
declare type Props = BareProps & {
    children?: React.ReactNode;
    logs: Array<Log>;
};
declare const _default: (props: Props) => JSX.Element;
export default _default;
