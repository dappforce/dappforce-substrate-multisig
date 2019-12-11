import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & {
    md: string;
};
declare type State = {
    isVisible: boolean;
};
export default class HelpOverlay extends React.PureComponent<Props, State> {
    state: State;
    render(): JSX.Element;
    private renderButton;
    private renderSlideout;
    private toggleVisible;
}
export {};
