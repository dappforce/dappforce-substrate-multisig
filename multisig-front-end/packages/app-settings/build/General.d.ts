import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
import { ActionStatus } from '@polkadot/ui-app/Status/types';
import './index.css';
declare type Props = AppProps & I18nProps & {
    onStatusChange: (status: ActionStatus) => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "location" | "basePath" | "onStatusChange">>;
export default _default;
