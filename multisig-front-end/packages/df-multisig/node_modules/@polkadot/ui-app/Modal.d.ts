import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    children: React.ReactNode;
    [index: string]: any;
};
export default class Modal extends React.PureComponent<Props> {
    static Actions: React.ComponentClass<import("semantic-ui-react").ModalActionsProps, any>;
    static Content: React.FunctionComponent<import("semantic-ui-react").ModalContentProps>;
    static Header: React.FunctionComponent<import("semantic-ui-react").ModalHeaderProps>;
    static Description: React.FunctionComponent<import("semantic-ui-react").ModalDescriptionProps>;
    render(): JSX.Element;
}
export {};
