import { Options, SettingsStruct } from './types';
export declare class Settings implements SettingsStruct {
    private _apiUrl;
    private _i18nLang;
    private _uiMode;
    private _uiTheme;
    constructor();
    readonly apiUrl: string;
    readonly i18nLang: string;
    readonly uiMode: string;
    readonly isBasicMode: boolean;
    readonly isFullMode: boolean;
    readonly uiTheme: string;
    readonly availableNodes: Options;
    readonly availableCryptos: Options;
    readonly availableLanguages: Options;
    readonly availableUIModes: Options;
    readonly availableUIThemes: Options;
    get(): SettingsStruct;
    set(settings: Partial<SettingsStruct>): void;
}
declare const settings: Settings;
export default settings;
