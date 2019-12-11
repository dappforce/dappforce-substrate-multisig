import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { ReferendumInfoExtended } from '@polkadot/api-derive/democracy/referendumInfo';
import { Option } from '@polkadot/types';
declare type Props = I18nProps & {
    democracy_referendums?: Array<Option<ReferendumInfoExtended>>;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "i18n" | "tReady" | "t" | "democracy_referendums">, "style" | "className" | "democracy_referendums">>;
export default _default;
