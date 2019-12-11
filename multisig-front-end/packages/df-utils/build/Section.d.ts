import React from 'react';
import { BareProps } from '@polkadot/ui-app/types';
declare type Props = BareProps & {
    id?: string;
    className?: string;
    title?: JSX.Element | string;
    level?: number;
};
export default class Section extends React.PureComponent<Props> {
    render(): JSX.Element;
    private renderTitle;
}
export {};
