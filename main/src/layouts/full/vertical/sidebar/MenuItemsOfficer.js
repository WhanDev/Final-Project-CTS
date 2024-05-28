import {
  IconListNumbers,
  IconRoute,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
  IconLayersIntersect,
  IconClipboardText
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsAdmin = [
  {
    id: uniqueId(),
    title: 'แดชบอร์ด',
    icon: IconLayoutDashboard,
    href: '/officer/index',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'จัดการข้อมูล',
  },
  {
    id: uniqueId(),
    title: 'หลักสูตร',
    icon: IconAlbum,
    href: '/officer/manage/curriculum',
  },
  {
    id: uniqueId(),
    title: 'นักศึกษา',
    icon: IconUsers,
    href: '/officer/manage/student',
  },
  {
    id: uniqueId(),
    title: 'รายวิชานอกหลักสูตร',
    icon: IconListNumbers,
    href: '/officer/manage/extrasubject',
  },
  {
    id: uniqueId(),
    title: 'คู่เทียบ',
    icon: IconRoute,
    href: '/officer/manage/machsubject',
  },
  {
    id: uniqueId(),
    title: 'เทียบโอน',
    icon: IconLayersIntersect,
    href: '/officer/manage/transfer',
  },
  {
    id: uniqueId(),
    title: 'รายงาน',
    icon: IconClipboardText,
    href: '/officer/manage/report',
  },
];

export default MenuItemsAdmin;
