import React, { useState } from 'react';
import { AddressSummary, InputAddress, InputNumber , InputBalance, Labelled } from '@polkadot/ui-app';
import { mnemonicGenerate, mnemonicValidate } from '@polkadot/util-crypto';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useMyAccount } from '@polkadot/df-utils/MyAccountContext';
import translate from './translate';
import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';

import TxButton from '@polkadot/df-utils/TxButton';
import { withMulti } from '@polkadot/ui-api';
import Keyring from '@polkadot/keyring';
import * as DfForms from '@polkadot/df-utils/forms';
import { History } from 'history';
import { SubmittableResult } from '@polkadot/api';

type CreateWallet = AppProps & I18nProps & FormValues & FormikProps<FormValues> & {
  walletId?: string,
  history?: History;
};

const MIN_TX_VALUE = new BN(1);

const MIN_CONFIRMS = new BN(2);

const LabelledField = DfForms.LabelledField<FormValues>();

const buildSchema = () => Yup.object().shape({

  maxTxValue: Yup.number()
    .min(MIN_TX_VALUE.toNumber(), 'Max transaction value should be more than 0'),

  confirmsRequired: Yup.number()
    .min(MIN_CONFIRMS.toNumber(), 'Min value for required confirmations is 2')
});

export function withGeneratedAddress (Component: React.ComponentType<CreateWallet>) {
  return function (props: CreateWallet) {
    const mnemonic = mnemonicGenerate();
    const keyring = new Keyring();
    const isValidMnemonic = mnemonicValidate(mnemonic);
    const address = isValidMnemonic ? keyring.addFromMnemonic(mnemonic).address() : '';
    return <Component walletId={address} {...props}/>;
  };
}

const InnerWallet = (props: CreateWallet) => {

  const { state: { address: myAddress } } = useMyAccount();
  const {
    t,
    walletId,
    setFieldValue,
    setFieldError,
    values,
    isSubmitting,
    isValid,
    dirty,
    history,
    setSubmitting
 } = props;
  const { maxTxValue, confirmsRequired } = values;

  const [ walletIdState ] = useState(walletId ? walletId : '');
  const [ owners, setOwners ] = useState(new Array<string>(myAddress ? myAddress : ''));
  // const [ maxTxValue, setMaxTxValue ] = useState(new BN(1));
  // const [ confirmsRequired, setConfirmsRequired ] = useState(MIN_CONFIRMS);

  if (!myAddress) return null;

  const onChangeOwners = (account: (string | string[])) => {
    setOwners([myAddress, ...account]);
  };

  const onChangeBalance = (value?: BN) => {
    const data = value && value.toNumber();
    setFieldValue('maxTxValue', data);
  };

  const onChangeConfirms = (value?: BN) => {
    if (!value) return;
    const data = value.toNumber();
    if (owners.length.valueOf > data.valueOf) {
      setFieldError('confrimsRequired', 'The number of required confirmations can\'t be more than number of owners');
      setFieldValue('confirmsRequired', data, false);
    } else {
      setFieldValue('confirmsRequired', data);
    }
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

  const buildTxParams = () => {
    if (!isValid) return [];
    return [ walletIdState, owners, maxTxValue, confirmsRequired ];
  };

  const goToView = () => {
    if (history && walletId) {
      history.push(`/wallet/${walletId}`);
    }
  };

  return <>
  <Form>
      <div className='transfer--Transfer-data'>
        <AddressSummary
          className='shrink'
          value={walletIdState}
        />
        <div className='InputData'>
          <InputAddress
            label={t('Owner address')}
            onChange={onChangeOwners}
            onChangeMulti={onChangeOwners}
            isMultiple
            type='all'
          />
          <LabelledField name='maxTxValue' {...props}>
            <Field
              component={InputBalance}
              autoFocus
              name='maxTxValue'
              value={maxTxValue}
              onChange={onChangeBalance}
              label={t('Max value of transaction')}
            />
          </LabelledField>
          <LabelledField name='confirmsRequired' {...props}>
            <Field
              component={InputNumber}
              name={confirmsRequired}
              value={MIN_CONFIRMS}
              onChange={onChangeConfirms}
              label={t('Confirmations required for one transaction')}
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
              label={'Create wallet'}
              isDisabled={!dirty || isSubmitting || !isValid}
              onClick={onSubmit}
              txCancelledCb={onTxCancelled}
              txFailedCb={onTxFailed}
              txSuccessCb={onTxSuccess}
              params={buildTxParams()}
              tx={'wallet.createWallet'}
            />
          </Labelled>
        </div>
      </div>
    </Form>
  </>;
};

type FormValues = {
  maxTxValue?: BN;
  confirmsRequired?: BN;
};

const EditForm = withFormik<CreateWallet, FormValues>({

  mapPropsToValues: (props): FormValues => {
    const { maxTxValue, confirmsRequired } = props;
    if (maxTxValue && confirmsRequired) {
      return {
        maxTxValue,
        confirmsRequired
      };
    } else {
      return {
        maxTxValue: MIN_TX_VALUE,
        confirmsRequired: MIN_CONFIRMS
      };
    }
  },

  validationSchema: buildSchema,

  handleSubmit: values => {
    // do submitting things
  }
})(InnerWallet);

export default withMulti(
    EditForm,
    withGeneratedAddress,
    translate
);
