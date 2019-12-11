import { I18nProps } from '@polkadot/ui-app/types';
import { ApiProps } from '@polkadot/ui-api/types';
import React from 'react';
import { CodeHash, Option } from '@polkadot/types';
declare type Props = ApiProps & I18nProps & {
    address?: string | null;
    contract_codeHashOf?: Option<CodeHash>;
    onChange: (isValid: boolean) => void;
};
declare const _default: React.ComponentType<Pick<Pick<Props, "address" | "style" | "className" | "onChange" | "i18n" | "tReady" | "t" | "contract_codeHashOf">, "address" | "style" | "className" | "onChange" | "contract_codeHashOf">>;
export default _default;
