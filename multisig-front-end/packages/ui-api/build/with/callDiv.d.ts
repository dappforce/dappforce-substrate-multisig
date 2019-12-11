import { DefaultProps, Options } from './types';
import React from 'react';
export default function withCallDiv<T>(endpoint: string, options?: Options): (render: (value?: T | undefined) => React.ReactNode, defaultProps?: DefaultProps) => React.ComponentType<any>;
