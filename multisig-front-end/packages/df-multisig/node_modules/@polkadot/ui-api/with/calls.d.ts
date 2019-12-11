import { ApiProps, Subtract } from '../types';
import { Options } from './types';
import React from 'react';
declare type Call = string | [string, Options];
export default function withCalls<P>(...calls: Array<Call>): (Component: React.ComponentType<P>) => React.ComponentType<Subtract<P, ApiProps>>;
export {};
