import { queryToProp } from '@polkadot/df-utils/';
import { Options as QueryOptions } from '@polkadot/ui-api/with/types';

export const queryMultisigToProp = (storageItem: string, paramNameOrOpts?: string | QueryOptions) => {
  return queryToProp(`query.multisigWalletModule.${storageItem}`, paramNameOrOpts);
};

export type UrlHasIdProps = {
  match: {
    params: {
      id: string
    }
  }
};
