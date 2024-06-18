import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 150,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 150,
    customRender: ({ record }) => {
      return h('div', {}, (record as Recordable).meta.icon);
    },
  },
  {
    title: '权限标识',
    dataIndex: 'role',
    width: 80,
  },
  {
    title: '隐藏单个菜单',
    dataIndex: 'hideChildrenInMenu',
    customRender: ({ record }) => {
      const hideChildrenInMenu = (record as Recordable).hideChildrenInMenu;
      const color = hideChildrenInMenu ? 'green' : 'red';
      const text = hideChildrenInMenu ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '隐藏自身',
    dataIndex: 'hideMenu',
    customRender: ({ record }) => {
      const hideMenu = (record as Recordable).hideMenu;
      const color = hideMenu ? 'green' : 'red';
      const text = hideMenu ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '高亮回显',
    dataIndex: 'currentActiveMenu',
  },
  {
    title: '重定向地址',
    dataIndex: 'redirect',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '组件名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'pid',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    defaultValue: 0,
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'hideChildrenInMenu',
    label: '隐藏单个菜单',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    colProps: { span: 8 },
    defaultValue: false,
  },
  {
    field: 'hideMenu',
    label: '隐藏自身',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    colProps: { span: 8 },
    defaultValue: false,
  },
  {
    field: 'redirect',
    label: '重定向地址',
    component: 'Input',
  },
  {
    field: 'currentActiveMenu',
    label: '高亮回显',
    component: 'Input',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'Input',
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    defaultValue: 'Layout',
    required: true,
  },
  {
    field: 'role',
    label: '权限标识',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'visitor', value: 'visitor' },
        { label: 'super', value: 'super' },
      ],
    },
    colProps: { span: 8 },
    defaultValue: 'visitor',
    required: true,
  },
];
