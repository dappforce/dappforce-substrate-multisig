import { DerivedReferendumVote } from '@polkadot/api-derive/types';
import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
import { ReferendumInfoExtended } from '@polkadot/api-derive/democracy/referendumInfo';
declare type Props = I18nProps & {
    idNumber: BN;
    chain_bestNumber?: BN;
    democracy_referendumVotesFor?: Array<DerivedReferendumVote>;
    democracy_publicDelay?: BN;
    value: ReferendumInfoExtended;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "value" | "i18n" | "tReady" | "t" | "chain_bestNumber" | "idNumber" | "democracy_referendumVotesFor" | "democracy_publicDelay">, "style" | "className" | "value" | "chain_bestNumber" | "idNumber" | "democracy_referendumVotesFor" | "democracy_publicDelay">>;
export default _default;
