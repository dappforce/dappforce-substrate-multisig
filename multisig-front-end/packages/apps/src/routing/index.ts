// Copyright 2017-2019 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Routing, Routes } from '../types';

import appSettings from '@polkadot/df-settings/';

import wallet from './df-multisigWallet';

import template from './123code';
import accounts from './accounts';
import addressbook from './addressbook';
import explorer from './explorer';
import extrinsics from './extrinsics';
import js from './js';
import settings from './settings';
import staking from './staking';
import storage from './storage';
import toolbox from './toolbox';
import transfer from './transfer';

const routes: Routes = appSettings.isBasicMode
  ? ([] as Routes).concat(
    explorer,
    staking,
    transfer,
    null,
    wallet,
    accounts,
    addressbook,
    null,
    settings,
    template
  )
  : ([] as Routes).concat(
    explorer,
    staking,
    transfer,
    null,
    wallet,
    accounts,
    addressbook,
    null,
    storage,
    extrinsics,
    null,
    settings,
    toolbox,
    js,
    template
  );

export default ({
  default: 'explorer',
  routes
} as Routing);
