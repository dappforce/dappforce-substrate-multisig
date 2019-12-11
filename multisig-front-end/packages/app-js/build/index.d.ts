import { AppProps, BareProps } from '@polkadot/ui-app/types';
import React from 'react';
import './index.css';
declare type Props = AppProps & BareProps;
declare class AppJs extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export default AppJs;
