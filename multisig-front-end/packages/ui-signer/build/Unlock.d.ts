import { I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = I18nProps & {
    autoFocus?: boolean;
    error?: string;
    onChange: (password: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
    password: string;
    tabIndex?: number;
    value?: string | null;
};
declare const _default: React.ComponentType<Pick<Props, "error" | "style" | "className" | "tabIndex" | "onChange" | "onKeyDown" | "value" | "password" | "autoFocus">>;
export default _default;
