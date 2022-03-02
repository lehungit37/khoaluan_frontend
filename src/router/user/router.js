import Dashboard from "../../features/user/dashboard";
import RoomDetail from "../../features/user/detail_room";
import Login from "../../features/user/login";
import Register from "../../features/user/register";

export const UserRouterLocal = [
  {
    path: "/",
    name: "Xem thông tin mới nhất",
    component: Dashboard,
  },
  {
    path: "/chi-tiet-phong-tro",
    name: "Chi tiết phòng trọ",
    component: RoomDetail,
    isPrivate: false,
  },
  {
    path: "/:slug/:id",
    name: "Xem thông tin mới nhất",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Đăng nhập",
    component: Login,
  },
  {
    path: "/dang-ky",
    name: "Đăng Ký",
    component: Register,
  },
];
