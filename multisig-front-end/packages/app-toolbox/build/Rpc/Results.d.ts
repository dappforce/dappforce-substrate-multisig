import { BareProps } from '@polkadot/ui-app/types';
import { QueueTx } from '@polkadot/ui-app/Status/types';
import React from 'react';
declare type Props = BareProps & {
    queue: Array<QueueTx>;
};
export default class Results extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
