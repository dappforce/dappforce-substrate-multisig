import React from 'react';
import { Link } from 'react-router-dom';
import { I18nProps } from '@polkadot/ui-app/types';
import { useMyAccount } from '@polkadot/df-utils/MyAccountContext';
import AddressMini from '@polkadot/ui-app/AddressMini';
import translate from './translate';
import './TopBar.css';

type Props = I18nProps & {};

function renderAddress (address: string) {
  const marginRight = { marginRight: '.5rem' };
  return <div className='DfTopBar'>
    <span style={marginRight}>My key: </span>
    <AddressMini value={address} isShort isPadded={false} withBalance={true} style={marginRight} />
    <Link className='ui small button inverted' to='/accounts'>Change key</Link>
  </div>;
}

function renderNoAddress () {
  return <div className='DfTopBar NoMyAddress'>
    <i className='warning sign icon'></i>
    <span style={{ marginRight: '1rem' }}>You need to create a key if you want to use all features.</span>
    <Link className='ui small button orange' to='/accounts'>Create key</Link>
  </div>;
}

function Component (_props: Props) {
  const { state: { address } } = useMyAccount();
  return address
    ? renderAddress(address)
    : renderNoAddress();
}

export default translate(Component);
