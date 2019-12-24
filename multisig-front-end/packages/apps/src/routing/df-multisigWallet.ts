import { Routes } from '../types';

import Multisig from '@dappforce/multisig/index';

export default ([
  {
    Component: Multisig,
    display: {},
    i18n: {
      defaultValue: 'Multisig'
    },
    icon: 'money bill alternate outline',
    name: 'wallet'
  }
] as Routes);
