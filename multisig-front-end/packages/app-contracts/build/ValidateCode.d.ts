import { I18nProps } from '@polkadot/ui-app/types';
import { ApiProps } from '@polkadot/ui-api/types';
import React from 'react';
import { Option, PrefabWasmModule } from '@polkadot/types';
declare type Props = ApiProps & I18nProps & {
    codeHash?: string | null;
    contract_codeStorage?: Option<PrefabWasmModule>;
    onChange: (isValid: boolean) => void;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "style" | "className" | "onChange" | "i18n" | "tReady" | "t" | "codeHash" | "contract_codeStorage">, "style" | "className" | "onChange" | "codeHash" | "contract_codeStorage">>;
export default _default;
