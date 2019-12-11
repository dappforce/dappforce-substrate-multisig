import { MethodFunction } from '@polkadot/types/primitive/Method';
import { I18nProps } from '@polkadot/ui-app/types';
import { RawParam$OnChange } from '@polkadot/ui-params/types';
import React from 'react';
declare type Props = I18nProps & {
    defaultValue: MethodFunction;
    isDisabled?: boolean;
    isError?: boolean;
    isPrivate: boolean;
    label: string;
    onChange?: RawParam$OnChange;
    withLabel?: boolean;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "defaultValue" | "className" | "onChange" | "withLabel" | "isDisabled" | "isError" | "isPrivate">>;
export default _default;
