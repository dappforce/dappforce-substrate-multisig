import { WithTranslation } from 'react-i18next';
import { BareProps } from './types';
import React from 'react';
declare type Props = BareProps & WithTranslation & {
    accept?: string;
    clearContent?: boolean;
    help?: React.ReactNode;
    isDisabled?: boolean;
    isError?: boolean;
    label?: React.ReactNode;
    onChange?: (contents: Uint8Array, name: string) => void;
    onFileSelected?: (contents: Uint8Array, file: File) => void;
    placeholder?: React.ReactNode | null;
    withLabel?: boolean;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "help" | "className" | "placeholder" | "onChange" | "withLabel" | "isDisabled" | "isError" | "accept" | "clearContent" | "onFileSelected">>;
export default _default;
