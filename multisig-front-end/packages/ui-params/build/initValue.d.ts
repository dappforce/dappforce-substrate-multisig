import { RawParam$Value } from './types';
import { TypeDef } from '@polkadot/types';
export default function getInitValue(def: TypeDef): RawParam$Value | Array<RawParam$Value>;
