import { BareProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = BareProps & {
    defaultValue?: any;
    isDisabled?: boolean;
    isError?: boolean;
    label: string;
    onChange?: (contents: Uint8Array) => void;
    placeholder?: string;
    withLabel?: boolean;
};
export default class File extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
