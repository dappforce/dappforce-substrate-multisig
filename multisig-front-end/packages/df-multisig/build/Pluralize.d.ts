/// <reference types="react" />
import BN from 'bn.js';
declare type PluralizeProps = {
    count: number | BN;
    singularText: string;
    pluralText?: string;
};
export declare function Pluralize(props: PluralizeProps): JSX.Element;
export {};
