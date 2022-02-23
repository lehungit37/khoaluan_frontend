import ManagementPost from "../../features/user/management_post";
import Dashboard from "../../features/user/dashboard";
import RoomDetail from "../../features/user/detail_room";

import UserManagement from "../../features/admin/user_management";
import AdminLayout from "../../layout/admin_layout";
export const UserRouterLocal = [
  {
    path: "/",
    name: "Xem thông tin mới nhất",
    component: Dashboard,
  },
  {
    path: "/quan-ly-bai-dang",
    name: "Quản lý bài đăng",
    component: ManagementPost,
    isPrivate: true,
  },
  {
    path: "/chi-tiet-phong-tro",
    name: "Chi tiết phòng trọ",
    component: RoomDetail,
    isPrivate: false,
  },
];
