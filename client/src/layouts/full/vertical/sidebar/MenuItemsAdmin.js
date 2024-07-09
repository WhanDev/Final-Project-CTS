import {
  IconListNumbers,
  IconUserCircle,
  IconAlbum,
  IconLayoutDashboard,
  IconUsers,
  IconRoute,
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
    href: '/admin/index',
  },
  {
    navlabel: true,
    subheader: 'จัดการข้อมูล',
  },
  {
    id: uniqueId(),
    title: 'ผู้ใช้งานระบบ',
    icon: IconUserCircle,
    href: '/admin/manage/user',
  },
  {
    id: uniqueId(),
    title: 'หลักสูตร',
    icon: IconAlbum,
    href: '/admin/manage/curriculum',
  },
  {
    id: uniqueId(),
    title: 'นักศึกษา',
    icon: IconUsers,
    href: '/admin/manage/student',
  },
  {
    id: uniqueId(),
    title: 'รายวิชานอกหลักสูตร',
    icon: IconListNumbers,
    href: '/admin/manage/extrasubject',
  },
  {
    id: uniqueId(),
    title: 'คู่เทียบ',
    icon: IconRoute,
    href: '/admin/manage/machsubject',
  },
  {
    id: uniqueId(),
    title: 'เทียบโอน',
    icon: IconLayersIntersect,
    href: '/admin/manage/transfer',
  },
  {
    id: uniqueId(),
    title: 'รายงาน',
    icon: IconClipboardText,
    href: '/admin/manage/report',
  },
  {
    navlabel: true,
    subheader: 'ข้อมูลผู้ใช้ระบบ',
  },
  {
    id: uniqueId(),
    title: 'ข้อมูลส่วนตัว',
    icon: IconAddressBook,
    href: '/admin/profile',
  },
  {
    id: uniqueId(),
    title: 'เปลี่ยนรหัสผ่าน',
    icon: IconSquareAsterisk,
    href: '/admin/changePassword',
  },
];

export default MenuItemsAdmin;
