import React, { useState, useEffect } from 'react';

import { withCalls, withMulti, api } from '@polkadot/ui-api';
import { AccountId, u16, Option } from '@polkadot/types';
import './index.css';
import { Table, Tab } from 'semantic-ui-react';
import { Transaction, TransactionId, Wallet } from './types';
import TxButton from '@polkadot/df-utils/TxButton';
import { queryMultisigToProp } from './utils';
import { useMyAccount } from '@polkadot/df-utils/MyAccountContext';
import { SubmittableResult } from '@polkadot/api';
import { Link } from 'react-router-dom';
import { AddressRow } from '@polkadot/ui-app';
import { Pluralize } from './Pluralize';

type ListTxsProps = {
  wallet: Wallet,
  walletId: AccountId,
  pendingTxIds?: TransactionId[],
  executedTxIds?: TransactionId[]
};

type ViewTxProps = {
  walletId: AccountId,
  confirms_required: u16,
  txId: TransactionId,
  withStatus?: boolean
};

const ViewTransaction = (props: ViewTxProps) => {
  const { txId, walletId, confirms_required, withStatus = false } = props;
  const [ transaction, setTransaction ] = useState(undefined as (Transaction | undefined));
  const [ disableButton, setDisableButton ] = useState(false);
  const { state: { address } } = useMyAccount();

  useEffect(() => {

    const loadTx = async () => {
      const TxOpt = await api.query.multisigWalletModule.txById(txId) as unknown as Option<Transaction>;
      if (TxOpt.isSome) {
        setTransaction(TxOpt.unwrap());
      }
    };

    loadTx().catch(console.log);
  }, [ false ]);

  if (!transaction || !address) return <em>Loading...</em>;
  const { destination, value, notes, confirmed_by, executed, created: { time, block } } = transaction;
  const iConfirmed = confirmed_by.toString().indexOf(address) >= 0;

  const onSubmit = (sendTx: () => void) => {
    setDisableButton(true);
    sendTx();
  };

  const onTxCancelled = () => {
    setDisableButton(false);
  };

  const onTxFailed = (_txResult: SubmittableResult) => {
    setDisableButton(false);
  };

  const onTxSuccess = (_txResult: SubmittableResult) => {
    setDisableButton(false);
  };

  const buildTxParams = () => {
    return [ walletId, txId ];
  };

  const renderConfirmations = () => {
    if (confirmed_by.length > 1) {
      for (let i = 1; i < confirmed_by.length; i++) {
        return <AddressRow
          value={confirmed_by[i].toString()}
          identIconSize ={30}
          isShort={false}
          withNonce={false}
        />;
      }
    }
    return null;
  };

  const submitedBy = confirmed_by[0].toString();
  const isTxExecuted = executed.eq(true);

  const ConfirmTxButton = () => {
    if (submitedBy === address) {
      return <em>You submited this tx</em>;
    } else if (iConfirmed) {
      return <em>You confirmed</em>;
    } else if (isTxExecuted) {
      return <em>You didn't confirm</em>;
    } else {
      return <TxButton
        type='submit'
        isDisabled={disableButton}
        onClick={onSubmit}
        txCancelledCb={onTxCancelled}
        txFailedCb={onTxFailed}
        txSuccessCb={onTxSuccess}
        params={buildTxParams()}
        tx={'wallet.confirmTransaction'}
      >
        <i className='plus icon' />
        Confirm
      </TxButton>;
    }
  };

  return (
    <Table.Row>
      <Table.Cell>
        <div className='TxInfo'>
          <div><b>Tx id:</b> {txId.toString()}</div>
          <div><b>Tx value:</b> {value.toString()}</div>
          <div><b>Time:</b> {time.toString()} </div>
          <div><b>Block:</b> {block.toString()}</div>
          <div><b>Comment:</b> {notes.toString()}</div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className='TxDestination'>
          <b>Destination:</b>
          <AddressRow
            value={destination.toString()}
            identIconSize={30}
            isShort={false}
            withNonce={false}
          />
          <b>Submitted by:</b>
          <AddressRow
            value={submitedBy}
            identIconSize={30}
            isShort={false}
            withNonce={false}
          />
          {confirmed_by.length > 1 &&
            <><b>Confirmed by:</b> {renderConfirmations()}</>
          }
        </div>
      </Table.Cell>
      <Table.Cell style={{ textAlign: 'center' }}>
        {`${confirmed_by.length}/${confirms_required}`}
      </Table.Cell>
      {withStatus && <Table.Cell>
        {isTxExecuted
          ? 'Executed'
          : 'Pending'}
        </Table.Cell>
      }
      <Table.Cell>
        <ConfirmTxButton />
      </Table.Cell>
    </Table.Row>
  );
};

const InnerListTxs = (props: ListTxsProps) => {
  const { wallet, pendingTxIds, executedTxIds } = props;
  const { id, confirms_required } = wallet;
  if (!pendingTxIds || !executedTxIds) return <em>Loading list...</em>;

  const allTxs = [ ...pendingTxIds, ...executedTxIds ];
  const count = allTxs.length;

  type PaneProps = {
    transactionsIds: TransactionId[],
    withStatus?: boolean
  };

  const RenderTabPane = (props: PaneProps) => {
    const { transactionsIds, withStatus = false } = props;

    return <Tab.Pane as='div' style={{ marginTop: '1rem' }}>
      {!transactionsIds.length
        ? <em>No transactions yet.</em>
        : <Table celled selectable compact className='ProfileDetailsTable'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Information</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Confirmations</Table.HeaderCell>
              {withStatus && <Table.HeaderCell>Status</Table.HeaderCell>}
              <Table.HeaderCell>My response</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactionsIds.map((transactionId, index) =>
            <ViewTransaction
              withStatus={withStatus}
              key={index}
              txId={transactionId}
              walletId={id}
              confirms_required={confirms_required}
            />)}
          </Table.Body>
        </Table>
      }
    </Tab.Pane>;
  };

  const SubmitTxButton = () =>
    <Link to={`/wallet/${wallet.id}/transfer`} style={ { marginLeft: '1rem', verticalAlign: 'middle' } } className='ui button'>
      <i className='plus icon' />
      Submit transaction
    </Link>;

  const panes = [
    { key: 'all', menuItem: `All (${allTxs.length})`, render: () => <RenderTabPane transactionsIds={allTxs} withStatus /> },
    { key: 'pending', menuItem: `Pending (${pendingTxIds.length})`, render: () => <RenderTabPane transactionsIds={pendingTxIds} /> },
    { key: 'executed', menuItem: `Executed (${executedTxIds.length})`, render: () => <RenderTabPane transactionsIds={executedTxIds} /> }
  ];

  return (
    <>
    <h3 className='TransactionsHeader'>
      <Pluralize count={count} singularText='transaction' />
      <SubmitTxButton />
    </h3>
    <hr/>
    <Tab panes={panes}/>
    </>
  );
};

export default withMulti(
  InnerListTxs,
  withCalls(
    queryMultisigToProp('executedTxIdsByWalletId',
    { paramName: 'walletId', propName: 'executedTxIds' }),
    queryMultisigToProp('pendingTxIdsByWalletId',
    { paramName: 'walletId', propName: 'pendingTxIds' })
  )
);
