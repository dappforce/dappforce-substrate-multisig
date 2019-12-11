import { I18nProps } from '@polkadot/ui-app/types';
import { Info } from './types';
import React from 'react';
declare type Props = I18nProps & {
    nextRefresh: number;
    info: Info;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "info" | "nextRefresh">>;
export default _default;
