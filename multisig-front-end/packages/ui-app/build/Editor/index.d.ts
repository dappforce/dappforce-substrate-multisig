import { BareProps } from '@polkadot/ui-app/types';
import React from 'react';
import './style.css';
declare type Props = BareProps & {
    code: string;
    isValid?: boolean;
    onEdit: (code: string) => void;
};
/**
 * @name Editor
 * @summary A code editor based on the codeflask npm module
 * @description It allows to live-edit code examples and JSON files.
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import {Editor} from '@polkadot/ui-app';
 *
 * <Editor
 *    className={string} // optional
 *    code={string}
 *    isValid={boolean}, // optional
 *    onEdit={() => callbackFunction}
 *  />
 * ```
 */
export default class Editor extends React.Component<Props> {
    private id;
    private editor;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: Props): boolean;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
