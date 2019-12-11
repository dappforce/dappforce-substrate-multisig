import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { ContractAbi } from '@polkadot/types';
declare type Props = I18nProps & {
    help: React.ReactNode;
    isError?: boolean;
    label: React.ReactNode;
    onChange: (json: string | null, contractAbi: ContractAbi | null) => void;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "help" | "className" | "onChange" | "isError">>;
export default _default;
