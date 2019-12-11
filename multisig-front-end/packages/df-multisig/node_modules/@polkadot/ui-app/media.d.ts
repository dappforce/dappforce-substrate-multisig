import { ScreenSizes } from './constants';
declare type MediaCss = {
    [index in keyof typeof ScreenSizes]: (values: TemplateStringsArray) => any;
};
declare const media: MediaCss;
export default media;
