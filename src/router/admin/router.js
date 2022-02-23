import PostManagement from "../../features/admin/post_management";
import UserManagement from "../../features/admin/user_management";

const AdminRouteLocal = [
  {
    path: "/quan-ly-bai-dang",
    component: PostManagement,
  },
  {
    path: "/quan-ly-nguoi-dung",
    component: UserManagement,
  },
];

export default AdminRouteLocal;
