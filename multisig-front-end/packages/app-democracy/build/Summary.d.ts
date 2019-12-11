import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
declare type Props = I18nProps & {
    chain_bestNumber?: BN;
    democracy_launchPeriod?: BN;
    democracy_nextTally?: BN;
    democracy_publicDelay?: BN;
    democracy_publicPropCount?: BN;
    democracy_referendumCount?: BN;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "i18n" | "tReady" | "t" | "chain_bestNumber" | "democracy_publicDelay" | "democracy_launchPeriod" | "democracy_nextTally" | "democracy_publicPropCount" | "democracy_referendumCount">, "style" | "className" | "chain_bestNumber" | "democracy_publicDelay" | "democracy_launchPeriod" | "democracy_nextTally" | "democracy_publicPropCount" | "democracy_referendumCount">>;
export default _default;
