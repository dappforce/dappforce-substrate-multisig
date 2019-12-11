import { WithTranslation } from 'react-i18next';
import { Props as BareProps, RawParam } from '../types';
import React from 'react';
declare type Props = BareProps & WithTranslation & {
    defaultValue: RawParam;
    withLabel?: boolean;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "defaultValue" | "className" | "onChange" | "withLabel" | "name" | "isDisabled" | "isError" | "type" | "isReadOnly">>;
export default _default;
