import ChangePhoneNumber from "../../features/user_management/change_phonenumber";
import PostManagement from "../../features/user_management/management_post";
import NewPost from "../../features/user_management/new_post";
import RePassword from "../../features/user_management/re_password";
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
    name: "Chỉnh sửa bài viết",
    component: UpdatePost
  },
  {
    path: "/doi-mat-khau",
    name: "Đổi mật khẩu",
    component: RePassword
  },
  {
    path: "/doi-so-dien-thoai",
    name: "Đổi số điện thoại",
    component: ChangePhoneNumber
  },

];
