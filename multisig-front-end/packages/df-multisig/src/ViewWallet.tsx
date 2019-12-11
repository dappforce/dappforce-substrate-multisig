import React, { useState, useEffect } from 'react';
import { withMulti, withApi } from '@polkadot/ui-api/with';
import { AccountId, Option } from '@polkadot/types';
import './index.css';
import { Segment, Label } from 'semantic-ui-react';
import { Wallet } from './types';
import { Link } from 'react-router-dom';
import { OwnersListModal } from './OwnersModal';
import ListTransactions from './ListTransactions';
import { AddressRow } from '@polkadot/ui-app';
import { ApiProps } from '@polkadot/ui-api/types';

type WalletProps = ApiProps & {
  walletId: AccountId; // todo change AccountId
  withPreview?: boolean;
};

const InnerViewWallet = (props: WalletProps) => {
  const { walletId, withPreview = false, api } = props;
  const [ wallet, setWallet ] = useState(undefined as (Wallet | undefined));
  const [ ownersOpen, setOwnersOpen ] = useState(false);

  useEffect(() => {

    const loadWallet = async () => {
      const walletOpt = await api.query.multisigWalletModule.walletById(walletId) as unknown as Option<Wallet>;
      if (walletOpt.isSome) {
        setWallet(walletOpt.unwrap());
      }
    };

    loadWallet().catch(console.log);
  }, [ false ]);

  if (!wallet) return <em>Loading...</em>;

  const { owners, max_tx_value, confirms_required, pending_tx_count, executed_tx_count } = wallet;

  // TODO useEffect

  const renderWallet = () => {
    return <>
      <div className='WalletHeader'>
      <AddressRow
          value={walletId.toString()}
          identIconSize={60}
          isShort={false}
          withNonce={false}
      />
      </div>
      <div className='WalletDetails'>
        <div>Max value for transaction: {max_tx_value.toNumber()}</div>
        <div>Number of required confirmations: {confirms_required.toNumber()}</div>
        <div>
          <Link to='#' onClick={() => setOwnersOpen(true)}>{`Owners: ${owners.length}`}</Link>
        </div>
        {ownersOpen && <OwnersListModal owners={owners} open={ownersOpen} close={() => setOwnersOpen(false)}/>}
      </div>
    </>;
  };

  const renderWalletPreview = () => {
    return <Segment className='WalletPreview'>
    <Link to={`/wallet/${walletId.toString()}`}>
      <AddressRow
        value={walletId.toString()}
        identIconSize={60}
        isShort={false}
        withNonce={false}
      />
    </Link>
    <div className='WalletPreviewDetails'>
      <Label as='a' onClick={() => setOwnersOpen(true)}>
        <Label.Detail>Owners: </Label.Detail>
        {` ${owners.length}`}
      </Label>
      <Label color={(pending_tx_count.toNumber() > 0) ? 'orange' : undefined}>
        <Label.Detail>Pending txs: </Label.Detail>
        {` ${pending_tx_count.toString()}`}
        </Label>
      <Label>
        <Label.Detail>Executed txs: </Label.Detail>
        {` ${executed_tx_count.toNumber()}`}
        </Label>
      <Label>
        <Label.Detail>Max tx value: </Label.Detail>
        {` ${max_tx_value.toNumber()}`}
        </Label>
      <Label>
        <Label.Detail>Confirmations required: </Label.Detail>
        {` ${confirms_required.toNumber()}`}
        </Label>
    </div>
    {ownersOpen && <OwnersListModal owners={owners} open={ownersOpen} close={() => setOwnersOpen(false)}/>}
  </Segment>;
  };

  if (withPreview) {
    return renderWalletPreview();
  } else {
    return <>
      {renderWallet()}
      <ListTransactions wallet={wallet} walletId={walletId} />
    </>;
  }
};

export default withMulti(
  InnerViewWallet,
  withApi
);
