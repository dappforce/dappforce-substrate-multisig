import { I18nProps } from '@polkadot/ui-app/types';
import { BaseProps, ComponentMap } from '../types';
import React from 'react';
declare type Props = I18nProps & BaseProps & {
    isDisabled?: boolean;
    overrides?: ComponentMap;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "defaultValue" | "className" | "onChange" | "name" | "isDisabled" | "type" | "overrides">>;
export default _default;
