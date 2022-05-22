import ManagementPost from "../../features/admin/post_management";
import ManagementAccount from "../../features/admin/account_management";
import ManagementCategory from "../../features/admin/categories_management";
import ManagementPermission from "../../features/admin/permission_management";

const AdminRouteLocal = [
  {
    path: "/quan-ly-bai-dang",
    component: ManagementPost,
  },
  {
    path: "/quan-ly-nguoi-dung",
    component: ManagementAccount,
  },
  {
    path: "/quan-ly-danh-muc",
    component: ManagementCategory,
  },
  {
    path: "/quan-ly-quyen",
    component: ManagementPermission,
  },
];

export default AdminRouteLocal;
