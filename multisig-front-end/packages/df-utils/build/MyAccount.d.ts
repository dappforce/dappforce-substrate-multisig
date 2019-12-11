import React from 'react';
export declare type MyAddressProps = {
    myAddress?: string;
};
export declare type MyAccountProps = MyAddressProps;
export declare const withMyAccount: <P extends MyAddressProps>(Component: React.ComponentType<P>) => React.ComponentType<any>;
