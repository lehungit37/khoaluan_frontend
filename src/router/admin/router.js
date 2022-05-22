import ManagementPost from "../../features/admin/post_management";
import ManagementAccount from "../../features/admin/account_management";
import ManagementCategory from "../../features/admin/categories_management";
import PermissionManagement from "./../../features/admin/permission_management/index";

const AdminRouteLocal = [
  {
    path: "/quan-ly-bai-dang",
    component: ManagementPost
  },
  {
    path: "/quan-ly-nguoi-dung",
    component: ManagementAccount
  },
  {
    path: "/quan-ly-danh-muc",
    component: ManagementCategory
  },
  {
    path: "/quan-ly-quyen",
    component: PermissionManagement
  }
];

export default AdminRouteLocal;
