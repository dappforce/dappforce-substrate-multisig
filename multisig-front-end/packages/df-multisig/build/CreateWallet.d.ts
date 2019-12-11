import React from 'react';
import { FormikProps } from 'formik';
import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import BN from 'bn.js';
import { History } from 'history';
declare type CreateWallet = AppProps & I18nProps & FormValues & FormikProps<FormValues> & {
    walletId?: string;
    history?: History;
};
export declare function withGeneratedAddress(Component: React.ComponentType<CreateWallet>): (props: CreateWallet) => JSX.Element;
declare type FormValues = {
    maxTxValue?: BN;
    confirmsRequired?: BN;
};
declare const _default: React.ComponentType<any>;
export default _default;
