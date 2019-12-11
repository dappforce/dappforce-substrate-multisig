import { Health, PeerInfo, PendingExtrinsics } from '@polkadot/types';
export declare type Info = {
    health?: Health | null;
    peers?: Array<PeerInfo> | null;
    extrinsics?: PendingExtrinsics | null;
};
