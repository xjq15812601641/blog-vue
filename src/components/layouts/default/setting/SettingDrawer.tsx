import { defineComponent, unref } from 'vue';
import { Divider } from 'ant-design-vue';
import SettingFooter from './SettingFooter.vue';
import { useRootSetting } from "/@/modules/component-module/layout-module/method/setting/rootSetting";
import BasicDrawer from "/@/components/Drawer/BasicDrawer.vue";
import SelectItem from "/@/components/layouts/default/setting/components/SelectItem.vue";
import { HandlerEnum } from "/@/enums/HandlerEnum";
import { thememOptions } from "/@/modules/component-module/layout-module/variable/layoutVariable";
import SwitchItem from "/@/components/layouts/default/setting/components/SwitchItem.vue";

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { currentTheme, getCanvas, getGrayMode, getColorWeak } = useRootSetting();
    function renderTheme() {
      return (
        <>
          <SelectItem
            title="主题背景选择"
            def={unref(currentTheme)}
            event={HandlerEnum.CHANGE_THEME}
            options={thememOptions}
          />
          <SwitchItem
            title="背景动效开关"
            event={HandlerEnum.TOGGLE_CANVAS}
            def={unref(getCanvas)}
          />
          <SwitchItem title="灰色模式" event={HandlerEnum.GRAY_MODE} def={unref(getGrayMode)} />
          <SwitchItem title="色弱模式" event={HandlerEnum.COLOR_WEAK} def={unref(getColorWeak)} />
        </>
      );
    }

    return () => (
      <BasicDrawer {...attrs} title={'设置'} width={300} class="setting-drawer">
        {renderTheme()}
        <Divider />
        <SettingFooter />
      </BasicDrawer>
    );
  },
});
