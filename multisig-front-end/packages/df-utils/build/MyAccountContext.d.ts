import React from 'react';
export declare const MY_ADDRESS = "df.myAddress";
declare type MyAccountState = {
    inited: boolean;
    address?: string;
};
declare type MyAccountAction = {
    type: 'reload' | 'set' | 'forget' | 'forgetExact';
    address?: string;
};
export declare type MyAccountContextProps = {
    state: MyAccountState;
    dispatch: React.Dispatch<MyAccountAction>;
    set: (address: string) => void;
    forget: (address: string) => void;
};
export declare const MyAccountContext: React.Context<MyAccountContextProps>;
export declare function MyAccountProvider(props: React.PropsWithChildren<{}>): JSX.Element;
export declare function useMyAccount(): MyAccountContextProps;
export {};
