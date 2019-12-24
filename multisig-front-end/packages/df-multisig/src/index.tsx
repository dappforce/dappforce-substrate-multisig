import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router';
import translate from './translate';
import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import { ApiProps } from '@polkadot/ui-api/types';
import Tabs, { TabItem } from '@polkadot/ui-app/Tabs';

import CreateWallet from './CreateWallet';
import { withMulti } from '@polkadot/ui-api';
import Transfer from './CreateTransaction';
import ViewWalletById from './ViewWalletById';
import ListWallets from './ListWallets';

type Props = AppProps & ApiProps & I18nProps & {
};

class App extends PureComponent<Props> {

  private buildTabs (): TabItem[] {
    const { t } = this.props;
    return [
      {
        name: 'wallets',
        text: t('My Wallets')
      }
    ];
  }

  render () {
    const { basePath } = this.props;
    const tabs = this.buildTabs();
    return (
      <main className='blogs--App'>
        <header>
          <Tabs basePath={basePath} items={tabs} />
        </header>
        <Switch>
          <Route path={`${basePath}/:id/transfer`} component={Transfer}/>
          <Route path={`${basePath}/new`} component={CreateWallet}/>
          <Route path={`${basePath}/:id`} component={ViewWalletById}/>
          <Route component={ListWallets}/>
        </Switch>
      </main>
    );
  }
}

export default withMulti(
  App,
  translate
);
