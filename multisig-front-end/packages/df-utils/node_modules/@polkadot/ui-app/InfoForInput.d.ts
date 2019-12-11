import React from 'react';
declare type Props = {
    children: React.ReactNode;
    className?: string;
    type?: 'error' | 'info' | 'warning';
};
export default class InfoForInput extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
