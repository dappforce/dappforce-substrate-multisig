import { SemanticShorthandItem } from 'semantic-ui-react/dist/commonjs/generic';
import { LabelProps } from 'semantic-ui-react/dist/commonjs/elements/Label';
export declare type LogType = 'error' | 'log';
export declare type Log = {
    args: Array<any>;
    type: LogType;
};
export declare type Snippet = {
    text: string;
    value: string;
    code: string;
    label?: SemanticShorthandItem<LabelProps>;
    type?: 'custom' | 'shared';
};
