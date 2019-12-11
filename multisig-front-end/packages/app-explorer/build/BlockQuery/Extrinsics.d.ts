import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { Extrinsic } from '@polkadot/types';
declare type Props = I18nProps & {
    label?: React.ReactNode;
    value?: Array<Extrinsic> | null;
};
declare const _default: React.ComponentType<Pick<Props, "label" | "style" | "className" | "value">>;
export default _default;
