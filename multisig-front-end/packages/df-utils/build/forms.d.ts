import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { BareProps } from '@polkadot/ui-app/types';
declare type FormValuesType = {
    [s: string]: string;
};
declare type LabelledProps<FormValues = FormValuesType> = BareProps & {
    name?: keyof FormValues;
    label?: React.ReactNode;
    invisibleLabel?: boolean;
    placeholder?: string;
    children?: JSX.Element | JSX.Element[];
    errors: FormikErrors<FormValues>;
    touched: FormikTouched<FormValues>;
    isSubmitting: boolean;
};
export declare function LabelledField<FormValues = FormValuesType>(): (props: LabelledProps<FormValues>) => JSX.Element;
export declare function LabelledText<FormValues = FormValuesType>(): (props: LabelledProps<FormValues>) => JSX.Element;
export {};
