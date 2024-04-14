import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const RouterStudent = Loadable(lazy(() => import('../routes/RouterStudent')));
const RouterAdmin = Loadable(lazy(() => import('../routes/RouterAdmin')));
const RouterOfficer = Loadable(lazy(() => import('../routes/RouterOfficer')));
const RouterLecturer = Loadable(lazy(() => import('../routes/RouterLecturer')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')),
);
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));

// Pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));
const Treeview = Loadable(lazy(() => import('../views/pages/treeview/Treeview')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import('../views/forms/form-elements/MuiAutoComplete')),
);
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch')));

// form layout
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));
const QuillEditor = Loadable(lazy(() => import('../views/forms/quill-editor/QuillEditor')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));

// tables
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable')));
const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

// chart
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart')));
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart')));

// ui
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));

const AuthRole = Loadable(lazy(() => import('../views/authentication/AuthRole')));
const LoginStudent = Loadable(lazy(() => import('../views/authentication/LoginStudent')));
const LoginAdmin = Loadable(lazy(() => import('../views/authentication/LoginAdmin')));

const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// IndexPage
const IndexPage = Loadable(lazy(() => import('../views/pages/Index/IndexPage')));

//Admin
const IndexAdmin = Loadable(lazy(() => import('../views/pages/Admin/IndexAdmin')));
const ManageAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/ManageAdmin')));
const AddAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/AddAdmin')));
const EditAdmin = Loadable(lazy(() => import('../views/pages/Admin/User/EditAdmin')));

//Officer
const IndexOfficer = Loadable(lazy(() => import('../views/pages/Officer/IndexOfficer')));

//Lecturer
const IndexLecturer = Loadable(lazy(() => import('../views/pages/Lecturer/IndexLecturer')));

//Student
const IndexStudent = Loadable(lazy(() => import('../views/pages/Student/IndexStudent')));

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

const AddMachSubject = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/AddMachSubject')),
);

const AddMachSubjectList = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/AddMachSubjectList')),
);

const EditMachSubjectList = Loadable(
  lazy(() => import('../views/pages/Admin/MachSubject/EditMachSubjectList')),
);

const ShowMachSubject = Loadable(lazy(() => import('../views/pages/MachSubject/ShowMachSubject')));
const ShowListMachSubject = Loadable(
  lazy(() => import('../views/pages/MachSubject/ShowListMachSubject')),
);

const TestTransfer = Loadable(lazy(() => import('../views/pages/Tester/TestTransfer')));
const ExtarSubjectCheck = Loadable(lazy(() => import('../views/pages/Tester/TestCheck')));
const MachTestTransfer = Loadable(lazy(() => import('../views/pages/Tester/MachTestTransfer')));
const Curriculum = Loadable(lazy(() => import('../views/pages/Curriculum/ManageCurriculum')));
const ShowCurriculum = Loadable(lazy(() => import('../views/pages/Curriculum/ListCurriculum')));
const Structure = Loadable(lazy(() => import('../views/pages/Curriculum/ManageStructure')));
const ShowStructure = Loadable(lazy(() => import('../views/pages/Curriculum/ListStructure')));

const Router = [
  // {
  //   element: <FullLayout />,
  //   children: [
  //     { path: '/', element: <Navigate to="/Index" /> },
  //     // { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
  //     // { path: '/dashboards/ecommerce', exact: true, element: <EcommerceDash /> },
  //     // { path: '/apps/chats', element: <Chats /> },
  //     // { path: '/apps/notes', element: <Notes /> },
  //     // { path: '/apps/calendar', element: <Calendar /> },
  //     // { path: '/apps/email', element: <Email /> },
  //     // { path: '/apps/tickets', element: <Tickets /> },
  //     // { path: '/apps/contacts', element: <Contacts /> },
  //     // { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
  //     // { path: '/apps/blog/posts', element: <Blog /> },
  //     // { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
  //     // { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
  //     // { path: '/apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
  //     // { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
  //     // { path: '/apps/followers', element: <Followers /> },
  //     // { path: '/apps/friends', element: <Friends /> },
  //     // { path: '/apps/gallery', element: <Gallery /> },
  //     // { path: '/user-profile', element: <UserProfile /> },
  //     // { path: '/pages/casl', element: <RollbaseCASL /> },
  //     // { path: '/pages/treeview', element: <Treeview /> },
  //     // { path: '/pages/pricing', element: <Pricing /> },
  //     // { path: '/pages/account-settings', element: <AccountSetting /> },
  //     // { path: '/pages/faq', element: <Faq /> },
  //     // { path: '/forms/form-elements/autocomplete', element: <MuiAutoComplete /> },
  //     // { path: '/forms/form-elements/button', element: <MuiButton /> },
  //     // { path: '/forms/form-elements/checkbox', element: <MuiCheckbox /> },
  //     // { path: '/forms/form-elements/radio', element: <MuiRadio /> },
  //     // { path: '/forms/form-elements/slider', element: <MuiSlider /> },
  //     // { path: '/forms/form-elements/date-time', element: <MuiDateTime /> },
  //     // { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
  //     // { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
  //     // { path: '/forms/quill-editor', element: <QuillEditor /> },
  //     // { path: '/forms/form-layouts', element: <FormLayouts /> },
  //     // { path: '/forms/form-horizontal', element: <FormHorizontal /> },
  //     // { path: '/forms/form-vertical', element: <FormVertical /> },
  //     // { path: '/forms/form-custom', element: <FormCustom /> },
  //     // { path: '/forms/form-wizard', element: <FormWizard /> },
  //     // { path: '/forms/form-validation', element: <FormValidation /> },
  //     // { path: '/tables/basic', element: <BasicTable /> },
  //     // { path: '/tables/collapsible', element: <CollapsibleTable /> },
  //     // { path: '/tables/enhanced', element: <EnhancedTable /> },
  //     // { path: '/tables/fixed-header', element: <FixedHeaderTable /> },
  //     // { path: '/tables/pagination', element: <PaginationTable /> },
  //     // { path: '/tables/search', element: <SearchTable /> },
  //     // { path: '/charts/line-chart', element: <LineChart /> },
  //     // { path: '/charts/gredient-chart', element: <GredientChart /> },
  //     // { path: '/charts/doughnut-pie-chart', element: <DoughnutChart /> },
  //     // { path: '/charts/area-chart', element: <AreaChart /> },
  //     // { path: '/charts/column-chart', element: <ColumnChart /> },
  //     // { path: '/charts/candlestick-chart', element: <CandlestickChart /> },
  //     // { path: '/charts/radialbar-chart', element: <RadialbarChart /> },
  //     // { path: '/ui-components/alert', element: <MuiAlert /> },
  //     // { path: '/ui-components/accordion', element: <MuiAccordion /> },
  //     // { path: '/ui-components/avatar', element: <MuiAvatar /> },
  //     // { path: '/ui-components/chip', element: <MuiChip /> },
  //     // { path: '/ui-components/dialog', element: <MuiDialog /> },
  //     // { path: '/ui-components/list', element: <MuiList /> },
  //     // { path: '/ui-components/popover', element: <MuiPopover /> },
  //     // { path: '/ui-components/rating', element: <MuiRating /> },
  //     // { path: '/ui-components/tabs', element: <MuiTabs /> },
  //     // { path: '/ui-components/tooltip', element: <MuiTooltip /> },
  //     // { path: '/ui-components/transfer-list', element: <MuiTransferList /> },
  //     // { path: '/ui-components/typography', element: <MuiTypography /> },
  //     // { path: '/widgets/cards', element: <WidgetCards /> },
  //     // { path: '/widgets/banners', element: <WidgetBanners /> },
  //     // { path: '/widgets/charts', element: <WidgetCharts /> },
  //     // { path: '*', element: <Navigate to="/auth/404" /> },
  //   ],
  // },
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
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id/add',
        element: <AddMachSubject />,
      },
      {
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id/:subject_id/add',
        element: <AddMachSubjectList />,
      },
      {
        path: '/admin/manage/machsubject/curriculum/:curriculum/structure/:structure_id/:subject_id/:_id/edit',
        element: <EditMachSubjectList />,
      },
    ],
  },
  {
    element: <RouterOfficer />,
    children: [
      //หน้าแรก
      { path: '/officer/index', element: <IndexOfficer /> },
      //จัดการผู้ใช้ระบบ
      { path: '/officer/manage/user', element: <ManageAdmin /> },
      { path: '/officer/manage/user/add', element: <AddAdmin /> },
      { path: '/officer/manage/user/:_id', element: <EditAdmin /> },
    ],
  },
  {
    element: <RouterLecturer />,
    children: [{ path: '/Lecturer/Index', element: <IndexLecturer /> }],
  },
  {
    element: <RouterStudent />,
    children: [
      { path: '/Student/Index', element: <IndexStudent /> },
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
      { path: '/test/check', element: <ExtarSubjectCheck /> },
      { path: '/test/mach', element: <MachTestTransfer /> },
      { path: '/curriculum', element: <Curriculum /> },
      { path: '/curriculum/:curriculum/structure/:structure_id', element: <Structure /> },
      // { path: '/auth/login', element: <Login /> },
      // { path: '/auth/login2', element: <Login2 /> },
      // { path: '/auth/register', element: <Register /> },
      // { path: '/auth/register2', element: <Register2 /> },
      // { path: '/auth/forgot-password', element: <ForgotPassword /> },
      // { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      // { path: '/auth/two-steps', element: <TwoSteps /> },
      // { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      // { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/', element: <IndexPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
