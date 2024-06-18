<script lang="tsx">
  import type { FunctionalComponent } from 'vue';
  import {
    defineComponent,
    nextTick,
    onMounted,
    ref,
    unref,
    onUnmounted,
    computed,
    CSSProperties
  } from "vue";
  import { Menu, Divider } from 'ant-design-vue';
  import { ContextMenuItem } from "/@/modules/component-module/contextMenu-module/interface/ContextMenuItem";
  import { ItemContentProps } from "/@/modules/component-module/contextMenu-module/interface/ItemContentProps";
  import Icon from '/@/components/Icon/Icon.vue'
  import { contextMenuProp } from "/@/modules/component-module/contextMenu-module/variable/contextMenuProps";

  const prefixCls = 'context-menu';
  const ItemContent: FunctionalComponent<ItemContentProps> = (contextMenuProp) => {
    const { item } = contextMenuProp;
    return (
      <span
        style="display: inline-block; width: 100%; "
        class="px-4"
        onClick={contextMenuProp.handler.bind(null, item)}
      >
        {contextMenuProp.showIcon && item.icon && <Icon class="mr-2" icon={item.icon} />}
        <span>{item.label}</span>
      </span>
    );
  };

  export default defineComponent({
    name: 'ContextMenu',
    props: contextMenuProp,
    setup(props) {
      const wrapRef = ref(null);
      const showRef = ref(false);

      const contextMenuStyle = computed((): CSSProperties => {
        const { axis, items, styles, width } = props;
        const { x, y } = axis || { x: 0, y: 0 };
        const menuHeight = (items || []).length * 40;
        const menuWidth = width;
        const body = document.body;

        const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
        const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
        return {
          ...styles,
          position: 'absolute',
          width: `${width}px`,
          left: `${left + 1}px`,
          top: `${top + 1}px`,
        };
      });

      onMounted(() => {
        nextTick(() => (showRef.value = true));
      });

      onUnmounted(() => {
        const el = unref(wrapRef);
        el && document.body.removeChild(el);
      });

      function handleAction(item: ContextMenuItem, e: MouseEvent) {
        const { handler, disabled } = item;
        if (disabled) {
          return;
        }
        showRef.value = false;
        e?.stopPropagation();
        e?.preventDefault();
        handler?.();
      }

      function renderMenuItem(items: ContextMenuItem[]) {
        return items.map((item) => {
          const { disabled, label, children, divider = false } = item;

          const contentProps = {
            item,
            handler: handleAction,
            showIcon: props.showIcon,
          };

          if (!children || children.length === 0) {
            return (
              <>
                <Menu.Item disabled={disabled} class={`${prefixCls}__item`} key={label}>
                  <ItemContent {...contentProps} />
                </Menu.Item>
                {divider ? <Divider key={`d-${label}`} /> : null}
              </>
            );
          }
          if (!unref(showRef)) return null;

          return (
            <Menu.SubMenu key={label} disabled={disabled} popupClassName={`${prefixCls}__popup`}>
              {{
                title: () => <ItemContent {...contentProps} />,
                default: () => renderMenuItem(children),
              }}
            </Menu.SubMenu>
          );
        });
      }
      return () => {
        if (!unref(showRef)) {
          return null;
        }
        const { items } = props;
        return (
          <div class={prefixCls}>
            <Menu inlineIndent={12} mode="vertical" ref={wrapRef} style={unref(contextMenuStyle)}>
              {renderMenuItem(items)}
            </Menu>
          </div>
        );
      };
    },
  });
</script>
<style lang="less">
  @default-height: 42px !important;

  @small-height: 36px !important;

  @large-height: 36px !important;

  .item-style() {
    li {
      display: inline-block;
      width: 100%;
      height: @default-height;
      margin: 0 !important;
      line-height: @default-height;

      span {
        line-height: @default-height;
      }

      > div {
        margin: 0 !important;
      }

      &:not(.ant-menu-item-disabled):hover {
        color: @text-color-base;
        background-color: @item-hover-bg;
      }
    }
  }

  .context-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: block;
    width: 156px;
    margin: 0;
    list-style: none;
    background-color: @component-background;
    border: 1px solid rgb(0 0 0 / 8%);
    border-radius: 0.25rem;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 10%),
      0 1px 5px 0 rgb(0 0 0 / 6%);
    background-clip: padding-box;
    user-select: none;

    &__item {
      margin: 0 !important;
    }
    .item-style();

    .ant-divider {
      margin: 0;
    }

    &__popup {
      .ant-divider {
        margin: 0;
      }

      .item-style();
    }

    .ant-menu-submenu-title,
    .ant-menu-item {
      padding: 0 !important;
    }
  }
</style>
