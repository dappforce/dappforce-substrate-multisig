import { OnChangeCb } from '../types';
import React from 'react';
export declare type Transform = (value: any, index: number) => any;
export declare type DefaultProps = {
    callOnResult?: OnChangeCb;
    [index: string]: any;
};
export declare type Options = {
    at?: Uint8Array | string;
    atProp?: string;
    callOnResult?: OnChangeCb;
    params?: Array<any>;
    paramName?: string;
    paramValid?: boolean;
    propName?: string;
    transform?: Transform;
};
export declare type RenderFn = (value?: any) => React.ReactNode;
export declare type StorageTransform = (input: any, index: number) => any | null;
export declare type HOC = (Component: React.ComponentType<any>, defaultProps?: DefaultProps, render?: RenderFn) => React.ComponentType<any>;
export declare type ApiMethod = {
    name: string;
    section?: string;
};
export declare type ComponentRenderer = (render: RenderFn, defaultProps?: DefaultProps) => React.ComponentType<any>;
export declare type OmitProps<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type SubtractProps<T, K> = OmitProps<T, keyof K>;
