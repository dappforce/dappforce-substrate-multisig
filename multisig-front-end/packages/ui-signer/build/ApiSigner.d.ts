import { Signer } from '@polkadot/api/types';
import { SubmittableResult } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { QueueTx$ExtrinsicAdd, QueueTx$MessageSetStatus } from '@polkadot/ui-app/Status/types';
import { SignatureOptions } from '@polkadot/types/types';
import { Hash } from '@polkadot/types';
export default class ApiSigner implements Signer {
    private _queueExtrinsic;
    private _queueSetTxStatus;
    constructor(queueExtrinsic: QueueTx$ExtrinsicAdd, queueSetTxStatus: QueueTx$MessageSetStatus);
    sign(extrinsic: SubmittableExtrinsic, accountId: string, signerOptions: SignatureOptions): Promise<number>;
    update(id: number, result: Hash | SubmittableResult): void;
}
