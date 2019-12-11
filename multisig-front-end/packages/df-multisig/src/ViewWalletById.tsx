import React from 'react';

import { I18nProps } from '@polkadot/ui-app/types';

import translate from './translate';
import ViewWallet from './ViewWallet';
import { UrlHasIdProps } from '@dappforce/multisig/utils';
import { AccountId } from '@polkadot/types';

type Props = I18nProps & UrlHasIdProps;

class Component extends React.PureComponent<Props> {
  render () {
    const { match: { params: { id } } } = this.props;
    return id
    ? <ViewWallet walletId={new AccountId(id)} />
    : null;
  }
}

export default translate(Component);
