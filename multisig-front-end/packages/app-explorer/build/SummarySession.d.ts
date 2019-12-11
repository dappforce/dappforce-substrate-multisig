import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import React from 'react';
import { BlockNumber } from '@polkadot/types';
declare type Props = I18nProps & {
    session_eraLength?: BN;
    session_eraProgress?: BN;
    session_sessionProgress?: BN;
    session_sessionLength?: BlockNumber;
    withBroken?: boolean;
    withEra?: boolean;
    withSession?: boolean;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "i18n" | "tReady" | "t" | "session_eraLength" | "session_eraProgress" | "session_sessionProgress" | "session_sessionLength" | "withBroken" | "withEra" | "withSession">, "style" | "className" | "session_eraLength" | "session_eraProgress" | "session_sessionProgress" | "session_sessionLength" | "withBroken" | "withEra" | "withSession">>;
export default _default;
