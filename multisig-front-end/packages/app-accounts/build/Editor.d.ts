import { I18nProps } from '@polkadot/ui-app/types';
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { ComponentProps } from './types';
import React from 'react';
declare type Props = ComponentProps & I18nProps & {
    allAccounts?: SubjectInfo;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "location" | "basePath" | "onStatusChange" | "match" | "allAccounts">>;
export default _default;
