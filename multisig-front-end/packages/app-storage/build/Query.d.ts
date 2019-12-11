import { I18nProps } from '@polkadot/ui-app/types';
import { QueryTypes } from './types';
import React from 'react';
declare type Props = I18nProps & {
    onRemove: (id: number) => void;
    value: QueryTypes;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "value" | "onRemove">>;
export default _default;
