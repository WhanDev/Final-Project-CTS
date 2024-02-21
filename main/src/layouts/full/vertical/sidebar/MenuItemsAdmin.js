import {
  IconListNumbers,
  IconUserCircle,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
  IconRoute,
  IconLayersIntersect
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsAdmin = [
  {
    id: uniqueId(),
    title: 'แดชบอร์ด',
    icon: IconLayoutDashboard,
    href: '/Admin/Index',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'จัดการข้อมูล',
  },
  {
    id: uniqueId(),
    title: 'ผู้ใช้งานระบบ',
    icon: IconUserCircle,
    href: '/manage/admin',
  },
  {
    id: uniqueId(),
    title: 'หลักสูตร',
    icon: IconAlbum,
    href: '/manage/curriculum',
  },
  {
    id: uniqueId(),
    title: 'นักศึกษา',
    icon: IconUsers,
    href: '/manage/student',
  },
  {
    id: uniqueId(),
    title: 'รายวิชานอกหลักสูตร',
    icon: IconListNumbers,
    href: '/manage/extrasubject',
  },
  {
    id: uniqueId(),
    title: 'คู่เทียบ',
    icon: IconRoute,
    href: '/manage/machsubject',
  },
  {
    id: uniqueId(),
    title: 'เทียบโอน',
    icon: IconLayersIntersect,
    href: '#',
  },
];

export default MenuItemsAdmin;
