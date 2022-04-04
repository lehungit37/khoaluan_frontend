import ChangePhoneNumber from "../../features/user_management/change_phonenumber";
import PostManagement from "../../features/user_management/management_post";
import NewPost from "../../features/user_management/new_post";
import RePassword from "../../features/user_management/re_password";
import TestChangePhone from "../../features/user_management/testfolder/test";
import UserInfoEdit from "../../features/user_management/user_info_edit";

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
    path: "/doi-mat-khau",
    name: "Đổi mật khẩu",
    component: RePassword
  },
  {
    path: "/test-1",
    name: "test",
    component: TestChangePhone
  },

  {
    path: "/doi-so-dien-thoai",
    name: "Đổi số điện thoại",
    component: ChangePhoneNumber
  },
  {
    path: "/tin-da-luu",
    name: "Quản lý tin đã lưu",
    component: UserInfoEdit
  }
];
