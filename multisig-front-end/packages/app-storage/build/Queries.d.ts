import { BareProps } from '@polkadot/ui-app/types';
import { QueryTypes } from './types';
import React from 'react';
declare type Props = BareProps & {
    onRemove: (id: number) => void;
    value?: Array<QueryTypes>;
};
export default class Queries extends React.PureComponent<Props> {
    render(): JSX.Element | null;
}
export {};
