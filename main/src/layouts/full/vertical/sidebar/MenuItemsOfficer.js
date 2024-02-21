import {
  IconListNumbers,
  IconUserCircle,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsAdmin = [
  {
    id: uniqueId(),
    title: 'แดชบอร์ด',
    icon: IconLayoutDashboard,
    href: '/Officer/Index',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'จัดการข้อมูล',
  },
  {
    id: uniqueId(),
    title: 'เจ้าหน้าที่',
    icon: IconUserCircle,
    href: '/manage/officer',
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
];

export default MenuItemsAdmin;
