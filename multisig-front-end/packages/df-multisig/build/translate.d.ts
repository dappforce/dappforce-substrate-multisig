/// <reference types="react" />
declare const _default: <P extends import("react-i18next").WithTranslation>(component: import("react").ComponentType<P>) => import("react").ComponentType<Pick<P, Exclude<keyof P, "i18n" | "tReady" | "t">>>;
export default _default;
