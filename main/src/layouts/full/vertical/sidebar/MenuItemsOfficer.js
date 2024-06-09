import {
  IconListNumbers,
  IconRoute,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
  IconLayersIntersect,
  IconClipboardText,
  IconAddressBook,
  IconSquareAsterisk
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsAdmin = [
  {
    id: uniqueId(),
    title: 'หน้าแรก',
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
  {
    navlabel: true,
    subheader: 'ข้อมูลผู้ใช้ระบบ',
  },
  {
    id: uniqueId(),
    title: 'ข้อมูลส่วนตัว',
    icon: IconAddressBook,
    href: '/officer/profile',
  },
  {
    id: uniqueId(),
    title: 'เปลี่ยนรหัสผ่าน',
    icon: IconSquareAsterisk,
    href: '/officer/changePassword',
  },
];

export default MenuItemsAdmin;
