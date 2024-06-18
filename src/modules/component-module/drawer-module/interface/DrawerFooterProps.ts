import { ButtonProps } from "ant-design-vue/lib/button/buttonTypes";

export interface DrawerFooterProps {
  showOkBtn: boolean;
  showCancelBtn: boolean;
  /**
   * Text of the Cancel button
   * @default 'cancel'
   * @type string
   */
  cancelText: string;
  /**
   * Text of the OK button
   * @default 'OK'
   * @type string
   */
  okText: string;

  /**
   * Button type of the OK button
   * @default 'primary'
   * @type string
   */
  okType: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default';
  /**
   * The ok button props, follow jsx rules
   * @type object
   */
  okButtonProps: { props: ButtonProps; on: {} };

  /**
   * The cancel button props, follow jsx rules
   * @type object
   */
  cancelButtonProps: { props: ButtonProps; on: {} };
  /**
   * Whether to apply loading visual effect for OK button or not
   * @default false
   * @type boolean
   */
  confirmLoading: boolean;

  showFooter: boolean;
  footerHeight: string | number;
}
