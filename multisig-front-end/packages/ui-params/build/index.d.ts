import { TypeDef } from '@polkadot/types';
import { I18nProps } from '@polkadot/ui-app/types';
import { ComponentMap, RawParams } from './types';
import './Params.css';
import React from 'react';
import Param from './Param';
declare type Param = {
    name?: string;
    type: TypeDef;
};
declare type Props = I18nProps & {
    isDisabled?: boolean;
    onChange?: (value: RawParams) => void;
    overrides?: ComponentMap;
    params: Array<Param>;
    values?: RawParams;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "onChange" | "isDisabled" | "params" | "values" | "overrides">>;
export default _default;
