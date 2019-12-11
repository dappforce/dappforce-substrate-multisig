import { I18nProps } from '@polkadot/ui-app/types';
import { QueryTypes } from '../types';
import React from 'react';
declare type Props = I18nProps & {
    basePath: string;
    onAdd: (query: QueryTypes) => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "basePath" | "onAdd">>;
export default _default;
