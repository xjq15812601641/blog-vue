import { verifyFriendLink } from '/@/api/Link';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import { BlogMessage } from "/@/modules/message-module/blogMessage";

export const columns: BasicColumn[] = [
  {
    title: '网站名称',
    dataIndex: 'siteName',
  },
  {
    title: '网站描述',
    dataIndex: 'desc',
  },
  {
    title: '网站图标',
    dataIndex: 'logo',
    width: 80,
    customRender: ({ record }) => {
      return h('img', {
        src: (record as Recordable).logo,
        style: { display: 'inline-block', width: '50px', height: '50px', 'border-radius': '50%' },
      });
    },
  },
  {
    title: '网站地址',
    dataIndex: 'siteUrl',
    customRender: ({ record }) => {
      return h(
        'a',
        { href: (record as Recordable).siteUrl, target: '_blank' },
        (record as Recordable).siteUrl,
      );
    },
  },
  {
    title: '验证结果',
    dataIndex: 'hasVerified',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: (record as Recordable).hasVerified === true,
        checkedChildren: '通过',
        unCheckedChildren: '不通过',
        onChange(checked: boolean) {
          const newStatus = checked;
          const { createMessage } = BlogMessage.useMessage();
          verifyFriendLink((record as Recordable).id, { verify: newStatus })
            .then(() => {
              (record as Recordable).hasVerified = newStatus;
              createMessage.success(`操作成功`);
            })
            .catch(() => {
              createMessage.error('操作成功');
            });
        },
      });
    },
  },
];
