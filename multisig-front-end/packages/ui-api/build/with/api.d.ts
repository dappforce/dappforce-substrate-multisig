import { ApiProps } from '../types';
import { DefaultProps } from './types';
import React from 'react';
export default function withApi<P extends ApiProps>(Inner: React.ComponentType<P>, defaultProps?: DefaultProps): React.ComponentType<any>;
