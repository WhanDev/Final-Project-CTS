import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

//Layouts
const RouterStudent = Loadable(lazy(() => import('../routes/RouterStudent')));
const RouterAdmin = Loadable(lazy(() => import('../routes/RouterAdmin')));
const RouterOfficer = Loadable(lazy(() => import('../routes/RouterOfficer')));
const RouterLecturer = Loadable(lazy(() => import('../routes/RouterLecturer')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const AuthRole = Loadable(lazy(() => import('../views/authentication/AuthRole')));
const LoginStudent = Loadable(lazy(() => import('../views/authentication/LoginStudent')));
const LoginAdmin = Loadable(lazy(() => import('../views/authentication/LoginAdmin')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// IndexPage
const IndexPage = Loadable(lazy(() => import('../views/pages/Index/IndexPage')));

//Admin
const IndexAdmin = Loadable(lazy(() => import('../views/pages/Admin/IndexAdmin')));
const ManageAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/ManageAdmin')));
const AddAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/AddAdmin')));
const EditAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/EditAdmin')));
const ManageStudent = Loadable(lazy(() => import('../views/pages/Admin/Student/ManageStudent')));
const AddStudent = Loadable(lazy(() => import('../views/pages/Admin/Student/Addstudent')));
const EditStudent = Loadable(lazy(() => import('../views/pages/Admin/Student/EditStudent')));

const ManageCurriculum = Loadable(
  lazy(() => import('../views/pages/Admin/Curriculum/ManageCurriculum')),
);
const AddCurriculum = Loadable(lazy(() => import('../views/pages/Admin/Curriculum/AddCurriculum')));
const EditCurriculum = Loadable(
  lazy(() => import('../views/pages/Admin/Curriculum/EditCurriculum')),
);

const ManageStructure = Loadable(
  lazy(() => import('../views/pages/Admin/Structure/ManageStructure')),
);
const AddStructure = Loadable(lazy(() => import('../views/pages/Admin/Structure/AddStructure')));
const EditStructure = Loadable(lazy(() => import('../views/pages/Admin/Structure/EditStructure')));
const AddSubject = Loadable(lazy(() => import('../views/pages/Admin/Subject/AddSubject')));
const EditSubject = Loadable(lazy(() => import('../views/pages/Admin/Subject/EditSubject')));
const ManageExtraSubject = Loadable(
  lazy(() => import('../views/pages/Admin/ExtraSubject/ManageExtraSubject')),
);
const AddExtraSubject = Loadable(
  lazy(() => import('../views/pages/Admin/ExtraSubject/AddExtraSubject')),
);
const EditExtraSubject = Loadable(
  lazy(() => import('../views/pages/Admin/ExtraSubject/EditExtraSubject')),
);
const ManageMachSubject = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/ManageMachSubject')),
);
const ListMachSubject = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/ListMachSubject')),
);
const AddMachSubjectList = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/AddMachSubjectList')),
);
const EditMachSubjectList = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/EditMachSubjectList')),
);
const ManageTransfer = Loadable(lazy(() => import('../views/pages/Admin/Transfer/ManageTransfer')));
const CheckOrderTransfer = Loadable(lazy(() => import('../views/pages/Admin/Transfer/CheckOrderTransfer')));
const ApproveOrderTransfer = Loadable(
  lazy(() => import('../views/pages/Admin/Transfer/ApproveOrderTransfer')),
);
const ConfirmOrderTransfer = Loadable(
  lazy(() => import('../views/pages/Admin/Transfer/ConfirmOrderTransfer')),
);

const ManageReport = Loadable(lazy(() => import('../views/pages/Admin/Report/ManageReport')));

//Officer
const IndexOfficer = Loadable(lazy(() => import('../views/pages/Officer/IndexOfficer')));
const ManageCurriculumOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Curriculum/ManageCurriculum')),
);
const AddCurriculumOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Curriculum/AddCurriculum')),
);
const EditCurriculumOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Curriculum/EditCurriculum')),
);
const ManageStructureOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Structure/ManageStructure')),
);
const AddStructureOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Structure/AddStructure')),
);
const EditStructureOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Structure/EditStructure')),
);
const AddSubjectOfficer = Loadable(lazy(() => import('../views/pages/Officer/Subject/AddSubject')));
const EditSubjectOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Subject/EditSubject')),
);
const ManageStudentOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Student/ManageStudent')),
);
const AddStudentOfficer = Loadable(lazy(() => import('../views/pages/Officer/Student/Addstudent')));
const EditStudentOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/Student/EditStudent')),
);
const ManageExtraSubjectOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/ExtraSubject/ManageExtraSubject')),
);
const AddExtraSubjectOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/ExtraSubject/AddExtraSubject')),
);
const EditExtraSubjectOfficer = Loadable(
  lazy(() => import('../views/pages/Officer/ExtraSubject/EditExtraSubject')),
);

//Lecturer
const IndexLecturer = Loadable(lazy(() => import('../views/pages/Lecturer/IndexLecturer')));
const ManageStructureLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Structure/ManageStructure')),
);
const AddStructureLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Structure/AddStructure')),
);
const EditStructureLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Structure/EditStructure')),
);
const AddSubjectLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Subject/AddSubject')),
);
const EditSubjectLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Subject/EditSubject')),
);
const ManageStudentLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Student/ManageStudent')),
);
const AddStudentLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Student/Addstudent')),
);
const EditStudentLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/Student/EditStudent')),
);
const ManageExtraSubjectLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/ExtraSubject/ManageExtraSubject')),
);
const AddExtraSubjectLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/ExtraSubject/AddExtraSubject')),
);
const EditExtraSubjectLecturer = Loadable(
  lazy(() => import('../views/pages/Lecturer/ExtraSubject/EditExtraSubject')),
);

//Student
const IndexStudent = Loadable(lazy(() => import('../views/pages/Student/IndexStudent')));
const CurriculumStudent = Loadable(
  lazy(() => import('../views/pages/Student/Structure/ManageStructure')),
);
const TransferStudent = Loadable(lazy(() => import('../views/pages/Student/Transfer/Transfer')));
const TransferCheckStudent = Loadable(lazy(() => import('../views/pages/Student/Transfer/Check')));
const TransferMachStudent = Loadable(lazy(() => import('../views/pages/Student/Transfer/Mach')));
const StudentProfile = Loadable(lazy(() => import('../views/pages/Student/StudentProfile')));
const StudentProfileEdit = Loadable(
  lazy(() => import('../views/pages/Student/StudentProfileEdit')),
);

const ShowMachSubject = Loadable(lazy(() => import('../views/pages/MachSubject/ShowMachSubject')));
const ShowListMachSubject = Loadable(
  lazy(() => import('../views/pages/MachSubject/ShowListMachSubject')),
);
const TestTransfer = Loadable(lazy(() => import('../views/pages/Tester/TestTransfer')));
const TestCheck = Loadable(lazy(() => import('../views/pages/Tester/TestCheck')));
const MachTestTransfer = Loadable(lazy(() => import('../views/pages/Tester/MachTestTransfer')));
const Curriculum = Loadable(lazy(() => import('../views/pages/Curriculum/ManageCurriculum')));
const ShowCurriculum = Loadable(lazy(() => import('../views/pages/Curriculum/ListCurriculum')));
const Structure = Loadable(lazy(() => import('../views/pages/Curriculum/ManageStructure')));
const ShowStructure = Loadable(lazy(() => import('../views/pages/Curriculum/ListStructure')));

const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable')));

const Router = [
  {
    //แอดมิน
    element: <RouterAdmin />,
    children: [
      //หน้าแรก
      { path: '/admin/index', element: <IndexAdmin /> },

      //จัดการผู้ใช้ระบบ
      { path: '/admin/manage/user', element: <ManageAdmin /> },
      { path: '/admin/manage/user/add', element: <AddAdmin /> },
      { path: '/admin/manage/user/:_id', element: <EditAdmin /> },

      //จัดการข้อมูลหลักสูตร
      { path: '/admin/manage/curriculum', element: <ManageCurriculum /> },
      { path: '/admin/manage/curriculum/add', element: <AddCurriculum /> },
      { path: '/admin/manage/curriculum/:_id/structure/edit/CS-:_id', element: <EditCurriculum /> },

      //จัดการข้อมูลโครงสร้าง
      {
        path: '/admin/manage/curriculum/:curriculum/structure/:structure_id',
        element: <ManageStructure />,
      },
      {
        path: '/admin/manage/curriculum/:curriculum/structure/:structure_id/add',
        element: <AddStructure />,
      },
      {
        path: '/admin/manage/curriculum/:curriculum/structure/:structure_id/edit/:_id',
        element: <EditStructure />,
      },

      //จัดการข้อมูลรายวิชา
      {
        path: '/admin/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/add',
        element: <AddSubject />,
      },
      {
        path: '/admin/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/edit/:_id',
        element: <EditSubject />,
      },

      //จัดการข้อมูลนักศึกษา
      { path: '/admin/manage/student', element: <ManageStudent /> },
      { path: '/admin/manage/student/add', element: <AddStudent /> },
      { path: '/admin/manage/student/edit/:_id', element: <EditStudent /> },

      //จัดการข้อมูลรายวิชานอก
      { path: '/admin/manage/extrasubject', element: <ManageExtraSubject /> },
      { path: '/admin/manage/extrasubject/add', element: <AddExtraSubject /> },
      { path: '/admin/manage/extrasubject/edit/:_id', element: <EditExtraSubject /> },

      //จัดการข้อมูลคู่เทียบรายวิชา
      { path: '/admin/manage/machsubject', element: <ManageMachSubject /> },
      {
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id',
        element: <ListMachSubject />,
      },
      {
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id/:subject_id/add',
        element: <AddMachSubjectList />,
      },
      {
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id/:subject_id/:_id/edit',
        element: <EditMachSubjectList />,
      },

      //จัดการข้อมูลเทียบโอน ManageTransfer
      {
        path: '/admin/manage/transfer',
        element: <ManageTransfer />,
      },
      {
        path: '/admin/manage/transfer/check/:_id',
        element: <CheckOrderTransfer />,
      },
      {
        path: '/admin/manage/transfer/approve/:_id',
        element: <ApproveOrderTransfer />,
      },
      {
        path: '/admin/manage/transfer/confirm/:_id',
        element: <ConfirmOrderTransfer />,
      },
      //รายงาน
      {
        path: '/admin/manage/report',
        element: <ManageReport />,
      },
    ],
  },
  {
    element: <RouterOfficer />,
    children: [
      //หน้าแรก
      { path: '/officer/index', element: <IndexOfficer /> },
      //จัดการข้อมูลหลักสูตร
      { path: '/officer/manage/curriculum', element: <ManageCurriculumOfficer /> },
      { path: '/officer/manage/curriculum/add', element: <AddCurriculumOfficer /> },
      {
        path: '/officer/manage/curriculum/:_id/structure/edit/CS-:_id',
        element: <EditCurriculumOfficer />,
      },
      //จัดการข้อมูลโครงสร้าง
      {
        path: '/officer/manage/curriculum/:curriculum/structure/:structure_id',
        element: <ManageStructureOfficer />,
      },
      {
        path: '/officer/manage/curriculum/:curriculum/structure/:structure_id/add',
        element: <AddStructureOfficer />,
      },
      {
        path: '/officer/manage/curriculum/:curriculum/structure/:structure_id/edit/:_id',
        element: <EditStructureOfficer />,
      },
      //จัดการข้อมูลรายวิชา
      {
        path: '/officer/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/add',
        element: <AddSubjectOfficer />,
      },
      {
        path: '/officer/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/edit/:_id',
        element: <EditSubjectOfficer />,
      },
      //จัดการข้อมูลนักศึกษา
      { path: '/officer/manage/student', element: <ManageStudentOfficer /> },
      { path: '/officer/manage/student/add', element: <AddStudentOfficer /> },
      { path: '/officer/manage/student/edit/:_id', element: <EditStudentOfficer /> },

      //จัดการข้อมูลรายวิชานอก
      { path: '/officer/manage/extrasubject', element: <ManageExtraSubjectOfficer /> },
      { path: '/officer/manage/extrasubject/add', element: <AddExtraSubjectOfficer /> },
      { path: '/officer/manage/extrasubject/edit/:_id', element: <EditExtraSubjectOfficer /> },
    ],
  },
  {
    element: <RouterLecturer />,
    children: [
      { path: '/lecturer/index', element: <IndexLecturer /> },
      //จัดการข้อมูลหลักสูตร
      //จัดการข้อมูลโครงสร้าง
      {
        path: '/lecturer/manage/curriculum/',
        element: <ManageStructureLecturer />,
      },
      {
        path: '/lecturer/manage/curriculum/:curriculum/structure/:structure_id/add',
        element: <AddStructureLecturer />,
      },
      {
        path: '/lecturer/manage/curriculum/:curriculum/structure/:structure_id/edit/:_id',
        element: <EditStructureLecturer />,
      },
      //จัดการข้อมูลรายวิชา
      {
        path: '/lecturer/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/add',
        element: <AddSubjectLecturer />,
      },
      {
        path: '/lecturer/manage/curriculum/:curriculum/structure/:structure_id/group/:group_id/subject/edit/:_id',
        element: <EditSubjectLecturer />,
      },
      //จัดการข้อมูลนักศึกษา
      { path: '/lecturer/manage/student', element: <ManageStudentLecturer /> },
      { path: '/lecturer/manage/student/add', element: <AddStudentLecturer /> },
      { path: '/lecturer/manage/student/edit/:_id', element: <EditStudentLecturer /> },

      //จัดการข้อมูลรายวิชานอก
      { path: '/lecturer/manage/extrasubject', element: <ManageExtraSubjectLecturer /> },
      { path: '/lecturer/manage/extrasubject/add', element: <AddExtraSubjectLecturer /> },
      { path: '/lecturer/manage/extrasubject/edit/:_id', element: <EditExtraSubjectLecturer /> },
    ],
  },
  {
    element: <RouterStudent />,
    children: [
      { path: '/student/Index', element: <IndexStudent /> },
      { path: '/student/curriculum', element: <CurriculumStudent /> },
      { path: '/student/transfer', element: <TransferStudent /> },
      { path: '/student/check', element: <TransferCheckStudent /> },
      { path: '/student/mach', element: <TransferMachStudent /> },
      { path: '/student/profile', element: <StudentProfile /> },
      { path: '/student/profile/edit', element: <StudentProfileEdit /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/AuthRole', element: <AuthRole /> },
      { path: '/Login/Student', element: <LoginStudent /> },
      { path: '/Login/Admin', element: <LoginAdmin /> },
      { path: '/machsubject', element: <ShowMachSubject /> },
      {
        path: '/machsubject/curriculum/:curriculum/structure/:structure_id',
        element: <ShowListMachSubject />,
      },
      { path: '/test', element: <TestTransfer /> },
      { path: '/test/check', element: <TestCheck /> },
      { path: '/test/mach', element: <MachTestTransfer /> },
      { path: '/curriculum', element: <Curriculum /> },
      { path: '/curriculum/:curriculum/structure/:structure_id', element: <Structure /> },
      { path: '/', element: <IndexPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
