"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMultiSigTypes = registerMultiSigTypes;
exports.Transaction = exports.Wallet = exports.TransactionId = void 0;

var _codec = require("@polkadot/types/codec");

var _types = require("@polkadot/types");

var _blogs = require("@dappforce/types/blogs");

class TransactionId extends _types.u64 {}

exports.TransactionId = TransactionId;

class Wallet extends _codec.Struct {
  constructor(value) {
    super({
      created: _blogs.Change,
      id: _types.AccountId,
      owners: _blogs.VecAccountId,
      max_tx_value: _types.BalanceOf,
      confirms_required: _types.u16,
      pending_tx_count: _types.u16,
      executed_tx_count: _types.u64
    }, value);
  }

  get created() {
    return this.get('created');
  }

  get id() {
    return this.get('id');
  }

  get owners() {
    return this.get('owners');
  }

  get max_tx_value() {
    return this.get('max_tx_value');
  }

  get confirms_required() {
    return this.get('confirms_required');
  }

  get pending_tx_count() {
    return this.get('pending_tx_count');
  }

  get executed_tx_count() {
    return this.get('executed_tx_count');
  }

}

exports.Wallet = Wallet;

class Transaction extends _codec.Struct {
  constructor(value) {
    super({
      created: _blogs.Change,
      id: TransactionId,
      destination: _types.AccountId,
      value: _types.BalanceOf,
      notes: _types.Text,
      confirmed_by: _blogs.VecAccountId,
      executed: _types.bool
    }, value);
  }

  get created() {
    return this.get('created');
  }

  get id() {
    return this.get('id');
  }

  get destination() {
    return this.get('destination');
  }

  get value() {
    return this.get('value');
  }

  get confirmed_by() {
    return this.get('confirmed_by');
  }

  get notes() {
    const notes = this.get('notes');
    return notes.toString();
  }

  get executed() {
    return this.get('executed');
  }

}

exports.Transaction = Transaction;

function registerMultiSigTypes() {
  try {
    const typeRegistry = (0, _types.getTypeRegistry)();
    typeRegistry.register({
      TransactionId,
      BalanceOf: _types.BalanceOf,
      Wallet,
      Transaction
    });
  } catch (err) {
    console.error('Failed to register custom types of blogs module', err);
  }
}