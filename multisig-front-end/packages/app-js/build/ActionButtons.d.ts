import { BareProps, I18nProps } from '@polkadot/ui-app/types';
import React from 'react';
declare type Props = BareProps & I18nProps & {
    isCustomExample: boolean;
    isRunning: boolean;
    saveSnippet: (snippetName: string) => void;
    generateLink: () => void;
    removeSnippet: () => void;
    runJs: () => void;
    snippetName?: string;
    stopJs: () => void;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "className" | "isRunning" | "snippetName" | "isCustomExample" | "saveSnippet" | "generateLink" | "removeSnippet" | "runJs" | "stopJs">>;
export default _default;
