import { RpcMethod } from '@polkadot/jsonrpc/types';
import { I18nProps } from '../types';
import '../InputExtrinsic/InputExtrinsic.css';
import React from 'react';
declare type Props = I18nProps & {
    defaultValue: RpcMethod;
    help?: React.ReactNode;
    isError?: boolean;
    label: React.ReactNode;
    onChange?: (value: RpcMethod) => void;
    withLabel?: boolean;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "help" | "defaultValue" | "className" | "onChange" | "withLabel" | "isError">>;
export default _default;
