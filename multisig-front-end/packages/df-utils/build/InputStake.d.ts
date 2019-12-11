import BN from 'bn.js';
import React from 'react';
declare type Props = {
    label?: string;
    min?: BN;
    isValid?: boolean;
    onChange: (stake?: BN) => void;
};
export default class Component extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
