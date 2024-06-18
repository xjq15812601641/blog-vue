import { computed, CSSProperties } from "vue";

export class ContextMenuComp {
  static getContextMenuStyle(props) {
    computed((): CSSProperties => {
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
  }
}
