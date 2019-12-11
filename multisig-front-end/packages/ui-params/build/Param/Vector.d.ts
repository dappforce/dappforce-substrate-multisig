import { WithTranslation } from 'react-i18next';
import { TypeDef } from '@polkadot/types';
import { RawParam } from '../types';
import React from 'react';
declare const _default: React.ComponentType<Pick<import("../../../ui-app/src/types").BareProps & {
    defaultValue: RawParam;
    name?: string | undefined;
    onChange?: import("../types").RawParam$OnChange | undefined;
    type: TypeDef;
} & {
    isDisabled?: boolean | undefined;
    isError?: boolean | undefined;
    isReadOnly?: boolean | undefined;
    label: string;
    withLabel?: boolean | undefined;
} & WithTranslation, "label" | "style" | "defaultValue" | "className" | "onChange" | "withLabel" | "name" | "isDisabled" | "isError" | "type" | "isReadOnly">>;
export default _default;
