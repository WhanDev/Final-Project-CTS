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
];

export default MenuItemsAdmin;
