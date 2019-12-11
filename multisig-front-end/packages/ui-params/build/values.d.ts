import { TypeDef } from '@polkadot/types';
import { RawParam } from './types';
export default function values(params: Array<{
    type: TypeDef;
}>): Array<RawParam>;
