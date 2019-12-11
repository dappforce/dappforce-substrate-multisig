import SUIDivider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import SUIMenu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
declare type MenuDef = typeof SUIMenu & {
    Divider: typeof SUIDivider;
};
declare const Menu: MenuDef;
export default Menu;
