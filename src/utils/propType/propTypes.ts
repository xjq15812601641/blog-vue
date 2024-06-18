import { CSSProperties, VNodeChild } from 'vue';
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

//可以是VNodeChild类型或JSX.Element类型
export type VueNode = VNodeChild | JSX.Element;

//VueTypesInterface类型与style+VNodeChild交加类型
type PropTypes = VueTypesInterface & { readonly style: VueTypeValidableDef<CSSProperties>; readonly VNodeChild: VueTypeValidableDef<VueNode>; };

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined,
  },
]);
export { propTypes };
