import ManagementPost from "../../features/admin/post_management";
import ManagementAccount from "../../features/admin/account_management";
import ManagementCategory from "../../features/admin/categories_management";

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
];

export default AdminRouteLocal;
