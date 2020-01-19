# Substrate Multisig Wallet by [DappForce](https://github.com/dappforce)

⚠️ Experimental ⚠️ multisig wallet module with web UI for Substrate/Polkadot blockchains.

## Features

### Current

- Create a multisig wallet with multiple owners.
- Submit a new transaction.
- See list of transactions in a wallet.
- Confirm a pending transaction.

### Planned

- Change wallet parameters (confirms required, max tx value), add/remove owners via on-chain governance.
- Push and email notifications? This will require a centralized server that will send notifications.

## Substrate version

Currently the mulstisig is implemented for Substrate v1. 
We are planning to upgrade it to Substrate v2 when it's stable, so it can be used with Kusama Network.

## Web UI

Multisig UI is implemented as an app for [Polkadot.js Apps](https://github.com/polkadot-js/apps).
This means that if you have a fork of Polkadot.js Apps, you can add the multisig to it. 
But keep in mind that there are a lot of breaking changes in Polkadot.js Apps, 
so chances are that the multisig will fail with TypeScript errors in your fork of Polkadot.js Apps.

## Screenshots

### My wallets

![Image of wallets list](screenshots/wallets_list.png)

### Wallet transactions

![Image of txs list](screenshots/txs_list.png)
