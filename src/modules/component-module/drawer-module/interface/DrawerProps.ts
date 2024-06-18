import { CSSProperties, VNodeChild } from "vue";
import {
  ScrollContainerOptions
} from "/@/modules/component-module/container-module/interface/scrollContainerOptions";
import {
  DrawerFooterProps
} from "/@/modules/component-module/drawer-module/interface/DrawerFooterProps";

export interface DrawerProps extends DrawerFooterProps {
  isDetail?: boolean;
  loading?: boolean;
  showDetailBack?: boolean;
  visible?: boolean;
  /**
   * Built-in ScrollContainer component configuration
   * @type ScrollContainerOptions
   */
  scrollOptions?: ScrollContainerOptions;
  closeFunc?: () => Promise<any>;
  triggerWindowResize?: boolean;
  /**
   * Whether a close (x) button is visible on top right of the Drawer dialog or not.
   * @default true
   * @type boolean
   */
  closable?: boolean;

  /**
   * Whether to unmount child components on closing drawer or not.
   * @default false
   * @type boolean
   */
  destroyOnClose?: boolean;

  /**
   * Return the mounted node for Drawer.
   * @default 'body'
   * @type any ( HTMLElement| () => HTMLElement | string)
   */
  getContainer?: () => HTMLElement | string;

  /**
   * Whether to show mask or not.
   * @default true
   * @type boolean
   */
  mask?: boolean;

  /**
   * Clicking on the mask (area outside the Drawer) to close the Drawer or not.
   * @default true
   * @type boolean
   */
  maskClosable?: boolean;

  /**
   * Style for Drawer's mask element.
   * @default {}
   * @type object
   */
  maskStyle?: CSSProperties;

  /**
   * The title for Drawer.
   * @type any (string | slot)
   */
  title?: VNodeChild | JSX.Element;
  /**
   * The class name of the container of the Drawer dialog.
   * @type string
   */
  wrapClassName?: string;
  class?: string;
  /**
   * Style of wrapper element which **contains mask** compare to `drawerStyle`
   * @type object
   */
  wrapStyle?: CSSProperties;

  /**
   * Style of the popup layer element
   * @type object
   */
  drawerStyle?: CSSProperties;

  /**
   * Style of floating layer, typically used for adjusting its position.
   * @type object
   */
  bodyStyle?: CSSProperties;
  headerStyle?: CSSProperties;

  /**
   * Width of the Drawer dialog.
   * @default 256
   * @type string | number
   */
  width?: string | number;

  /**
   * placement is top or bottom, height of the Drawer dialog.
   * @type string | number
   */
  height?: string | number;

  /**
   * The z-index of the Drawer.
   * @default 1000
   * @type number
   */
  zIndex?: number;

  /**
   * The placement of the Drawer.
   * @default 'right'
   * @type string
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  afterVisibleChange?: (visible?: boolean) => void;
  keyboard?: boolean;
  /**
   * Specify a callback that will be called when a user clicks mask, close button or Cancel button.
   */
  onClose?: (e?: Event) => void;
}
