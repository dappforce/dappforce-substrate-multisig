import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = I18nProps & {
    address: string;
    onClose: () => void;
    doForget: () => void;
};
declare const _default: React.ComponentType<Pick<Props, "address" | "style" | "className" | "onClose" | "doForget">>;
export default _default;
