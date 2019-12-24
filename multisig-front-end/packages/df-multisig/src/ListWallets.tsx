import React from 'react';
import { withCalls, withMulti } from '@polkadot/ui-api/with';
import { AccountId } from '@polkadot/types';
import './index.css';
import { Link } from 'react-router-dom';
import ViewWallet from './ViewWallet';
import { withMyAccount } from '@polkadot/df-utils/MyAccount';
import { queryMultisigToProp } from './utils';
import Section from '@polkadot/df-utils/Section';

type Props = {
  walletIds?: AccountId[]; // todo change AccountId
};

// const initialWalletsId = [
//   '5GNSoTxHwJvayiBgcfYvNN5boZ7VnJHjdRReUKiMuSftAbRp',
//   '5Dab58So9q8zK8SsLMvHQ1LrEi76tt7o9XTRziHgUkumqR9U',
//   '5H4gVboSoitvBhW2LU59a6rDYywH3Uea4ENpbhskVv9AYgJ5',
//   '5DuKatYA1RSo939f9uMCDsLeveyzNkkkv7h5vy5bW5fJQVed'
// ];

// export const initialState =
//   {
//     created: new Change(),
//     id: new AccountId('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'),
//     owners: [new AccountId('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')],
//     max_tx_value: new u64(54),
//     confirms_required: new u16(2)
//   };

const renderCreateWalletButton =
<Link to={`/wallet/new`} style={ { marginTop: '.5rem', float: 'right' } } className='ui tiny button primary'>
  <i className='plus icon' />
  Create wallet
</Link>;

const InnerViewWallets = (props: Props) => {
  const{ walletIds } = props;

  if (!walletIds) return <em>Loading your wallets...</em>;
  const renderWallets = () => {
    return <Section title={<div className='WalletsTitle'>{'My Wallets'} {renderCreateWalletButton}</div>}>
        {walletIds.map((walletId, index) =>
        <ViewWallet walletId={walletId} key={index} withPreview/>)}
      </Section>;
  };

  return (
    <>{renderWallets()}</>
  );
};

export default withMulti(
  InnerViewWallets,
  withMyAccount,
  withCalls(
    queryMultisigToProp('walletIdsByAccountId',
    { paramName: 'myAddress', propName: 'walletIds' })
  )
);
