/// <reference types="react" />
import { TypeDef } from '@polkadot/types';
import { BareProps } from '@polkadot/ui-app/types';
export declare type RawParam$Value = any | undefined;
export declare type RawParam$ValueArray = Array<RawParam$Value | Array<RawParam$Value>>;
export declare type RawParam$Values = RawParam$Value | RawParam$ValueArray;
export declare type RawParam = {
    isValid: boolean;
    value: RawParam$Values;
};
export declare type RawParam$OnChange$Value = {
    isValid: boolean;
    value: RawParam$Values;
};
export declare type RawParam$OnChange = (value: RawParam$OnChange$Value) => void;
export declare type RawParams = Array<RawParam>;
export declare type BaseProps = BareProps & {
    defaultValue: RawParam;
    name?: string;
    onChange?: RawParam$OnChange;
    type: TypeDef;
};
export declare type Props = BaseProps & {
    isDisabled?: boolean;
    isError?: boolean;
    isReadOnly?: boolean;
    label: string;
    withLabel?: boolean;
};
export declare type Size = 'full' | 'large' | 'medium' | 'small';
export declare type ComponentMap = {
    [index: string]: React.ComponentType<Props>;
};
