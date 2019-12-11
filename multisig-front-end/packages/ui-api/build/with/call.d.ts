import { ApiProps } from '../types';
import { Options } from './types';
import React from 'react';
export default function withCall<P extends ApiProps>(endpoint: string, { at, atProp, callOnResult, params, paramName, paramValid, propName, transform }?: Options): (Inner: React.ComponentType<ApiProps>) => React.ComponentType<any>;
