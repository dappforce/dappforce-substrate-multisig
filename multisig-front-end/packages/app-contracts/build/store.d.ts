import { CodeJson, ContractJson } from './types';
import EventEmitter from 'eventemitter3';
import { AccountId, ContractAbi, Hash } from '@polkadot/types';
declare type CodeStored = {
    json: CodeJson;
    contractAbi?: ContractAbi;
};
declare type ContractStored = {
    json: ContractJson;
    contractAbi: ContractAbi;
};
declare class Store extends EventEmitter {
    private allCode;
    private allContracts;
    readonly hasCode: boolean;
    readonly hasContracts: boolean;
    getAllCode(): Array<CodeStored>;
    getAllContracts(): Array<ContractStored>;
    getCode(codeHash: string): CodeStored;
    getContract(address: string): ContractStored;
    saveCode(codeHash: Hash, partial: Partial<CodeJson>): Promise<void>;
    saveContract(address: AccountId, partial: Partial<ContractJson>): Promise<void>;
    loadAll(): Promise<void>;
    private addCode;
    private addContract;
}
declare const _default: Store;
export default _default;
