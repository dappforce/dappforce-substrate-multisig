import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import './index.css';
import React from 'react';
declare type Props = AppProps & I18nProps;
declare class ExtrinsicsApp extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export { ExtrinsicsApp };
declare const _default: React.ComponentType<Pick<AppProps & import("../../ui-app/src/types").BareProps & import("react-i18next").WithTranslation, "style" | "className" | "location" | "basePath" | "onStatusChange">>;
export default _default;
