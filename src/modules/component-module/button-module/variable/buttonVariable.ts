import basicButton from '/@/components/Button/BasicButton.vue';
import popConfirmButton from '/@/components/Button/PopConfirmButton.vue';
import { ExtractPropTypes } from 'vue';
import { basicButtonProps } from "/@/modules/component-module/button-module/variable/buttonProps";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";

export const BasicButton = initComponent(basicButton);
export const PopConfirmButton = initComponent(popConfirmButton);
export declare type ButtonProps = Partial<ExtractPropTypes<typeof basicButtonProps>>;
