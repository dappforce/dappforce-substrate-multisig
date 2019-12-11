import { BareProps } from '@polkadot/ui-app/types';
import './index.css';
import React from 'react';
declare type Props = BareProps & {
    children: React.ReactNode;
};
export default class Signer extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
