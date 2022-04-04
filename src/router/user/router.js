import Dashboard from "../../features/user/dashboard";
import RoomDetail from "../../features/user/detail_room";
import LienHe from "../../features/user/lienhe";
import Login from "../../features/user/login";
import Register from "../../features/user/register";


export const UserRouterLocal = [
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
  {
    path: "/",
    name: "Xem thông tin mới nhất",
    component: Dashboard,
  },
  {
    path: "/lien-he",
    name: "liên hệ",
    component: LienHe,
  },
 
];
