import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { DigestItem } from '@polkadot/types';
declare type Props = I18nProps & {
    value?: Array<DigestItem>;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "value">>;
export default _default;
