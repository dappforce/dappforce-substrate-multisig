import { BareProps } from '@polkadot/ui-app/types';
import './BlockHeader.css';
import React from 'react';
import { HeaderExtended } from '@polkadot/types';
declare type Props = BareProps & {
    isSummary?: boolean;
    value?: HeaderExtended;
    withLink?: boolean;
};
export default class BlockHeader extends React.PureComponent<Props> {
    render(): JSX.Element | null;
    private renderDetails;
}
export {};
