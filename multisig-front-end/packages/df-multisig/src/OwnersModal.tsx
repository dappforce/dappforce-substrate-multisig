import React from 'react';

import { withMulti } from '@polkadot/ui-api/with';
import { AccountId } from '@polkadot/types';
import './index.css';
import { Modal, Button } from 'semantic-ui-react';
import { AddressRow } from '@polkadot/ui-app';

type Props = {
  owners: AccountId[],
  open: boolean,
  close: () => void
};

const InnerOwnersListModal = (props: Props) => {

  const { owners, open, close } = props;

  const renderAccounts = () => {
    return owners && owners.map((owner, index) =>
      <div key={index} style={{ textAlign: 'left', margin: '1rem' }}>
        <AddressRow
          value={owner.toString()}
          identIconSize={48}
          withBalance
          isShort={false}
        />
      </div>
    );
  };

  return (
    <Modal
      open={open}
      centered={true}
      style={{ marginTop: '3rem' }}
    >
      <Modal.Header><h1>Wallet owners</h1></Modal.Header>
      <Modal.Content scrolling>
        {renderAccounts()}
      </Modal.Content>
      <Modal.Actions>
        <Button content='Close' onClick={close} />
      </Modal.Actions>
    </Modal>
  );
};

export const OwnersListModal = withMulti(
  InnerOwnersListModal
);
