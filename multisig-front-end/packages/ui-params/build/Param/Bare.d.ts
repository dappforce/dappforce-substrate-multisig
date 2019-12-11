import { BareProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = BareProps & {
    children: React.ReactNode;
};
export default class Bare extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
