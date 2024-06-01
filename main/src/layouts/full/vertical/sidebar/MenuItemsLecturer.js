import {
  IconListNumbers,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
  IconRoute,
  IconLayersIntersect,
  IconClipboardText
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsLecturer = [
  {
    id: uniqueId(),
    title: 'หน้าแรก',
    icon: IconLayoutDashboard,
    href: '/lecturer/index',
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
    href: '/lecturer/manage/curriculum',
  },
  {
    id: uniqueId(),
    title: 'นักศึกษา',
    icon: IconUsers,
    href: '/lecturer/manage/student',
  },
  {
    id: uniqueId(),
    title: 'รายวิชานอกหลักสูตร',
    icon: IconListNumbers,
    href: '/lecturer/manage/extrasubject',
  },
  {
    id: uniqueId(),
    title: 'คู่เทียบ',
    icon: IconRoute,
    href: '/lecturer/manage/machsubject',
  },
  {
    id: uniqueId(),
    title: 'เทียบโอน',
    icon: IconLayersIntersect,
    href: '/lecturer/manage/transfer',
  },
  {
    id: uniqueId(),
    title: 'รายงาน',
    icon: IconClipboardText,
    href: '/lecturer/manage/report',
  },
];

export default MenuItemsLecturer;
