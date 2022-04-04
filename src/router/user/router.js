import Dashboard from "../../features/user/home_page";
import RoomDetail from "../../features/user/detail_room";
<<<<<<< HEAD
import LienHe from "../../features/user/lienhe";
=======
import ForgetPass from "../../features/user/forget_password";
>>>>>>> origin
import Login from "../../features/user/login";
import Register from "../../features/user/register";
import Tutorial from "../../features/user/tutorial";


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
<<<<<<< HEAD
    path: "/",
    name: "Xem thông tin mới nhất",
    component: Dashboard,
  },
  {
    path: "/lien-he",
    name: "liên hệ",
    component: LienHe,
  },
 
=======
    path: "/quen-mat-khau",
    name: "Quên mật khẩu",
    component: ForgetPass,
  },
  {
    path: "/huong-dan",
    name: "Hướng dẫn",
    component: Tutorial,
  },
>>>>>>> origin
];
