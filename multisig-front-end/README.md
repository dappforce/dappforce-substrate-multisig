# Substrate Multisig Wallet by [DappForce](https://github.com/dappforce)

A multisig wallet web UI for Substrate/Polkadot blockchains.

## Development

Contributions are welcome!

To start off, this repo (along with others in the [@polkadot](https://github.com/polkadot-js/) family) uses yarn workspaces to organise the code. As such, after cloning dependencies _should_ be installed via `yarn`, not via npm, the latter will result in broken dependencies.

To get started -

1. Clone the repo locally, via `git clone git@github.com:dappforce/dappforce-substrate-multisig.git` and change directory to _multisig-front-end_.
2. Ensure that you have a recent LTS version of Node.js, for development purposes [Node >=10.13.0](https://nodejs.org/en/) is recommended.
3. Ensure that you have a recent version of Yarn, for development purposes [Yarn >=1.10.1](https://yarnpkg.com/docs/install) is required.
4. Install the dependencies by running `yarn`
5. Ready! Now you can launch the UI (assuming you have a local Polkadot Node running), via `yarn run start`
6. Access the UI via [http://localhost:3000](http://localhost:3000)
