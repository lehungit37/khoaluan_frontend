import PostManagement from "../../features/user_management/management_post";
import NewPost from "../../features/user_management/new_post";
import UserInfoEdit from "../../features/user_management/user_info_edit";
import UpdatePost from "./../../features/user_management/management_post/component/update_post";

export const ManagementRouteLocal = [
  {
    path: "/tin-dang",
    name: "Quản lý tin đăng",
    component: PostManagement
  },
  {
    path: "/dang-tin-moi",
    name: "Quản lý tin đăng",
    component: NewPost
  },
  {
    path: "/thong-tin-ca-nhan",
    name: "Quản lý Thông tin cá nhân",
    component: UserInfoEdit
  },
  {
    path: "/chinh-sua/:id",
    name: "Quản lý tin đã lưu",
    component: UpdatePost
  }
];
