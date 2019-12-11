import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { EventRecord } from '@polkadot/types';
declare type Props = I18nProps & {
    value?: Array<EventRecord>;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "value">>;
export default _default;
