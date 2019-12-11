import { Props } from '../types';
import React from 'react';
declare type State = {
    isFileDrop: boolean;
};
export default class Bytes extends React.PureComponent<Props, State> {
    state: State;
    render(): JSX.Element;
    private renderInput;
    private renderFileButton;
    private renderFile;
    private toggleFile;
    private onChangeFile;
}
export {};
