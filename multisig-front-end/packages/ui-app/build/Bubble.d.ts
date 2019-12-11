import { BareProps } from './types';
import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import React from 'react';
declare type Props = BareProps & {
    children: React.ReactNode;
    color?: SemanticCOLORS;
    icon?: SemanticICONS;
    label?: React.ReactNode;
};
export default class Bubble extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
