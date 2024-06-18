<script lang="tsx">
  import { getPopupContainer } from '/@/utils/BlogUtils';
  import { getSlot } from '/@/utils/BlogUtils';
  import { computed, CSSProperties, defineComponent, unref } from "vue";
  import { Tooltip } from 'ant-design-vue';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { isArray, isString } from '/@/utils/is/is';
  import { basicHelpProps } from "/@/modules/component-module/basic-module/variable/basicProps";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  export default defineComponent({
    name: 'BasicHelp',
    components: { Tooltip },
    props: basicHelpProps,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-help');
      const tooltipStyle = computed((): CSSProperties => ({ color: props.color, fontSize: props.fontSize }),);
      const overlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

      function renderTitle() {
        const textList = props.text;
        if (isString(textList)) {
          return <p>{textList}</p>;
        }
        if (isArray(textList)) {
          return textList.map((text, index) => {
            return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
            );
          });
        }
        return null;
      }

      return () => {
        return (
          <Tooltip
            overlayClassName={`${prefixCls}__wrap`}
            title={<div style={unref(tooltipStyle)}>{renderTitle()}</div>}
            autoAdjustOverflow={true}
            overlayStyle={unref(overlayStyle)}
            placement={props.placement as 'right'}
            getPopupContainer={() => getPopupContainer()}
          >
            <span class={prefixCls}>{getSlot(slots) || <InfoCircleOutlined />}</span>
          </Tooltip>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-help';

  .@{prefix-cls} {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
    color: @text-color-help-dark;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
