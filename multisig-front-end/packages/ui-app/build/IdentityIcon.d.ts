import { ApiProps } from '@polkadot/ui-api/types';
import { IdentityProps } from '@polkadot/ui-identicon/types';
import React from 'react';
import { AccountId, Option } from '@polkadot/types';
declare type IconProps = ApiProps & IdentityProps & {
    session_validators?: Array<AccountId>;
    staking_bonded?: Option<AccountId>;
};
declare const _default: React.ComponentType<Pick<IconProps, "style" | "theme" | "size" | "className" | "prefix" | "onCopy" | "value" | "isHighlight" | "session_validators" | "staking_bonded">>;
export default _default;
