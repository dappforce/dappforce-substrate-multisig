import React, { useState, useEffect } from 'react';
import { AddressSummary, InputAddress, InputBalance, Input, Labelled } from '@polkadot/ui-app';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';

import TxButton from '@polkadot/df-utils/TxButton';
import { withMulti, withCalls, api, withApi } from '@polkadot/ui-api';
import * as DfForms from '@polkadot/df-utils/forms';
import { ApiProps } from '@polkadot/ui-api/types';
import keyring from '@polkadot/ui-keyring';
import translate from './translate';
import { Wallet } from './types';
import { Option } from '@polkadot/types';
import { queryMultisigToProp } from './utils';
import { SubmittableResult } from '@polkadot/api';
import { History } from 'history';
import { UrlHasIdProps } from '@dappforce/multisig/utils';

type Props = I18nProps & ApiProps & FormValues & FormikProps<FormValues> & OuterProps & {
  history: History
};

type OuterProps = {
  currentWalletId: string
};

type FormValues = {
  txValue: BN;
  notes: string;
};

const MAX_NOTES_LENGTH = 53;

const LabelledField = DfForms.LabelledField<FormValues>();

const buildSchema = () => Yup.object().shape({

  txValue: Yup.number()
    .min(1,'Min transaction value should not be less than 1'),

  notes: Yup.string()
    .max(MAX_NOTES_LENGTH, `The note is too long. Max note length is ${MAX_NOTES_LENGTH}`)
});

const InnerTransfer = (props: Props) => {

  const {
    currentWalletId,
    t,
    values,
    setFieldValue,
    setFieldError,
    isValid,
    isSubmitting,
    setSubmitting,
    history
  } = props;

  const { txValue, notes } = values;
  const [ senderAddress ] = useState(currentWalletId);
  const [ currentWallet, setCurrentWallet ] = useState(null as (null | Wallet));
  const [ recipientAddress, setRecipientAddress ] = useState(null as (null | string));

  useEffect(() => {
    if (senderAddress === null) return;
    // tslint:disable-next-line: no-floating-promises
    api.query.multisigWalletModule.walletById(senderAddress, (walletOpt: Option<Wallet>) => {
      if (walletOpt.isSome) {
        const wallet = walletOpt.unwrap();
        setCurrentWallet(wallet);
      }
    });

  }, [ senderAddress ]);

  const onChangeTo = (recipientAddress: (string)) => {
    setRecipientAddress(recipientAddress);
  };

  const onChangeAmount = (value?: BN) => {
    if (!value || !currentWallet) return;
    const data = value.toNumber();

    if (value.gt(currentWallet.max_tx_value)) {
      setFieldError('txValue', `Max transaction value should be less than ${currentWallet.max_tx_value.toString()}`);
      setFieldValue('txValue', data, false);
    } else {
      setFieldValue('txValue', data);
    }
  };

  const onChangeNotes = (value?: string | undefined) => {
    setFieldValue('notes', value);
  };

  const renderAddress = (accountId: string | null, media: 'large' | 'medium') => {
    if (!accountId) {
      return null;
    }

    try {
      keyring.decodeAddress(accountId);
    } catch (err) {
      return null;
    }

    return (
      <div className={`transfer--Transfer-address ui--media-${media}`}>
        <AddressSummary
          value={accountId}
          withCopy={false}
        />
      </div>
    );
  };

  const onSubmit = (sendTx: () => void) => {
    setSubmitting(false);
    sendTx();
  };

  const onTxCancelled = () => {
    setSubmitting(false);
  };

  const onTxFailed = (_txResult: SubmittableResult) => {
    setSubmitting(false);
  };

  const onTxSuccess = (_txResult: SubmittableResult) => {
    setSubmitting(false);
    goToView();
  };

  const goToView = () => {
    if (history && currentWallet) {
      history.push(`/wallet/${currentWalletId}`);
    }
  };

  const buildTxParams = () => {
    if (!isValid) return [];
    return [ currentWalletId, recipientAddress, txValue, notes ];
  };

  return <>
    <Form>
      <div className='transfer--Transfer-info DfTransfer'>
        {renderAddress(senderAddress, 'medium')}
        <div className='transfer--Transfer-data'>
          <InputAddress
            label={t('to the recipient address')}
            default={null}
            onChange={onChangeTo}
            type='all'
          />
          <LabelledField name='txValue' {...props}>
            <Field
              component={InputBalance}
              name={txValue}
              autoFocus
              label={t('value of transaction')}
              onChange={onChangeAmount}
            />
          </LabelledField>
          <LabelledField name='notes' {...props}>
            <Field
              component={Input}
              id='notes'
              name={notes}
              label={t('notes')}
              placeholder='Add notes for your transaction'
              onChange={onChangeNotes}
            />
          </LabelledField>
          <Labelled
            style={{ marginTop: '.5rem' }}
            label={''}
            withLabel={true}
          >
            <TxButton
              type='submit'
              size='large'
              label={'Submit a transaction'}
              isDisabled={isSubmitting}
              params={buildTxParams()}
              onClick={onSubmit}
              txCancelledCb={onTxCancelled}
              txFailedCb={onTxFailed}
              txSuccessCb={onTxSuccess}
              tx={'wallet.submitTransaction'}
            />
          </Labelled>
        </div>
        <div className='ui--AddressSummary-base right'>
          {renderAddress(recipientAddress, 'medium')}
        </div>
      </div>
    </Form>
  </>;
};

const ValidationForm = withFormik<Props, FormValues>({

  mapPropsToValues: (props): FormValues => {
    const { txValue, notes } = props;
    if (txValue && notes) {
      return {
        txValue,
        notes
      };
    } else {
      return {
        txValue: new BN(0),
        notes: ''
      };
    }
  },

  validationSchema: buildSchema,

  handleSubmit: values => {
    // do submitting things
  }
})(InnerTransfer);

function withWalletIdFromUrl (Component: React.ComponentType<OuterProps>) {
  return function (props: UrlHasIdProps) {
    const { match: { params: { id } } } = props;
    try {
      return <Component currentWalletId={id} {...props}/>;
    } catch (err) {
      return <em>Invalid wallet ID: {id}</em>;
    }
  };
}

export default withMulti(
  ValidationForm,
  withApi,
  withWalletIdFromUrl,
  withCalls(
    queryMultisigToProp('walletIdsByAccountId',
    { paramName: 'myAddress', propName: 'walletIds' })
  ),
  translate
);
