import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { PeerInfo } from '@polkadot/types';
declare type Props = I18nProps & {
    peers?: Array<PeerInfo> | null;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "peers">>;
export default _default;
