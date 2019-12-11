/// <reference types="react" />
import { TypeDef } from '@polkadot/types';
import { Props, ComponentMap } from '../types';
export default function findComponent(def: TypeDef, overrides?: ComponentMap): React.ComponentType<Props>;
